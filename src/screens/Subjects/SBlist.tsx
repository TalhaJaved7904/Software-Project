import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, IconButton, CircularProgress, Alert, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the DeleteIcon
import { getData, delRecord } from '../../config/firebasemethods'; // Import your functions

// Define types for the subject data
interface Subject {
    subject: string;
    className: string;
    description: string;
    topics: string;
}

const SubjectList: React.FC = () => {
    const [subjects, setSubjects] = useState<{ [key: string]: Subject }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [classID, setClassID] = useState<string>(''); // Change this as needed

    useEffect(() => {
        fetchSubjects();
    }, [classID]);

    const fetchSubjects = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
        
        try {
            const data = await getData('subjects', classID) as { [key: string]: Subject };
            setSubjects(data || {});
        } catch (err) {
            setError('Failed to fetch subjects');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await delRecord('subjects', id); // 'subjects' is the node name
            setSuccess('Subject deleted successfully!');
            fetchSubjects(); // Refresh the list
        } catch (err) {
            setError('Failed to delete subject');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Subject List
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            ) : success ? (
                <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
            ) : (
                <Grid container spacing={3}>
                    {Object.entries(subjects).length > 0 ? (
                        Object.entries(subjects).map(([id, subject]) => (
                            <Grid item xs={12} sm={6} md={4} key={id}>
                                <Card sx={{ position: 'relative' }}>
                                    <CardContent>
                                        <Typography variant="h6">{subject.subject}</Typography>
                                        <Typography variant="body2">Class: {subject.className}</Typography>
                                        <Typography variant="body2">Description: {subject.description}</Typography>
                                        <Typography variant="body2">Topics: {subject.topics}</Typography>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(id)}
                                            sx={{ position: 'absolute', top: 8, right: 8 }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No subjects available</Typography>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default SubjectList;
