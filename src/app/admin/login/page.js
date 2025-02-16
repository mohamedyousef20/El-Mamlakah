'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import {
    Alert,
    Button,
    Card,
    CardContent,
    Input,
    Typography,
    Box,
    createTheme,
    ThemeProvider
} from '@mui/material'

const theme = createTheme({
    palette: {
        primary: { main: '#006c35' },
        background: { default: '#111827' },
        text: { primary: '#fff' },
    },
    typography: {
        fontFamily: "'Noto Kufi Arabic', sans-serif",
        h4: { fontWeight: 700 },
    },
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': { borderBottom: '1px solid #fff' },
                    color: '#fff',
                },
            },
        },
    },
});

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('http://localhost:5500/api/v1/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            })

            const data = await res.json()
            console.log(res.status)
            if (res.status === 200) {
                // Save token in a cookie (expires in 30 day)
                const token = Cookies.set('admin-token', data.token, {
                    expires: 30,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                })
                router.push('/admin/dashboard/overview')
                //Cookies.remove('admin-token', { path: '/' })

                router.refresh()
            } else {
                setError(data.error || 'فشل تسجيل الدخول')
            }
        } catch (err) {
            setError('حدث خطأ ما')
        } finally {
            setLoading(false)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                p: 2
            }}>
                <Card sx={{
                    width: '100%',
                    maxWidth: 400,
                    bgcolor: '#111827',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4" sx={{
                            textAlign: 'center',
                            mb: 4,
                            color: '#fff'
                        }}>
                            لوحة التحكم الإدارية
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Box sx={{ mb: 3 }}>
                                <Input
                                    fullWidth
                                    placeholder="اسم المستخدم"
                                    value={credentials.username}
                                    onChange={(e) => setCredentials(prev => ({
                                        ...prev,
                                        username: e.target.value
                                    }))}
                                    sx={{
                                        mb: 2,
                                        '& input': { py: 1.5, fontSize: '1rem' }
                                    }}
                                />

                                <Input
                                    fullWidth
                                    type="password"
                                    placeholder="كلمة المرور"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials(prev => ({
                                        ...prev,
                                        password: e.target.value
                                    }))}
                                    sx={{
                                        '& input': { py: 1.5, fontSize: '1rem' }
                                    }}
                                />
                            </Box>

                            {error && (
                                <Alert severity="error" sx={{ mb: 2, bgcolor: 'error.dark' }}>
                                    {error}
                                </Alert>
                            )}

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    bgcolor: 'primary.main',
                                    py: 1.5,
                                    fontSize: '1rem',
                                    '&:hover': { bgcolor: '#005a2b' }
                                }}
                            >
                                {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    )
}
