import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { sendData } from '../../config/firebasemethods';

export default function TEadd() {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [clss, setClss] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const teacherData = {
      name,
      fatherName,
      age,
      phone,
      clss,
      email,
    };

    try {
      const result: any = await sendData('teachers', teacherData);
      setMessage(`Teacher ${result.name} added successfully! 
       "GO Check your Entry in TEACHER LIST" `);
      setName('');
      setFatherName('');
      setAge('');
      setPhone('');
      setClss('');
      setEmail('');
    } catch (err: any) {
      setMessage(`Error adding Teacher: ${err.message}`);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add Teacher</h1>
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
          label="Email"
          value={email}
          type='email'
          onChange={(e) => setEmail(e.target.value)}
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
          Add Teacher
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


