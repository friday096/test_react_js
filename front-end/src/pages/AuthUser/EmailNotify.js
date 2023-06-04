import React from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Grid, Container, Box, Button, ListItem, Typography } from '@mui/material';
import { padding } from '@mui/system';
import TranslateContext from '../../context/TranslateContext';
const EmailNotify = () => {
    const params = useParams();

    const {data}= React.useContext(TranslateContext); //Get Translate Data

    return (
        <Container>
            <Box>
            <Grid style={{display:'flex',justifyContent: 'space-evenly',padding:'18px 0px',alignItems: 'center'}}>
                <Grid>
                    <h4>{data.email_notify_title_1}</h4>
                    <Grid>
                        <Typography>{data.email_notify_title_2}</Typography>
                        <Typography><strong>{params.email}</strong></Typography>
                        <Typography>{data.email_notify_title_3}</Typography>
                    </Grid>
                    <Typography style={{marginTop:40}}>{data.email_notify_title_4}</Typography>

                </Grid>
                <Grid>
                    <img src='/homep/confirm-email.jpg' alt='Image' width={300} height={250}/>
                </Grid>
            </Grid>
            </Box>
        </Container>
        
  
    );
}

export default EmailNotify;
