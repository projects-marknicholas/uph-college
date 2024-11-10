// CSS
import '../../../../assets/css/student/s-applications.css';

const StudentApplicationPopup = ({close}) => {
  return(
    <>
      <div className='s-pop-bg'>
        <div className='s-pop-show'>
          <div style={{ padding: '20px' }}>test <button onClick={close}>close</button></div>
        </div>
      </div>
    </>
  );
}

export default StudentApplicationPopup;