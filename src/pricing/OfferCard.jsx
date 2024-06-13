import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
export { OfferCard };

function OfferCard(props) {
    return (
        <Box sx={{ width: 300 }}>
            <Card
                sx={{
                    borderRadius: '20px',
                }}
            >
                <Box sx={{ height: 400, bgcolor: '#52057B' }}>
                    <CardContent>
                        <Box sx={{ height: 250 }}>
                            <Typography
                                variant="h3"
                                color="white"
                                gutterBottom
                                align="center"
                            >
                                {props.title}
                            </Typography>
                            <Box sx={{ height: 80 }}>
                                <Typography
                                    variant="h7"
                                    color="white"
                                    component="div"
                                    align="center"
                                >
                                    {props.description}
                                </Typography>
                            </Box>
                            <Typography
                                fontSize={40}
                                align="center"
                                color="white"
                            >
                                {props.price}
                            </Typography>
                            <Typography
                                variant="h7"
                                align="center"
                                component="div"
                                gutterBottom
                                color="white"
                            >
                                {props.priceDescription}
                            </Typography>
                        </Box>
                        {props.perks.map((perk) => (
                            <Typography
                                key={perk}
                                variant="body2"
                                component="div"
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <CheckIcon fontSize="small" color="success" />
                                <Box component={'span'} sx={{ color: 'white' }}>
                                    {perk}
                                </Box>
                            </Typography>
                        ))}
                    </CardContent>
                </Box>
                <CardActions sx={{ bgcolor: '#000000' }}>
                    <Button
                        size="small"
                        sx={{ color: 'white', justifyContent: 'flex-start' }}
                    >
                        Bắt đầu
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
