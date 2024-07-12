import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Grid, Button, MenuItem, Select, FormControl, InputLabel, TextField, Alert } from '@mui/material';
import { sendData } from '../../config/firebasemethods'; // Import your sendData function

// Define types for the fee structure data
interface FeeStructure {
    className: string;
    admissionFee: number;
    monthlyFee: number;
    examFee: number;
}

const FeeStructureScreen: React.FC = () => {
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [admissionFee, setAdmissionFee] = useState<number>(0);
    const [monthlyFee, setMonthlyFee] = useState<number>(0);
    const [examFee, setExamFee] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'admissionFee':
                setAdmissionFee(Number(value));
                break;
            case 'monthlyFee':
                setMonthlyFee(Number(value));
                break;
            case 'examFee':
                setExamFee(Number(value));
                break;
            default:
                break;
        }
    };

    const handleSubmit = async () => {
        if (!selectedClass) {
            setError('Please select a class.');
            return;
        }
        if (admissionFee < 0 || monthlyFee < 0 || examFee < 0) {
            setError('Fee amounts cannot be negative.');
            return;
        }

        const feeStructure: FeeStructure = {
            className: selectedClass,
            admissionFee,
            monthlyFee,
            examFee,
        };

        try {
            await sendData('feeStructures', feeStructure);
            setSuccess('Fee structure saved successfully!');
            setError('');
        } catch (err) {
            setError('Failed to save fee structure.');
            setSuccess('');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Fee Structure
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="class-select-label">Select Class</InputLabel>
                <Select
                    labelId="class-select-label"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value as string)}
                    label="Select Class"
                >
                    {classes.map((className) => (
                        <MenuItem key={className} value={className}>{className}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Paper sx={{ padding: 3, mb: 2 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">Enter Fee Details</Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography>Admission Fee:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="admissionFee"
                            type="number"
                            value={admissionFee}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Monthly Fee:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="monthlyFee"
                            type="number"
                            value={monthlyFee}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Exam Fee:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="examFee"
                            type="number"
                            value={examFee}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Total Fee:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>${admissionFee + monthlyFee + examFee}</Typography>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                    Save Fee Structure
                </Button>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
            </Paper>
        </Container>
    );
};

export default FeeStructureScreen;
