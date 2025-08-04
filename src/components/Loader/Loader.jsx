import React, { useEffect } from 'react';
import './Loader.scss';
import { Fragment } from 'react';
const Loader = () => {

  return (
    <div className='Loader'>

    <div class="loader-line"></div>
    </div>
  );
};

export default React.memo(Loader);