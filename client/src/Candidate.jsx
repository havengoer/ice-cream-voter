import React from 'react';

const Candidate = props => { // flavor, likes
  return (
    <div className="row">
      <div className="column">{props.flavor}</div>
      <div className="column">{props.likes}</div>
      <div className="column"><button onClick={() => props.clickEvent(props.flavor)}> ⬆ </button></div>
    </div>
  );
}

export default Candidate;

