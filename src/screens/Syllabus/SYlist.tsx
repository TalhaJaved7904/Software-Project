import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import { getData } from '../../config/firebasemethods'; // Import your data functions

// Define types
interface Syllabus {
    subject: string;
    className: string;
    description: string;
    topics: string;
}

// Update component
const SyllabusList: React.FC = () => {
    const [syllabusList, setSyllabusList] = useState<[string, Syllabus][]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchSyllabus();
    }, []);

    const fetchSyllabus = async () => {
        try {
            const data = await getData('syllabus');
            setSyllabusList(Object.entries(data || {}));
        } catch (err) {
            setError('Failed to fetch syllabus data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Syllabus List
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <Grid container spacing={3}>
                    {syllabusList.length > 0 ? (
                        syllabusList.map(([id, syllabus]) => (
                            <Grid item xs={12} sm={6} md={4} key={id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{syllabus.subject}</Typography>
                                        <Typography variant="body2">Class: {syllabus.className}</Typography>
                                        <Typography variant="body2">Description: {syllabus.description}</Typography>
                                        <Typography variant="body2">Topics: {syllabus.topics}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No syllabus data available</Typography>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default SyllabusList;
