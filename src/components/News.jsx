import React from 'react';
import sessionTokenImage from '../assets/session_Token.png';
import JWTImage from '../assets/img_JWT.png';


const News = () => {
  return (
  <div style = {{marginTop: '-100px', width: '100%'}}>
    <h3>News _ Tokens for User Validation</h3>
    <a rel="stylesheet" href="https://chat.deepseek.com/a/chat/s/f8a25b70-28a9-44f4-a6f6-cb40d5aff6e4" target="_blank">10+ Kinds of Tokens by Deepseek </a> 
    <hr></hr>
    <div>
      <img src={sessionTokenImage} alt="Session Token img" width="600" />
      <img src={JWTImage} alt="Session Token img" width="600" />
    </div>
    <hr></hr>
    <div >
      <p style={{ display: 'inline' }}>Session Token is a kind of UUID, </p> 
      <a rel="online UUID generator" href="https://fusionauth.io/dev-tools/uuid-generator" style={{ display: 'inline' }} target="_blank"> UUID generator </a>
      <a rel="JWT Decoder" href="https://jwt.io/" style={{ display: 'inline', marginLeft: '200px' }} target="_blank"> JWT Decoder </a>
    </div>
  </div>
  )
};

export default News;