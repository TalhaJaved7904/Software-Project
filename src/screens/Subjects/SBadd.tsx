import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Grid, Box, Alert } from '@mui/material';
import { sendData } from '../../config/firebasemethods'; // Import your sendData function

// Define types for the subject data
interface Subject {
    subject: string;
    className: string;
    description: string;
    topics: string;
}

const AddSubject: React.FC = () => {
    const [subjectData, setSubjectData] = useState<Subject>({
        subject: '',
        className: '',
        description: '',
        topics: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    // Handle changes in form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubjectData({
            ...subjectData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await sendData('subjects', subjectData); // Assuming 'subjects' is the node name
            setSuccess('Subject added successfully!');
            setSubjectData({ subject: '', className: '', description: '', topics: '' }); // Reset form
        } catch (err) {
            setError('Failed to add subject');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Add New Subject
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="subject"
                            label="Subject"
                            value={subjectData.subject}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="className"
                            label="Class Name"
                            value={subjectData.className}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="description"
                            label="Description"
                            value={subjectData.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="topics"
                            label="Topics"
                            value={subjectData.topics}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Subject'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        </Container>
    );
};

export default AddSubject;
