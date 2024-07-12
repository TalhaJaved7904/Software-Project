import React, { useEffect, useState } from 'react';
import { getData, delRecord } from "../../config/firebasemethods";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Define the Student type
interface Student {
  id: string;
  name: string;
  age: number;
  clss: string;
  dob: string;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    setLoading(true)
    getData('students')
      .then((data: any) => {
        setStudents(Object.values(data)); // Convert object to array
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleDelete = (id:any) => {
    delRecord('students', id)
      .then(() => {
        alert('Student deleted successfully');
        fetchStudents(); // Refresh the list after deletion
      })
      .catch((error) => {
        alert(`Error deleting student: ${error.message}`);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom
      style={{textAlign : 'center'}}>
        Student List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Date of Birth</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.clss}</TableCell>
                <TableCell>{student.dob}</TableCell>
                <TableCell>
                  <Button
                    variant='contained' color='error' onClick={()=>handleDelete(student.id)}>
                    Delete
                  </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StudentList;
