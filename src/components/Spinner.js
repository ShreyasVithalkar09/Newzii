import React from 'react';
import loading from "../giphy.gif";

const Spinner = () => {
    return (
      <div className="text-center">
        <img style={{width:"80px"}} src={loading} alt="loading" />
      </div>
    )
  
}

export default Spinner;