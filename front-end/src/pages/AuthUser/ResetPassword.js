import React from 'react';
import Box from '@mui/material/Box';
// import Page from '../../components/Pages';
import { Grid, Container, Button, ListItem, List, ListItemText, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { NotificationManager } from 'react-notifications';
import { updatePassword } from '../../utils/Api';
import validate from '../FormValidationRules';
import AdjustIcon from '@mui/icons-material/Adjust';
import TranslateContext from '../../context/TranslateContext';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { translateFunc,data } = React.useContext(TranslateContext); //Get Translate Data

    const [form, setForm] = React.useState({ security_code: '', password: '', confirm_pass: '', showNewPassword: false, showConfirmPassword: false })
    const [err, setError] = React.useState();

    React.useEffect(()=>{
        localStorage.getItem("token") ? navigate("/project"):""
       },[])
    const onChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleClickshowNewPassword = () => {
        setForm({
            ...form,
            showNewPassword: !form.showNewPassword,
        });
    };
    const handleClickshowConfirmPassword = () => {
        setForm({
            ...form,
            showConfirmPassword: !form.showConfirmPassword,
        });
    };

    //Form Submit
    const updatePass = (e) => {
        e.preventDefault()

        //Validation Check
        var validateErr = validate({
            security_code: form.security_code,
            password: form.password,
            confirm_pass: form.confirm_pass,

        });
        setError(validateErr)
        // console.log('err', err)
        if (Object.keys(validateErr).length == 0) {
            //Check Password Match
            if (form.password === form.confirm_pass) {
                // console.log('password  match')

                updatePassword({ security_code: form.security_code, password: form.password }).then((res) => {
                    // console.log('res++', res)
                    if (res.code === 201) {
                        setError({ security_code: res.msg })
                        NotificationManager.error(data.forget_error_msg);
                    } else {
                        navigate('/login')
                        NotificationManager.success(data.forget_success_msg);
                    }
                })

            } else {
                //Not Password Match
                setError({ password: 'Password Does Not Match' })
                // setError({password:'Password Does Not Match', confirm_pass:'Password Does not Match'})
                NotificationManager.error(data.password_not_match);
            }


        }

    }
    return (
        
            <Box
                noValidate
                autoComplete="off"
            >
                <Grid style={{ display: 'flex', height: '100vh' }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid container spacing={2} item xs={9} style={{ borderRight: '1px solid #dcdcdc82' }}>
                        <Grid style={{ padding: 25, maxWidth: 455, margin: "auto", marginTop: '43px',background: '#fff', borderRadius: 15, boxShadow: '0 0 12px -1px #000' }} item xs={12}>
                            <h2 style={{ width: '100%', textAlign: 'center' }}>{data.reset_title} </h2>
                            <Grid style={{ margin: '0 10px' }} item xs={12} sm={12} md={12} >
                                <TextField
                                    error={err?.security_code ? 'error' : ''}
                                    fullWidth
                                    type='text'
                                    helperText={err?.security_code ? data.security_code_required : data.enter_security_code}
                                    id="demo-helper-text-misaligned"
                                    label={data.security_code_title}
                                    margin="normal"
                                    name='security_code'
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid style={{ margin: '0 10px' }} item xs={12} sm={12} md={12} >
                                <FormControl placeholder="" fullWidth variant="outlined">

                                    <InputLabel>{data.password_title}</InputLabel>
                                    <OutlinedInput
                                        error={err?.password ? 'error' : ''}
                                        id="outlined-adornment-password"
                                        name='password'
                                        type={form.showNewPassword ? 'text' : 'password'}
                                        onChange={onChange}

                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickshowNewPassword}
                                                    edge="end"
                                                >
                                                    {form.showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }

                                        label="New Password"
                                    />
                                        <span className={err?.password ? 'pass-err' : 'pass-def'} style={{ color: err?.password ? 'pass-err' : 'pass-def' }}>{err?.password == 'Password is required'? data.password_required : err?.password == 'Passwords must be at least 8 chars with at least 1 uppercase, 1 lowercase, 1 number and 1 special character.'? data.password_error: data.enter_password}</span>
                                </FormControl>
                            </Grid>
                            <Grid style={{ margin: '10px 10px' }} item xs={12} sm={12} md={12} >
                                <FormControl fullWidth variant="outlined">

                                    <InputLabel htmlFor="outlined-adornment-password">{data.conf_password_title}</InputLabel>
                                    <OutlinedInput
                                        error={err?.password ? 'error' : ''}
                                        id="outlined-adornment-conf-password"
                                        name='confirm_pass'
                                        type={form.showConfirmPassword ? 'text' : 'password'}
                                        onChange={onChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickshowConfirmPassword}
                                                    edge="end"
                                                >
                                                    {form.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm Password"
                                    />
                                    <span className={err?.confirm_pass ? 'pass-err' : 'pass-def'} style={{ color: err?.confirm_pass ? 'pass-err' : 'pass-def' }}>{err?.confirm_pass == 'Password is required'?data.password_required: err?.confirm_pass == 'Passwords must be at least 8 chars with at least 1 uppercase, 1 lowercase, 1 number and 1 special character.'?data.password_error:data.enter_confirm_password}</span>
                                </FormControl>
                            </Grid>
                            <Grid style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                {/* <div style={{ margin: 'auto', maxWidth: 271, marginTop: '15px' }} > */}
                                <Button
                                    className='resetButt'
                                    variant="contained"
                                    onClick={updatePass}
                                >{data.forgot_button}</Button>
                                {/* </div> */}

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

export default ResetPassword;
