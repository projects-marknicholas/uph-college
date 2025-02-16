import React from 'react';
import { motion } from 'framer-motion';

// Components
import SSCScholars from './ssc-scholars';
import CollegeCouncilPresident from './college-council-presidents';
import PresidentialBoardDirectors from './pbds';
import ThePerpetualArchives from './the-perpetual-archives';
import External from './external';

// CSS
import '../../../../assets/css/view.css';

const ViewApplication = ({ application, onClose }) => {
  if (!application) return null;

  const renderFormTypeComponent = () => {
    switch (application.type) {
      case 'SSC Scholars':
        return <SSCScholars application={application} onClose={onClose} />;
      case `College Council President`:
        return <CollegeCouncilPresident application={application} onClose={onClose} />;
      case `Presidential/Board Director Scholars`:
        return <PresidentialBoardDirectors application={application} onClose={onClose} />;
      case `The Perpetual Archives`:
        return <ThePerpetualArchives application={application} onClose={onClose} />;
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
