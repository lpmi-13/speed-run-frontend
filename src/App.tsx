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
    AppBar,
    Toolbar,
    Container,
    Card,
    CardContent,
} from '@mui/material';

interface User {
    id: number;
    name: string;
    email: string;
}

// Mock data for development
const mockUsers: User[] = [
    { id: 1, name: 'Fatima Al-Mansoori', email: 'fatima@example.com' },
    { id: 2, name: 'Juan Carlos Mendoza', email: 'juan@example.com' },
    { id: 3, name: 'Priya Patel', email: 'priya@example.com' },
    { id: 4, name: 'Chen Wei', email: 'chen@example.com' },
    { id: 5, name: 'Adeola Okonkwo', email: 'adeola@example.com' },
    { id: 6, name: 'Olivier Dubois', email: 'olivier@example.com' },
    { id: 7, name: 'Ananya Deshpande', email: 'ananya@example.com' },
    { id: 8, name: 'Yusuke Tanaka', email: 'yusuke@example.com' },
    { id: 9, name: 'Isabella Rossi', email: 'isabella@example.com' },
    { id: 10, name: 'Alejandro González', email: 'alejandro@example.com' },
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

    const renderContent = () => {
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
            <TableContainer component={Paper} elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    '&:nth-of-type(odd)': {
                                        backgroundColor: 'action.hover', // or any other color you prefer
                                    },
                                    // hover effect
                                    '&:hover': {
                                        backgroundColor: 'action.selected',
                                    },
                                }}
                            >
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: '#bbdefb' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, color: '#000' }}
                    >
                        3 Tier Webapp Speedrun!
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* Main content */}
            <Container sx={{ my: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' }, // column on mobile, row on desktop
                        gap: 3,
                    }}
                >
                    {/* Right column - main content (now comes first on mobile) */}
                    <Box sx={{ width: { xs: '100%', md: '70%' } }}>
                        <Card>
                            <Box
                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    px: 2,
                                }}
                            ></Box>

                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Users List
                                </Typography>
                                {renderContent()}
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Left column (now appears below on mobile) */}
                    <Box sx={{ width: { xs: '100%', md: '30%' } }}>
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                {isDevelopment && (
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: 'block', mt: 2 }}
                                    >
                                        Using mock data (Development Mode)
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default App;
