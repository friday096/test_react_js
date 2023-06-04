import React from 'react';
import Box from '@mui/material/Box';
// import Page from '../../components/Pages';
import { Grid, Container, Button, ListItem, List, ListItemText, Typography } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import TranslateContext from '../../context/TranslateContext';

import TextField from '@mui/material/TextField';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import validate from '../FormValidationRules';
import { NotificationManager } from 'react-notifications';
import { forgotPassword } from '../../utils/Api';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const { translateFunc, data } = React.useContext(TranslateContext); //Get Translate Data
    const [disable, setDisable] = React.useState(true);
    const [form, setForm] = React.useState({ email: '' })
    const [err, setError] = React.useState();
   
    React.useEffect(()=>{
        localStorage.getItem("token") ? navigate("/project"):""
       },[])
   
       const onChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const ResetForm = (e) => {

        e.preventDefault();
        setDisable(false)
        //Validation Check
        var validateErr = validate({
            email: form.email,
        });
        setError(validateErr)

        if (Object.keys(validateErr).length == 0) {
            forgotPassword({ email: form.email }).then((res) => {
                // console.log('res++', res)
                if (res.code === 201) {
                    setError({ email: res.msg })
                    NotificationManager.error(data.forgot_email_err_msg);
                } else {
                    navigate('/reset')
                    NotificationManager.success(data.forgot_email_success_msg);
                }
            })

        }
    }
    return (
            <Box

                noValidate
                autoComplete="off"
            >
                <Grid style={{ display: 'flex', height: '100vh' }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid container spacing={2} item xs={9} style={{ borderRight: '1px solid #dcdcdc82' }}>
                        <Grid style={{ padding: 25, maxWidth: 455, margin: "auto", marginTop: '43px', background: '#fff',borderRadius: 15, boxShadow: '0 0 12px -1px #000' }} item xs={12}>
                            <h4 style={{ width: '100%' }}> {data.forget_title} </h4>
                            <p style={{ width: '100%' }}>{data.forget_title_2}</p>
                            <Grid style={{ margin: '0 10px' }} item xs={12} sm={12} md={12} >
                                <TextField
                                    fullWidth
                                    error={err?.email ? 'error' : ''}
                                    type='email'
                                    helperText={err?.email == 'Email is required'? data.email_required :  err?.email == 'Email address is invalid' ? data.email_error : data.enter_email}
                                    id="demo-helper-text-misaligned"
                                    label={data.email_title}
                                    margin="normal"
                                    name='email'
                                    onChange={onChange}
                                />
                            </Grid>

                            <Grid style={{ width: '100%', display: 'flex', marginTop: 30 }}>
                                <div style={{ margin: 'auto', marginTop: '2px' }} >
                                    <div style={{ display: disable ? 'none' : 'block' }}>
                                        {data.forget_title_3} <a href="mailto: massimocalieri@hotmail.it">{data.forget_title_4}</a> {data.forget_title_4}
                                    </div>
                                    <div style={{ textAlign: 'center', marginTop: 8 }}>
                                        <Button
                                            className='forgetbutt'
                                            variant="contained"
                                            onClick={ResetForm}
                                        >{data.forgot_button}</Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} style={{ padding: ' 0 35px 0 35px', background:'#dcdcdc82', paddingTop: 29 }} >
                            <h5 style={{ fontWeight: 400, fontSize: 21, marginTop: '0px', borderRadius: '8px', marginBottom: '15px' }}>
                                <font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{data.heading_notes}</font></font>
                                <strong><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>{data.sub_heading}</font></font></strong>
                            </h5>
                            <Grid>
                                <Typography className='text_p'>
                                    <font style={{ verticalAlign: 'inherit' }}>
                                        <font style={{ verticalAlign: 'inherit' }}>{data.first_line} </font>
                                    </font>
                                </Typography>
                                <Typography className='text_p'>
                                    <font style={{ verticalAlign: 'inherit' }}>
                                        <font style={{ verticalAlign: 'inherit' }}>{data.second_line} </font>
                                    </font>
                                </Typography>
                                <Typography className='text_p'>
                                    <font style={{ verticalAlign: 'inherit' }}>
                                        <font style={{ verticalAlign: 'inherit' }}>{data.third_line} </font>
                                    </font>
                                </Typography>
                                <Typography className='text_p'>
                                    <font style={{ verticalAlign: 'inherit' }}>
                                        <font style={{ verticalAlign: 'inherit' }}>{data.fourth_line} </font>
                                    </font>
                                </Typography>
                            </Grid>
                        </Grid>
                </Grid>
            </Box>
    );
}

export default ForgetPassword;
