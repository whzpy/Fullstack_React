import React from 'react';
import sessionTokenImage from '../assets/session_Token.png';
import JWTImage from '../assets/img_JWT.png';


const News = () => {
  return (
  <div style = {{marginTop: '-50px', width: '100%'}}>
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
    <br></br>
    <h5 style={{ textAlign: 'left' }}>For Session-Token(stateful) and JWT(stateless), both like to store in Cookies, Why?</h5>
    <ol style={{ textAlign: 'left' }}>
      <li><strong>Automatic Handling:</strong> Cookies are automatically sent with every request, making it easy to maintain the session without manually attaching to each request.</li>
      <li><strong>Security:</strong> Cookies can be configured with flags like HttpOnly, Secure, and SameSite to enhance security. For example: "HttpOnly" __ prevents client-side scripts from accessing the cookie. "Secure" __ ensures the cookie is only sent over HTTPS. "SameSite" __ helps prevent CSRF attacks.</li>
<li><strong>Expiration:</strong> Cookies can be set to expire after a certain time, which aligns with the session's lifespan.</li>
    </ol>
  </div>
  )
};

export default News;