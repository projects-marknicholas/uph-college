import React, { useState } from 'react';

// Components
import StudentTypesPopup from './student-types-pop';

// Assets
import SearchSvg from '../../../../assets/svg/search.svg';
import ArrowupSvg from '../../../../assets/svg/arrow-up.svg';

// CSS
import '../../../../assets/css/student/scholarship.css';

const StudentScholarshipTypes = () => {
  const [isViewPopup, SetViewPopup] = useState(false);

  const handleView = () => {
    SetViewPopup(true);
  };

  const closeView = () => {
    SetViewPopup(false);
  };

  return(
    <>
      <div className="s-scholar-type container">
        <div className="s-filter">
          <div className="search">
            <img src={SearchSvg}/>
            <input
              type="search"
              placeholder="Search"
              id='search'
              name='search'
            />
          </div>
          <select>
            <option>Internal</option>
            <option>External</option>
          </select>
        </div>

        <div className='s-scholar-grid'>
          <div className='item'>
            <h1>Scholarship Type</h1>
            <span>Academic - Internal</span>

            <div className='s-details'>
              <div className='description'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
              <div className='eligibility'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
            </div>
            <div className='s-apply'>
              <button onClick={handleView}>Apply now <img src={ArrowupSvg}/></button>
            </div>
          </div>
          <div className='item'>
            <h1>Scholarship Type</h1>
            <span>Academic - Internal</span>

            <div className='s-details'>
              <div className='description'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
              <div className='eligibility'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
            </div>
            <div className='s-apply'>
              <button onClick={handleView}>Apply now <img src={ArrowupSvg}/></button>
            </div>
          </div>
          <div className='item'>
            <h1>Scholarship Type</h1>
            <span>Academic - Internal</span>

            <div className='s-details'>
              <div className='description'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
              <div className='eligibility'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
            </div>
            <div className='s-apply'>
              <button onClick={handleView}>Apply now <img src={ArrowupSvg}/></button>
            </div>
          </div>
          <div className='item'>
            <h1>Scholarship Type</h1>
            <span>Academic - Internal</span>

            <div className='s-details'>
              <div className='description'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
              <div className='eligibility'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
            </div>
            <div className='s-apply'>
              <button onClick={handleView}>Apply now <img src={ArrowupSvg}/></button>
            </div>
          </div>
          <div className='item'>
            <h1>Scholarship Type</h1>
            <span>Academic - Internal</span>

            <div className='s-details'>
              <div className='description'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
              <div className='eligibility'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
            </div>
            <div className='s-apply'>
              <button onClick={handleView}>Apply now <img src={ArrowupSvg}/></button>
            </div>
          </div>
          <div className='item'>
            <h1>Scholarship Type</h1>
            <span>Academic - Internal</span>

            <div className='s-details'>
              <div className='description'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
              <div className='eligibility'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
            </div>
            <div className='s-apply'>
              <button onClick={handleView}>Apply now <img src={ArrowupSvg}/></button>
            </div>
          </div>
        </div>
      </div>

      {isViewPopup &&
        <StudentTypesPopup close={closeView}></StudentTypesPopup>
      }
    </>
  );
}

export default StudentScholarshipTypes;