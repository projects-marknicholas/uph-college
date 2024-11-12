import React from 'react';
import { motion } from 'framer-motion';

// Components
import EntranceApplication from './entrance-application';
import StudentAssistantship from './student-assistantship';
import DeansListener from './deans-listener';
import Private from './private';
import Government from './government';
import PresidentialDirectors from './presidential-directors';
import CouncilPresidents from './council-presidents';
import PerpetualiteArchives from './perpetualite-archives';
import SupremeStudentCouncil from './supreme-student-council';

// CSS
import '../../../../assets/css/view.css';

const ViewApplication = ({ application, onClose }) => {
  if (!application) return null;

  const renderFormTypeComponent = () => {
    switch (application.form_type) {
      case 'Entrance Scholarship':
        return <EntranceApplication application={application} />;
      case 'Student Assistanship':
        return <StudentAssistantship application={application} />;
      case `Dean's List`:
        return <DeansListener application={application} />;
      case 'Supreme Student Council':
        return <SupremeStudentCouncil application={application} />;
      case 'The Perpetualite Archives':
        return <PerpetualiteArchives application={application} />;
      case 'College Council Presidents':
        return <CouncilPresidents application={application} />;
      case 'Presidential/Board of Directors Scholars':
        return <PresidentialDirectors application={application} />;
      case 'Government':
        return <Government application={application} />;
      case 'Private':
        return <Private application={application} />;
      default:
        return <div>Form type not recognized.</div>;
    }
  };

  return (
    <div className="view-application">
      <button className='close-view' onClick={onClose}>Close</button>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {renderFormTypeComponent()}
      </motion.div>
    </div>
  );
};

export default ViewApplication;
