//import { history } from '_helpers';
import Grid from '@mui/material/Grid';
import { OfferCard } from './OfferCard';
import { Box } from '@mui/material';

export { Pricing };

function Pricing() {
    document.title = 'Pricing & Fees';
    return (
        <Box sx={{ mt: 10 }}>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 10, lg: 1 }}
                alignContent="center"
            >
                <Grid item md={4}>
                    <OfferCard
                        title="Cấp độ 1"
                        description="Khám phá và chơi các bộ bài trò chơi uống rượu miễn phí của chúng tôi."
                        price="Miễn phí"
                        priceDescription="Không cần thanh toán"
                        perks={['Truy cập vào các bộ bài miễn phí']}
                    />
                </Grid>
                <Grid item md={4}>
                    <OfferCard
                        title="Cấp độ 2"
                        description="Tuyệt vời cho những người muốn tạo ra các bộ bài của riêng họ."
                        price="50.000 VND"
                        priceDescription="Thanh toán một lần"
                        perks={[
                            'Truy cập vào các bộ bài cao cấp',
                            'Tạo các bộ bài tùy chỉnh',
                            'Nhận các bộ bài độc đáo được tạo bởi trí tuệ nhân tạo',
                        ]}
                    />
                </Grid>
                <Grid item md={4}>
                    <OfferCard
                        title="Cấp độ 3"
                        description="Chơi với bạn bè trực tuyến trong thời gian thực."
                        price="VND"
                        priceDescription="Thanh toán một lần"
                        perks={['Tạo trò chơi thời gian thực qua mạng']}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
