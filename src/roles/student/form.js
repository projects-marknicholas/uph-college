import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import StudentNavbar from "./components/navbar";
import EntranceApplication from "./components/view/entrance-application";

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
      document.title = `${typeData[0].type} - Student`;
    } else {
      document.title = 'Form - Student';
    }
  }, [typeData]);

  return (
    <>
      <div className="student-section">
        <div className="container">
          <StudentNavbar />
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            typeData && typeData.length > 0 && typeData[0]?.type === "Entrance Scholarship" ? (
              <EntranceApplication 
                studentTypeId={studentTypeId} 
                typeId={typeId}     
              />
            ) : (
              <div>
                <h2>{typeData ? typeData[0].type : 'No Type Found'}</h2>
                <p>{typeData ? typeData[0].description : 'No description available.'}</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default StudentForm;
