import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { sendData } from '../../config/firebasemethods';

export default function STAdd() {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [grade, setGrade] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const studentData = {
      name,
      fatherName,
      age,
      phone,
      email,
      address,
      grade,

    };

    try {
      const result:any = await sendData('students', studentData);
      setMessage(`Student ${result.name} added successfully!`);
      setName('');
      setFatherName('');
      setAge('');
      setPhone('');
      setEmail('');
      setAddress('');
      setGrade('');
    } catch (err:any) {
      setMessage(`Error adding student: ${err.message}`);
    }
  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Student
        </Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}


