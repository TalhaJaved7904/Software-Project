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

interface Teacher {
    id: string;
    name: string;
    age: number;
    clss: string;
}

const TEList: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = () => {
        setLoading(true)
        getData('teachers')
            .then((data: any) => {
                setTeachers(Object.values(data));
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    const handleDelete = (id: any) => {
        delRecord('teachers', id)
            .then(() => {
                alert('Teacher deleted successfully');
                fetchTeachers();
            })
            .catch((error) => {
                alert(`Error deleting teacher: ${error.message}`);
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
                style={{ textAlign: 'center' }}>
                Teacher List
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
                        {teachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell>{teacher.name}</TableCell>
                                <TableCell>{teacher.age}</TableCell>
                                <TableCell>{teacher.clss}</TableCell>
                                <TableCell>
                                    <Button
                                        variant='contained' color='error' onClick={() => handleDelete(teacher.id)}>
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

export default TEList;
