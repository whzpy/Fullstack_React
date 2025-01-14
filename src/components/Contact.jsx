import React, {useState} from "react";
import { Button, Table } from "react-bootstrap";

const Contact = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [phone, setPhone] = useState('')
  const [userId, setUserId] = useState(3)
  const [rows, setRows] = useState([])

  const addHandler = (e)=> {
    e.preventDefault();
    if(fname && lname && phone){
      setUserId(userId + 1);
      let newRows = [...rows, [userId,fname, lname, phone]]
      setRows(newRows)
      setLname('')
      setFname('')
      setPhone('')
    }
  }

  return (
    <div style = {{marginTop: '-100px', width: '100%'}}>
      <form style = {{ color:'blue', marginTop: '10px', marginBottom: '1px', width: '100%' }}>
        <div style = {{display: 'flex',justifyContent: 'space-between',  alignItems: "center",}}>
          <label style={{ flex: 1, marginRight: '5px', padding: '3px' }}> Fistname </label>
          <input type="text" id = "fname" name="fname" value={fname} 
            onChange={(e)=> setFname(e.target.value)} style={{ flex: 1, marginRight: '30px' }}/>
          <label style={{ flex: 1, marginRight: '5px',padding: '3px' }}> Lastname </label>
          <input type="text" id = "lname" name="lname" value={lname} 
            onChange={(e)=> setLname(e.target.value)}/>
        </div>
        <div style = {{display: 'flex',justifyContent: 'space-between',  alignItems: "center", marginTop: '10px'}}>
          <label style={{ marginRight: '5px', padding: '3px' }}> Phone Number</label>
          <input type="text" id = "phone" name="phone"  pattern="\d*" value={phone}
            onChange={(e)=> { if (!/^\d*$/.test(e.target.value)){alert("Wrong phone number")};
              setPhone(e.target.value)}} style={{ flex: 1, marginRight: '30px' }}/>
          <Button type="submit" onClick={addHandler}> Add a new record</Button>
        </div>      
      </form>
      <hr></hr>
      <h3 style={{ marginTop: '40px'}}> Add New Contacts to the Table </h3>
      <Table className="table table-striped" style = {{margin: '20px', width: '100%', border: '2px solid #ddd', textAlign: 'left' }}>
        <thead>
          <tr>
            <th> UserID</th>
            <th> Fist Name</th>
            <th> Last Name</th>
            <th> Phone Number</th>
          </tr>
        </thead>
        <tbody>
          <tr key = {1} >
            <td>1</td>
            <td> Jackie11</td>
            <td> Wang</td>
            <td> 1122334455</td>
          </tr>
          <tr key = {2} >
            <td>2</td>
            <td> Jackie22</td>
            <td> Wang</td>
            <td> 2233445566</td>
          </tr>
          {rows[0] && rows.map((row, index) => (
          <tr key = {userId} >
            <td> {row[0]}</td>
            <td> {row[1]}</td>
            <td> {row[2]}</td>
            <td> {row[3]}</td>
          </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Contact;
