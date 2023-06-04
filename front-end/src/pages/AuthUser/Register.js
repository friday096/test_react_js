import React from 'react';
import Box from '@mui/material/Box';
// import Page from '../../components/Pages';
import { Grid, Container, Button, ListItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import AuthContext from '../../context/AuthContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import validate from '../FormValidationRules';
import { checkSerial, userRegister } from '../../utils/Api';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
// React Notification
import { Typography } from '@mui/material';
import TranslateContext from '../../context/TranslateContext';

import { NotificationManager } from 'react-notifications';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AdjustIcon from '@mui/icons-material/Adjust';
const Register = () => {
    const navigate = useNavigate();
    const { translateFunc, data } = React.useContext(TranslateContext); //Get Translate Data
    const [form, setForm] = React.useState({ company_name: '', device_serial_id: '', lname: '', contact_name: '', email: '', cell: '', password: '', showPassword: false })
    const { setAuth } = React.useContext(AuthContext); //Login Context
    const [err, setError] = React.useState();
    const [emailerr, setEmailerr] = React.useState();
    const [serialDBError, setserialDBError] = React.useState('');
    const [serialDBSuccess, setserialDBSuccess] = React.useState('');
    
    const onChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })

    }

    //Show Password
    const handleClickShowPassword = () => {
        setForm({
            ...form,
            showPassword: !form.showPassword,
        });
    };

    React.useEffect(() => {
            localStorage.getItem("token") ? navigate("/project"):""
    }, [])

    const RegisterForm = (e) => {
        e.preventDefault()

        //Validation Check
        var validateErr = validate({
            company_name: form.company_name,
            device_serial_id: form.device_serial_id,
            lname: form.lname,
            contact_name: form.contact_name,
            email: form.email,
            cell: form.cell,
            password: form.password,
        });
    
        setError(validateErr);
        // console.log('errrrrr', err)
        if (Object.keys(validateErr).length == 0) {

            userRegister({
                company_name: form.company_name,
                device_serial_id: form.device_serial_id,
                // lname: form.lname,
                contact_name: form.contact_name,
                email: form.email,
                cell: form.cell,
                password: form.password
            }).then((res) => {
                console.log('response-register', res)
                if (res.code === 201) {
                    // return NotificationManager.error(res.msg == data.reg_email_exist ? data.reg_email_exist : res.msg == data.serial_code_invalid ? data.serial_code_invalid:res.msg == data.serial_code_expire ? data.serial_code_expire :null )
                    // let error = res.message == data.reg_email_exist ? data.reg_email_exist : res.msg == data.serial_code_invalid ? data.serial_code_invalid : res.msg == data.serial_code_expire ? data.serial_code_expire :null
                        if(res.msg == "Email ID is already exist"){
                         NotificationManager.error(data.reg_email_exist)
                        
                    } else if(res.msg == "Invalid device serial id provided"){
                         NotificationManager.error(data.serial_code_invalid)

                    } else if(res.msg == "This device serial Id is already used"){
                         NotificationManager.error(data.serial_code_expire)
                    }

                    // return NotificationManager.error(error)
                }   
                if (res.code === 200) {

                    NotificationManager.success(res.msg);
                    navigate('/confirm/' + res.data.email)

                    // console.log('response+++', res)
                }
            })
        }
    }
    return (
        // <Page
        //     title="Account Register"
        // >

            <Box

                noValidate
                autoComplete="off"
                
            >

                <Grid style={{ display: 'flex' }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid container spacing={2} item xs={9} style={{ borderRight: '1px solid #dcdcdc82', background: '#fff' }}>
                        <Grid style={{ textAlign: 'center' }} item xs={12}>
                            <h2 >{data.register_title}</h2>
                            <Grid style={{ margin: 'auto' }} item xs={12} sm={6} md={6} >
                                <TextField
                                    fullWidth
                                    error={err?.email ? 'error' : emailerr ? 'error' : ''}
                                    helperText={err?.email == 'Email is required'? data.email_required :  err?.email == 'Email address is invalid' ? data.email_error : emailerr ? data.exist_email : data.enter_email}
                                    id="demo-email-helper-text-misaligned"
                                    label={data.email_title}
                                    margin="normal"
                                    name='email'
                                    type='email'
                                    value={form.email}
                                    onChange={onChange}

                                />

                            </Grid>
                            <Grid style={{ margin: 'auto' }} item xs={12} sm={6} md={6} >
                                <TextField
                                    error={err?.device_serial_id ? 'error' : serialDBError ? 'error' : ''}
                                    fullWidth
                                    helperText={err?.device_serial_id ? data.serial_id_required : serialDBError ? data.serial_not_match : serialDBSuccess ? data.serial_match : data.enter_serial_id}
                                    id="demo-helper-text-misaligned"
                                    label={data.serial_id_title}
                                    margin="normal"
                                    name='device_serial_id'
                                    onChange={onChange}
                                    value={form.device_serial_id}
                                    color={serialDBSuccess ? 'success' : ''}
                                />
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">{data.password_title}</InputLabel>
                                    <OutlinedInput
                                        error={err?.password ? 'error' : ''}
                                        id="outlined-adornment-password"
                                        name='password'
                                        value={form.password}
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
                                        <span className={err?.password ? 'pass-err' : 'pass-def'} style={{ color: err?.password ? 'pass-err' : 'pass-def' }}>{err?.password == 'Password is required'? data.password_required : err?.password == 'Passwords must be at least 8 chars with at least 1 uppercase, 1 lowercase, 1 number and 1 special character.'? data.password_error: data.enter_password}</span>
                                </FormControl>
                            </Grid>


                            <div style={{ maxWidth: 750 }} className='refer-person'>
                                <h3  >{data.refrence_person_title}</h3>

                            </div>
                            <Grid style={{ margin: 'auto' }} item xs={12} sm={6} md={6}>

                                <TextField
                                    error={err?.company_name ? 'error' : ''}
                                    fullWidth
                                    helperText={err?.company_name ? data.company_required : data.enter_company}
                                    id="demo-comapny-helper-text-misaligned"
                                    label={data.company_title}
                                    margin="normal"
                                    name='company_name'
                                    value={form.company_name}
                                    onChange={onChange}
                                />
                                <TextField
                                    error={err?.lname ? 'error' : ''}
                                    fullWidth
                                    helperText={err?.lname ? data.lname_required : data.enter_lname}
                                    id="demo-lname-helper-text-misaligned"
                                    label={data.lname_title}
                                    margin="normal"
                                    name='lname'
                                    value={form.lname}
                                    onChange={onChange}
                                />
                                <TextField
                                    error={err?.contact_name ? 'error' : ''}
                                    fullWidth
                                    helperText={err?.contact_name ? data.fname_required : data.enter_fname}
                                    id="demo-contact_name-helper-text-misaligned"
                                    label={data.fname_title}
                                    margin="normal"
                                    name='contact_name'
                                    value={form.contact_name}
                                    onChange={onChange}

                                />

                                <TextField
                                    fullWidth
                                    error={err?.cell ? 'error' : ''}
                                    helperText={err?.cell ? data.cell_required : data.enter_cell}
                                    id="demo-cell-helper-text-misaligned"
                                    label={data.cell_title}
                                    margin="normal"
                                    name='cell'
                                    type='number'
                                    value={form.cell}
                                    onChange={onChange}
                                />

                            </Grid>
                            <Grid style={{ margin: 'auto', marginTop: 20 }} item xs={12} sm={6} md={6}>
                                <Button
                                    className='regbut'
                                    variant="contained"
                                    onClick={RegisterForm}
                                >{data.register_button}</Button>
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
        // </Page>

    );
}

export default Register;
