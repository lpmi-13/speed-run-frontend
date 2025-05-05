import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Box,
} from '@mui/material';

interface User {
    id: number;
    name: string;
    email: string;
}

// Mock data for development
const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com' },
];

// Simple environment check
const isDevelopment = process.env.NODE_ENV === 'development';

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (isDevelopment) {
                    // Use mock data in development with a small delay to simulate network
                    await new Promise((resolve) => setTimeout(resolve, 300));
                    setUsers(mockUsers);
                } else {
                    // In production, use the current domain to fetch data
                    const response = await axios.get('/users');
                    setUsers(response.data);
                }
            } catch (err) {
                setError('Failed to fetch users');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Users List
            </Typography>
            {isDevelopment && (
                <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                >
                    Using mock data (Development Mode)
                </Typography>
            )}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default App;
