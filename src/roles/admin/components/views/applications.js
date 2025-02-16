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
import External from './external';

// CSS
import '../../../../assets/css/view.css';

const ViewApplication = ({ application, onClose }) => {
  if (!application) return null;

  const renderFormTypeComponent = () => {
    switch (application.form_type) {
      case 'Entrance Scholarship':
        return <EntranceApplication application={application} onClose={onClose} />;
      case 'Student Assistanship':
        return <StudentAssistantship application={application} />;
      case `Dean's List`:
        return <DeansListener application={application} onClose={onClose} />;
      case 'SSC Scholars':
        return <SupremeStudentCouncil application={application} onClose={onClose} />;
      case 'The Perpetual Archives':
        return <PerpetualiteArchives application={application} onClose={onClose} />;
      case 'College Council President':
        return <CouncilPresidents application={application} onClose={onClose} />;
      case 'Presidential/Board Director Scholars':
        return <PresidentialDirectors application={application} onClose={onClose} />;
      case 'Government':
        return <Government application={application} onClose={onClose} />;
      case 'Private':
        return <Private application={application} onClose={onClose} />;
      default:
        return <External application={application} onClose={onClose} />;
    }
  };

  return (
    <div className="view-application">
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
