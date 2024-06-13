//import { userActions } from '_store';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchWrapper } from '../_helpers';
import { addNotification, clearNotifications } from '../_store';
export { Sets };

function Sets() {
    document.title = 'Card sets';

    const dispatch = useDispatch();
    const { user: authUser } = useSelector((x) => x.auth);
    const showNotification = (message, notificationType) => {
        dispatch(addNotification({ message, notificationType }));
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const baseUrl = `${process.env.REACT_APP_API_URL}/card-sets`;
    const [setData, setSetData] = useState([]);
    const [personalSetData, setPersonalSetData] = useState([]);

    function onGet() {
        if (authUser.userLevel == 1) {
            fetchWrapper.get(`${baseUrl}/free`).then((response) => {
                setSetData(response.data);
            });
        } else {
            fetchWrapper.get(`${baseUrl}/non-personal`).then((response) => {
                setSetData(response.data);
            });
            fetchWrapper.get(`${baseUrl}/personal`).then((response) => {
                setPersonalSetData(response.data);
            });
        }
    }

    const handleSetDelete = (setId) => {
        dispatch(clearNotifications());
        fetchWrapper
            .delete(`${baseUrl}/${setId}`)
            .then((responseDelete) => {
                if (responseDelete.success) {
                    showNotification('Set deleted', 'success');
                    fetchWrapper
                        .get(`${baseUrl}/personal`)
                        .then((responseGet) => {
                            setPersonalSetData(responseGet.data);
                        });
                } else {
                    responseDelete.messages.forEach((message) => {
                        showNotification(message, 'error');
                    });
                }
            })
            .catch((errors) => {
                if (errors instanceof TypeError) {
                    showNotification(errors.message, 'error');
                } else {
                    errors.forEach((error) => {
                        showNotification(error, 'error');
                    });
                }
            });
        setAnchorEl(null);
    };
    useEffect(() => {
        onGet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container maxWidth="md" sx={{ mt: 10 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                color="#FFFFFF"
            >
                Các bộ bài có sẵn
            </Typography>
            <Box
                component="div"
                color="#4D869C"
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    mb: 5,
                }}
            >
                {authUser.userLevel >= 2 ? (
                    <>
                        <Card
                            sx={{
                                width: 150,
                                borderRadius: '20px',
                                flex: '0 0 auto',
                                mr: '20px',
                            }}
                        >
                            <CardContent
                                sx={{ bgcolor: '#52057B', height: 175 }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{ textWrap: 'pretty', fontSize: 20 }}
                                    color="white"
                                    gutterBottom
                                >
                                    Bộ bài do AI tạo
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{ textWrap: 'pretty', fontSize: 15 }}
                                    color="white"
                                >
                                    Các lá bài trong trò chơi uống rượu được tạo bởi AI
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ bgcolor: '#000000' }}>
                                <Button
                                    component={Link}
                                    to={`/sets/ai-generated`}
                                    size="small"
                                    sx={{ color: 'white' , justifyContent:'flex-start'}}
                                >
                                    Chơi
                                </Button>
                            </CardActions>
                        </Card>
                    </>
                ) : null}
                {setData.map((set) => (
                    <Card
                        key={set.id}
                        sx={{
                            width: 150,
                            borderRadius: '20px',
                            flex: '0 0 auto',
                            mr: '20px',
                        }}
                    >
                        <CardContent sx={{ bgcolor: '#52057B', height: 175 }}>
                            <Typography
                                variant="h1"
                                sx={{ textWrap: 'pretty', fontSize: 20 }}
                                color="white"
                                gutterBottom
                            >
                                {set.name}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{ textWrap: 'pretty', fontSize: 15 }}
                                color="white"
                            >
                                {set.description}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ bgcolor: '#000000' }}>
                            <Button
                                component={Link}
                                to={`/sets/${set.id}/cards`}
                                size="small"
                                sx={{ color: 'white' , justifyContent:'flex-start'}}
                            >
                                Chơi
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
            {authUser.userLevel >= 2 ? (
                <>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        color="#FFFFFF"
                    >
                        Các bộ bài của bạn
                    </Typography>
                    <Box
                        component="div"
                        color="#4D869C"
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <Card
                            sx={{
                                width: 150,
                                borderRadius: '20px',
                                flex: '0 0 auto',
                                mr: '20px',
                            }}
                        >
                            <CardContent
                                sx={{ bgcolor: '#52057B', height: 175 }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{ textWrap: 'pretty', fontSize: 20 }}
                                    color="white"
                                    gutterBottom
                                >
                                    Tạo bộ bài mới
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{ textWrap: 'pretty', fontSize: 15 }}
                                    color="white"
                                >
                                    Tạo bộ bài cá nhân của bạn ở đây
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ bgcolor: '#000000' }}>
                                <Button
                                    component={Link}
                                    to={`/sets/create`}
                                    size="small"
                                    sx={{ color: 'white', justifyContent:'flex-start' }}
                                >
                                    Tạo
                                </Button>
                            </CardActions>
                        </Card>
                        {personalSetData.map((set) => (
                            <Card
                                key={set.id}
                                sx={{
                                    width: 150,
                                    borderRadius: '20px',
                                    flex: '0 0 auto',
                                    mr: '20px',
                                }}
                            >
                                <CardContent
                                    sx={{ bgcolor: '#52057B', height: 175 }}
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            textWrap: 'pretty',
                                            fontSize: 20,
                                        }}
                                        color="white"
                                        gutterBottom
                                    >
                                        {set.name}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            textWrap: 'pretty',
                                            fontSize: 15,
                                        }}
                                        color="white"
                                    >
                                        {set.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ bgcolor: '#000000' }}>
                                    <Button
                                        component={Link}
                                        to={`/sets/${set.id}/cards`}
                                        size="small"
                                        sx={{ color: 'white' , justifyContent:'flex-start'}}
                                    >
                                        Chơi
                                    </Button>
                                    <Box>
                                        <Button
                                            size="small"
                                            sx={{ color: 'white' , justifyContent:'flex-end'}}
                                            onClick={handleClick}
                                        >
                                            Chọn
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby':
                                                    'basic-button',
                                            }}
                                        >
                                            <MenuItem
                                                component={Link}
                                                to={`/sets/${set.id}/edit`}
                                                onClick={handleClose}
                                            >
                                                Sửa
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => handleSetDelete(
                                                    set.id
                                                )}
                                            >
                                                Xóa
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </>
            ) : null}
        </Container>
    );
}
