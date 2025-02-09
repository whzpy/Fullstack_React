import React from 'react';
import JWTImage from '../assets/workflow_for_JWT_token.png';


const Workflow = () => {

  return (
  <div style = {{marginTop: '-30px', width: '100%', overflowY: 'auto'}}>
    <h3>Workflow for Generating JWT Tokens for User Validation (working locally)</h3>
    <hr></hr>
    <div>
      <img src={JWTImage} alt="Session Token img" width="750" />
    </div>
    <hr></hr>
  </div>
  )
};

export default Workflow;