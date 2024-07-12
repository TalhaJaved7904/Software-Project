import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { sendData } from '../../config/firebasemethods';

export default function STAdd() {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [clss, setClss] = useState('');
  const [dob, setDob] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const studentData = {
      name,
      fatherName,
      age,
      phone,
      clss,
      dob,
    };

    try {
      const result: any = await sendData('students', studentData);
      setMessage(`Student ${result.name} added successfully! 
       "GO Check your Entry in STlist" `);
      setName('');
      setFatherName('');
      setAge('');
      setPhone('');
      setClss('');
      setDob('');
    } catch (err: any) {
      setMessage(`Error adding student: ${err.message}`);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          variant="standard"
          fullWidth
          required
        />
        <TextField
          label="FatherName"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
          required
          variant="standard"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Age"
          value={age}
          type='number'
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          required
          variant="standard"
          margin="normal"
        />
        <TextField
          value={dob}
          type='date'
          onChange={(e) => setDob(e.target.value)}
          fullWidth
          required
          variant="standard"
          margin="normal"
        />
        <TextField
          label="Phone"
          value={phone}
          type='number'
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          required
          variant="standard"
          margin="normal"
        />
        <TextField
          label="Class"
          value={clss}
          onChange={(e) => setClss(e.target.value)}
          fullWidth
          type='number'
          required
          variant="standard"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary"
          style={{ textAlign: "center" }}>
          Add Student
        </Button>
      </form>
      {message && (
        <Typography color="primary" variant="body1" style={{ marginTop: '1rem' }}>
          {message}
        </Typography>
      )}
    </div>
  );
}


