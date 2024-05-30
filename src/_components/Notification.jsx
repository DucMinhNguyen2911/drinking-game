import { Alert, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../_store';

export { Notification };

function Notification() {
    const dispatch = useDispatch();
    const notifications = useSelector((x) => x.notification);
    const handleClearNotification = (id) => {
        dispatch(removeNotification(id));
    };
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: '1000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}
        >
            {notifications.map((notification) => (
                <Alert
                    key={notification.id}
                    severity={notification.notificationType}
                    onClose={() => handleClearNotification(notification.id)}
                    sx={{ mt: 1 }}
                >
                    {notification.message}
                </Alert>
            ))}
        </Box>
    );
}
