import React from 'react';
import Box from '@mui/material/Box';
import Page from '../../components/Pages';
import { Grid, Container, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Icon from '@mui/material/Icon';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import Avatar from '@mui/material/Avatar';
// import validate from '../FormValidationRules';
// import {logIn } from '../../utils/Api';
// import AuthContext from '../../context/AuthContext';
import { NotificationManager } from 'react-notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
//Date Picker
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
//End Date Picker
import VideoFileIcon from '@mui/icons-material/VideoFile';
const Template4 = () => {
    const [err, setError] = React.useState();

    const [startTimeFour, setStartTimeFour] = React.useState(null);
    const [endTimeFour, setEndTimeFour] = React.useState(null);

    // const [startDateTime, setStartDateTime] = React.useState(dayjs());
    // const [endDateTime, setEndDateTime] = React.useState(dayjs());

    const [form, setForm] = React.useState({
                                            start_date_time:'',
                                            end_date_time:''
                                    })
    const onChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <Box>
        <Grid style={{textAlign:'center'}}>
            <h2 className='create_project'> Without Lamps-Only Display</h2>
            <Grid style={{ justifyContent: 'space-between', display: 'flex' }} item xs={12} sm={12} md={12}>
            <Grid >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Start Time"
                                value={startTimeFour}
                                onChange={(newValue) => {
                                    setStartTimeFour(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="End Time"
                                value={endTimeFour}
                                onChange={(newValue) => {
                                    setEndTimeFour(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
            </Grid>
            <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                <Grid style={{ paddingTop: 8 }}>
                    Upload Video
                </Grid>
                <Grid>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <VideoFileIcon />
                    </IconButton>
                </Grid>
                <Grid>
                    <Avatar />
                </Grid>
            </Grid>
          
            <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'right', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                <Grid style={{ paddingTop: 8 }}>
 
                </Grid>
                <Grid>
                    <Button className='save_photo'>Save Photo</Button>
                </Grid>
                <Grid>
                <Button className='delete_photo'>Delete Photo</Button>
                </Grid>
                <Grid >
                    <Button className='save_temp' >Save Template</Button>
                </Grid>
            </Grid>
        </Grid>
    </Box>
    );
}

export default Template4;
