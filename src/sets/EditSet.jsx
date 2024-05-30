//import { userActions } from '_store';
import { PlaylistAdd } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchWrapper, history } from '../_helpers';
import { addNotification, clearNotifications } from '../_store';
export { EditSet };

function EditSet() {
    document.title = 'Card sets';

    const { setId } = useParams();
    const dispatch = useDispatch();
    const { user: authUser } = useSelector((x) => x.auth);
    const showNotification = (message, notificationType) => {
        dispatch(addNotification({ message, notificationType }));
    };

    const [fields, setFields] = useState([{ text: '' }]);
    const [cardList, setCardList] = useState([{ text: '' }]);
    const [cards, setCards] = useState([]);

    const handleAddField = () => {
        setFields([...fields, { text: '' }]);
    };

    const handleInputChange = (index, event) => {
        const newFields = fields.map((field, i) =>
            i === index ? { text: event.target.value } : field
        );
        setFields(newFields);
    };

    const handleAddAll = () => {
        setCardList(fields);
    };

    const { handleSubmit, formState } = useForm();
    const { isSubmitting } = formState;

    const baseUrl = `${process.env.REACT_APP_API_URL}/card-sets`;

    function onGet() {
        fetchWrapper.get(`${baseUrl}/${setId}/cards`).then((response) => {
            setCards(response.data);
        });
    }

    useEffect(() => {
        onGet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async () => {
        dispatch(clearNotifications());
        setCardList(fields);
        await fetchWrapper
            .post(`${baseUrl}/${setId}/cards/list`, {
                cardList
            })
            .then((response) => {
                if (response.success) {
                    onGet();
                    showNotification('Cards added', 'success');
                    setFields([{ text: '' }]);
                    setCardList([{ text: '' }]);
                } else {
                    response.messages.forEach((message) => {
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
                history.navigate('/sets');
            });
    };

    return (
        <Container maxWidth="xs">
            
        </Container>
    );
}
