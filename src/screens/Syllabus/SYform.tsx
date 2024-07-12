import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { sendData } from '../../config/firebasemethods'; 

const SyllabusForm = () => {
    const [className, setClassName] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [topics, setTopics] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        const syllabusData = {
            className,
            subject,
            description,
            topics,
        };

        try {
            await sendData('syllabus', syllabusData);
            alert('Syllabus data saved successfully');
            setClassName('');
            setSubject('');
            setDescription('');
            setTopics('');
        } catch (err) {
            setError('Failed to save syllabus data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Syllabus Form
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="class-select-label">Class</InputLabel>
                            <Select
                                labelId="class-select-label"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                required
                            >
                                <MenuItem value="Class 1">Class 1</MenuItem>
                                <MenuItem value="Class 2">Class 2</MenuItem>
                                <MenuItem value="Class 3">Class 3</MenuItem>
                                {/* Add more classes as needed */}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Subject"
                            variant="outlined"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Topics"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={topics}
                            onChange={(e) => setTopics(e.target.value)}
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
                            {loading ? 'Saving...' : 'Save'}
                        </Button>
                    </Grid>

                    {error && (
                        <Grid item xs={12}>
                            <Typography color="error">{error}</Typography>
                        </Grid>
                    )}
                </Grid>
            </form>
        </Container>
    );
};

export default SyllabusForm;
