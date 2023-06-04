import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid, Container } from '@mui/material';
// import Grid2 from '@mui/material/Unstable_Grid2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import { Fade } from "react-awesome-reveal";
const Home = () => {
    const [value, setValue] = React.useState('one');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Box style={{ backgroundColor: '#F68600', height: 400 }} sx={{ width: '100%' }}>
                <Container spacing={2}>
                    <Grid >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            // textColor="#F68600"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="one" label="Item One" />
                            <Tab value="two" label="Item Two" />
                            <Tab value="three" label="Item Three" />
                            <Tab value="four" label="Item Four" />
                            <Tab value="five" label="Item Five" />
                        </Tabs>
                    </Grid>
                    <Grid item xs={12} lg={12} spacing={2} style={{ display: "flex", flexWrap: 'wrap', justifyContent: "space-evenly", marginTop: 30 }}>
                        <Grid item xs={12} sm={5} md={5}>
                            <img
                                src='/homep/home1.png'
                                height={300}
                                alt='BackGround'
                            />
                        </Grid>
                        <Grid item xs={12} sm={7} md={7}>
                            <Typography style={{ color: 'white' }} paragraph>
                                <p styk>Online Booking</p>
                                <h1 > Event and appointment schedule</h1>
                                <RouterLink className='btn-register' to="/register">Get a free Account
                                </RouterLink>
                                <RouterLink className='btn-inspire' to="/">Get Inspired
                                </RouterLink>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box>
                <Container>
                    <Grid
                        xl={10}
                        lg={12}
                        md={12}
                        xs={12}
                        item>
                        <Grid item xs={12} lg={12} spacing={2} style={{ display: "flex", flexWrap: 'wrap', marginTop: 30 }}>

                            <Grid item xs={12} sm={6} md={6} lg={4} style={{ padding: 20, marginBottom: 30, width: '25%', textAlign: 'center' }}>
                                <Fade left>
                                    <Card style={{ height: 325 }} className="card-design">
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/homep/lamps.jpg"
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                <p className='card-text'>Lamps on With Display</p>
                                            </Typography>

                                        </CardContent>

                                        <CardActions style={{ justifyContent: 'center' }}>
                                            <RouterLink className='btn-register' to="/">Book
                                            </RouterLink>
                                        </CardActions>
                                    </Card>
                                </Fade>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={4} style={{ padding: 20, marginBottom: 30, width: '25%', textAlign: 'center' }}>
                                <Fade right>
                                    <Card style={{ height: 325 }} className="card-design">
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/homep/lamps2.jpg"
                                            alt="green iguana"
                                        />
                                        <CardContent style={{ justifyContent: 'center' }}>

                                            <Typography variant="body2" color="text.secondary">
                                                <p className='card-text'>Lampings Off & Display</p>
                                            </Typography>
                                            {/* <RouterLink className='btn-register' to="/register">Book
                                        </RouterLink> */}
                                        </CardContent>
                                        <CardActions style={{ justifyContent: 'center' }}>
                                            <RouterLink className='btn-register' to="/">Book
                                            </RouterLink>
                                        </CardActions>
                                    </Card>
                                </Fade>

                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} style={{ padding: 20, marginBottom: 30, width: '25%', textAlign: 'center' }}>
                                <Fade top>
                                    <Card style={{ height: 325, paddingBottom: 2 }} mb={5} className="card-design">
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/homep/lamps.jpg"
                                            alt="green iguana"
                                        />
                                        <CardContent style={{ justifyContent: 'center' }}>

                                            <Typography variant="body2" color="text.secondary">
                                                <p className='card-text'>Lamps On & without Display</p>
                                            </Typography>

                                        </CardContent>
                                        <CardActions style={{ justifyContent: 'center' }}>
                                            <RouterLink className='btn-register' to="/">Book
                                            </RouterLink>
                                        </CardActions>
                                    </Card>
                                </Fade>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} className="gamified-quizzes gami-one" style={{ padding: 20, width: '25%', marginBottom: 30, textAlign: 'center' }}>
                                <Fade bottom>
                                    <Card className="card-design" >
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/homep/lamps.jpg"
                                            alt="green iguana"
                                        />
                                        <CardContent>

                                            <Typography variant="body2" color="text.secondary">
                                                <p className='card-text'>Without Lamps & Only Display</p>
                                            </Typography>

                                        </CardContent>
                                        <CardActions style={{ justifyContent: 'center' }}>
                                            <RouterLink className='btn-register' to="/">Book
                                            </RouterLink>
                                        </CardActions>
                                    </Card>
                                </Fade>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box >
                <Container>
                    <Grid style={{ textAlign: 'center', alignItems: 'center' }}>
                        <h1>Customize your own Event booking system and appointment scheduler</h1>
                        <p>Design a professional and customized look for your booking website. Choose from our beautiful brand new fully responsive templates to fit your company brand. You can even choose the most convenient way for your clients to see your booking availability such as by class, time or staff.</p>
                    </Grid>
                </Container>
            </Box>

            <Box
                component="div"
                mt={5}
                className="mission"
            >
                <Container>
                    <Grid item xs={12} container display="flex" direction="column" spacing={2} justifyContent="center">
                        <Grid item xs>
                            <h2 style={{ textAlign: 'center', color: '#0B3052' }}>Easy Appointments for You & Your Clients </h2>
                        </Grid>

                    </Grid>
                    <Grid
                        container
                        spacing={7}
                        justify="center"
                    >
                        <Grid
                            xl={6}
                            lg={6}
                            md={6}
                            xs={12}
                            item
                        >
                            <Grid item xs={12} container direction="column" spacing={2} justify="center">
                                <Grid item>
                                    <Typography paragraph>
                                        One time or recurring events are being set up by people, companies or organisations for various gatherings all over the world all the time. In many of these cases, the event is limited by the number of participants that can participate and in such case it is important that people reserve their place. Very often, the organizer may also want to accept payments from the participants and then, an online appointment scheduler can be very useful, because people can pay at the same time they make a booking.
                                    </Typography>
                                    <Typography paragraph>
                                        The Massimo.me booking system is extremely flexible and allows event organizers to create a booking website, where clients and participants can come and reserve their places. They can also pay and give more information about themselves during the booking process. It is also very simple to set up multiple or recurring events.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            xl={6}
                            lg={6}
                            md={6}
                            xs={12}
                            item
                        >
                            <Fade right>

                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image="/homep/home2.png"
                                        alt="Image"
                                    />
                                </Card>
                            </Fade>

                        </Grid>

                    </Grid>
                </Container>
            </Box>

            {/* <Box
                component="div"
                mt={5}
                className='home-container'
            >
                <Grid
                    container
                    spacing={7}
                    justify="center"
                >
                    <Grid
                        xl={8}
                        lg={8}
                        md={8}
                        xs={12}
                        item
                    >
                        <Fade left>
                            <Grid item xs={12} container direction="column" spacing={2} justify="center">
                                <Grid item>
                                    <div style={{ color: '#5E2B66', fontSize: 36, maxWidth: '60%', margin: 'auto' }}>
                                            <img src="/static/logo.png" alt="logo" width="100%" />
                                     </div>
                                    <div className="about-banner-content" style={{ height: '300px', color: '#F3F3F3' }}>
                                    </div>
                                </Grid>
                            </Grid>
                        </Fade>
                    </Grid>
                </Grid>
            </Box> */}
            {/* <Box mt={4}>
                <Container>
                    <Grid style={{textAlign: 'center'}}>
                    <Typography paragraph>
                    <strong>Massimo Open:</strong> MON-SAT 12-10PM / SUN 12PM-9:30PM

                    </Typography>
                    <Typography paragraph>
                    <RouterLink className='btn-table-orange' to="/">Book Table
                                        </RouterLink>
                                        <RouterLink className='btn-table-online' to="/">Book Online
                                        </RouterLink>
                    </Typography>
                    </Grid>
                </Container>
            </Box> */}
        </>
    );
}

export default Home;
