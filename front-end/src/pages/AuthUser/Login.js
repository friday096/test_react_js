import React from 'react';
import Box from '@mui/material/Box';
import Page from '../../components/Pages';
import { Grid, Container, Button, ListItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import validate from '../FormValidationRules';
import { logIn } from '../../utils/Api';
import AuthContext from '../../context/AuthContext';
import { NotificationManager } from 'react-notifications';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import TranslateContext from '../../context/TranslateContext';
import { textAlign } from '@mui/system';
const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = React.useState({ email: '', login_password: '', showPassword: false })
    const [err, setError] = React.useState();
    const { setAuth } = React.useContext(AuthContext); //Login Context
    const { data } = React.useContext(TranslateContext); //Get Translate Data

   React.useEffect(()=>{
    localStorage.getItem("token") ? navigate("/project"):""
   },[])
    const onChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const logInForm = (e) => {
        e.preventDefault()
        //Validation Check
        var validateErr = validate({
            email: form.email,
            login_password: form.login_password,
        });
        setError(validateErr)
         console.log('validateErr', validateErr)
        if (Object.keys(validateErr).length == 0) {
            logIn({
                email: form.email,
                password: form.login_password,
            }).then((res) => {
                // console.log('login res', res)
                if (res.code === 201) {
                    NotificationManager.error(data.login_error_msg);
                } else {
                    setAuth({
                        id: res.data.id,
                        name: res.data.contact_name,
                    })
                    NotificationManager.success(data.login_success_msg);
                    // NotificationManager.success(res.msg);

                    localStorage.setItem('token', res.jwtToken)

                    navigate('/project')
                }
            })
        }
    }
    const handleClickShowPassword = () => {
        setForm({
            ...form,
            showPassword: !form.showPassword,
        });
    };

    return (
        //     <Page
        //     title="Login"
        // >
        <Grid className='mainlogin' style={{padding:0}}>

                <Box

                    noValidate
                    autoComplete="off"
                >

                    <Grid style={{ display: 'flex', height: '100vh' }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid container spacing={2} item xs={9} style={{ borderRight: '1px solid #dcdcdc82', background: '#fff',}}>
                            <Grid className='loginform' style={{ padding: 25, maxWidth: 455, margin: "auto", marginTop: '43px', borderRadius: 15, boxShadow: '0 0 12px -1px #000' }} item xs={12}>
                                <h2 style={{ width: '100%', textAlign: 'center' }}>{data.login_header} </h2>
                                <Grid style={{ margin: '0 10px' }} >
                                    <TextField
                                        error={err?.email ? 'error' : ''}
                                        fullWidth
                                        type='email'
                                        helperText={err?.email == 'Email is required'? data.email_required :  err?.email == 'Email address is invalid' ? data.email_error: data.enter_email}
                                        id="demo-helper-text-misaligned"
                                        label={data.email_title}
                                        margin="normal"
                                        name='email'
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid style={{ margin: '0 10px' }}>
                                    <FormControl style={{ marginTop: 12 }} fullWidth variant="outlined">

                                        <InputLabel htmlFor="outlined-adornment-password">{data.password_title}</InputLabel>
                                        <OutlinedInput
                                            error={err?.login_password ? 'error' : ''}
                                            id="outlined-adornment-password"
                                            name='login_password'
                                            type={form.showPassword ? 'text' : 'password'}
                                            onChange={onChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {form.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                        <span className={err?.login_password ? 'pass-err' : 'pass-def'} style={{ color: err?.login_password ? 'pass-err' : 'pass-def' }}>{err?.login_password == 'Password is required'? data.login_password : data.enter_password}</span>

                                    </FormControl>
                                </Grid>
                                <Grid style={{ width: '100%', textAlign: 'center', margin: "12px 0 0 0" }}>
                                    <Grid style={{ margin: 'auto', }} >
                                        <RouterLink className='forget_text' to="/forget">

                                            {data.forgot_title}
                                        </RouterLink>
                                        <Grid style={{ display: "flex", justifyContent: "center", marginTop: '3px', marginBottom: '7px' }}>
                                            <Button
                                                className='loginBut'
                                                variant="contained"
                                                onClick={logInForm}
                                            >{data.login_button}</Button>
                                        </Grid>
                                        <p className='login_text'>
                                            {data.register_title}
                                            <RouterLink className='login_anchor' to="/register">
                                                {data.register_button}
                                            </RouterLink>
                                        </p>
                                    </Grid>
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
        </Grid>
        // </Page>
    );
}

export default Login;
