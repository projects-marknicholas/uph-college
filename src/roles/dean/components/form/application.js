import React from 'react';
import { motion } from 'framer-motion';

// Components
import EntranceApplication from './entrance-application';
import DeansListener from './deans-listener';

// CSS
import '../../../../assets/css/view.css';

const ViewApplication = ({ application, onClose }) => {
  if (!application) return null;

  const renderFormTypeComponent = () => {
    switch (application.type) {
      case 'Entrance Scholarship':
        return <EntranceApplication application={application} onClose={onClose} />;
      case `Dean's List`:
        return <DeansListener application={application} onClose={onClose} />;
      default:
        return <div>Form type not recognized.</div>;
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
