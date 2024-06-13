//import { userActions } from '_store';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';
export { Home };

function Home() {
    document.title = 'Drinking Game';
    return (
        <Container maxWidth="xs" sx={{ mt: 3 }}>
            <Box
                sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
            >
                <img src={logo} alt="Logo" style={{ height: '60px' }} />
            </Box>
            <Box color="#FFFFFF" sx={{ mb: 5, mt: 5 }}>
                <Typography
                    variant="h1"
                    fontSize="37px"
                    fontWeight="700"
                    lineHeight="1.2"
                    textAlign={'center'}
                    sx={{ mb: 3 }}
                >
                    Trò chơi uống rượu trực tuyến
                </Typography>
                <Typography
                    variant="h2"
                    fontSize="24px"
                    fontWeight="700"
                    lineHeight="1.2"
                    textAlign={'center'}
                    sx={{ mb: 2 }}
                >
                    Trò chơi rất đơn giản:
                </Typography>
                <Typography gutterBottom textAlign={'center'}>
                    Chọn bộ bài, lật lá bài, làm theo những gì lá bài yêu cầu,
                    và nhấn 'Hoàn thành' để ghi một điểm. Nếu bạn không muốn
                    thực hiện, hãy uống một ly và nhấn 'Bỏ qua' để chuyển lượt
                    cho người chơi tiếp theo.
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button
                    component={Link}
                    to="/sets"
                    variant="contained"
                    size="large"
                    sx={{
                        bgcolor: '#000000',
                        ':hover': { bgcolor: '#1a1a1a' },
                    }}
                >
                    Hãy cùng say nào
                </Button>
            </Box>
        </Container>
    );
}
