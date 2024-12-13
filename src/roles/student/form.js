import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import StudentNavbar from "./components/navbar";
import EntranceApplication from "./components/view/entrance-application";
import DeansListener from "./components/view/deans-listener";
import ThePerpetualArchives from "./components/view/the-perpetual-archives";
import PresidentialBoardDirectorScholar from "./components/view/presidential-board-director-scholar";
import CollegeCouncilPresident from "./components/view/college-council-president";
import SSCScholars from "./components/view/ssc-scholars";

// API
import { fetchType } from "../../api/student";

// CSS
import '../../assets/css/student/student.css';

const StudentForm = () => {
  const { studentTypeId, typeId } = useParams();
  const [typeData, setTypeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const response = await fetchType({ stid: studentTypeId });
      if (response.status === 'success') {
        setTypeData(response.data);
      } else {
        setError(response.message);
      }

      setLoading(false);
    };

    if (studentTypeId) {
      fetchData();
    }
  }, [studentTypeId]);

  useEffect(() => {
    if (typeData) {
      const currentType = typeData.find(item => item.type_id === typeId);
      if (currentType) {
        document.title = `${currentType.type}`;
      } else {
        document.title = 'Form - Student';
      }
    } else {
      document.title = 'Form - Student';
    }
  }, [typeData, typeId]);  

  // Find the current type by `typeId`
  const currentType = typeData?.find(item => item.type_id === typeId);

  return (
    <>
      <div className="student-section">
        <div className="container">
          <StudentNavbar />
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : currentType ? (
            currentType.type === "Entrance Scholarship" ? (
              <EntranceApplication 
                studentTypeId={studentTypeId} 
                typeId={typeId}     
              />
            ) : currentType.type === "Dean's List" ? (
              <DeansListener 
                studentTypeId={studentTypeId} 
                typeId={typeId}     
              />
            ) : currentType.type === "The Perpetual Archives" ? (
              <ThePerpetualArchives
                studentTypeId={studentTypeId} 
                typeId={typeId}
              />
            ) : currentType.type === "Presidential/Board Director Scholars" ? (
              <PresidentialBoardDirectorScholar
                studentTypeId={studentTypeId} 
                typeId={typeId}
              />
            ) : currentType.type === "College Council President" ? (
              <CollegeCouncilPresident
                studentTypeId={studentTypeId} 
                typeId={typeId}
              />
            ) : currentType.type === "SSC Scholars" ? (
              <SSCScholars
                studentTypeId={studentTypeId} 
                typeId={typeId}
              />
            ) : (
              <div>
                <h2>{currentType.type || 'No Type Found'}</h2>
                <p>{currentType.description || 'No description available.'}</p>
              </div>
            )
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentForm;
