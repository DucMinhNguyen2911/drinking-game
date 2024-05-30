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
            <Card variant="outlined">
                <Box sx={{ height: 400, bgcolor: '#7AB2B2' }}>
                    <CardContent>
                        <Box sx={{ height: 250 }}>
                            <Typography
                                variant="h3"
                                color="text.primary"
                                gutterBottom
                                align="center"
                            >
                                {props.title}
                            </Typography>
                            <Box sx={{ height: 60 }}>
                                <Typography
                                    variant="h7"
                                    color="text.secondary"
                                    component="div"
                                    align="center"
                                >
                                    {props.description}
                                </Typography>
                            </Box>
                            <Typography
                                fontSize={40}
                                align="center"
                                color="text.primary"
                            >
                                {props.price}
                            </Typography>
                            <Typography
                                variant="h7"
                                align="center"
                                component="div"
                                gutterBottom
                                color="text.secondary"
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
                                <span>{perk}</span>
                            </Typography>
                        ))}
                    </CardContent>
                </Box>
                <CardActions sx={{ bgcolor: '#EEF7FF' }}>
                    <Button size="small">Get started</Button>
                </CardActions>
            </Card>
        </Box>
    );
}
