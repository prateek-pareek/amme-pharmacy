import React from 'react';
import PropTypes from 'prop-types';

const LoginPagesInspector = ({ currentPage, totalPages = 3 }) => {
  const getLines = () => {
    const lines = [];
    for (let i = 0; i < totalPages; i++) {
      lines.push(
        <div
          key={i}
          className={`w-12 h-2 rounded-full ${i < currentPage ? 'bg-blue-500' : 'bg-gray-100'}`}
        ></div>
      );
    }
    return lines;
  };

  return (
    <div className="absolute top-4 right-4 flex gap-1">
      {getLines()}
    </div>
  );
};

LoginPagesInspector.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
};

export default LoginPagesInspector;
