import React, { useEffect } from 'react';
import './Loader.scss';
import { Fragment } from 'react';
const Loader = () => {

  return (
    <div className='Loader'>

    <span className="loader"></span>
    </div>
  );
};

export default React.memo(Loader);