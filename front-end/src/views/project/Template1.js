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
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const Template1 = ({ saveTemplate }) => {
    const [err, setError] = React.useState();
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [itemSpeed, seitemSpeed] = React.useState('');
    const [uploadlogo, setUploadLogo] = React.useState('');

    const [startTimeFirst, setStartTimeFirst] = React.useState(null);
    const [endTimeFirst, setEndTimeFirst] = React.useState(null);

    const [itemInput, setitemInput] = React.useState([{
        start_time: '',
        end_time: '',
        item_speed: '',
        upload_logo: '',
        items: [{
            item_name: '',
            lamp: '',
            pictures: []
        }]

    }])


    const [file, setFile] = React.useState({
        upload_file: [{
            item: '',
            images: []
        }]
    });

    //Time Converter
    function timeConverter(str) {
        var date = new Date(str)
        var hours = ("0" + date.getHours()).slice(-2);
        var minutes = ("0" + date.getMinutes()).slice(-2);
        var seconds = ("0" + date.getSeconds()).slice(-2);
        return `${hours}:${minutes}:${seconds}`
    }

    // const [startDateTime, setStartDateTime] = React.useState(dayjs());
    // const [endDateTime, setEndDateTime] = React.useState(dayjs());

    //Add Item nad Item Number Function
    const addItemInputs = (temindex, e) => {
        console.log('addItemInputs')
        if (itemInput[temindex].items.length > 3) {
            NotificationManager.error('Sorrry, Only you can create 4 Items')
            // alert('Sorrry, Only you can create 4 Items')
        } else {
            let newfield = {
                item_name: '',
                lamp: '',
                pictures: []
            }
            console.log('check add item',  itemInput)
            itemInput[temindex].items.push(newfield)
            setitemInput([...itemInput])
        }
    }
    //Remove Item nad Item Number Function using filter
    const removeItemInputs = (temindex, itemindex) => {
        console.log('removeItemInputs', temindex, itemindex)
        //temindex Template indec
        // itemindex Item Index

        let myArray = itemInput[temindex].items.filter(function (item, itemndex) {
            return itemndex != itemindex;
        });
        console.log('new array ', myArray)

        itemInput[temindex].items.push(myArray)
        // setitemInput([itemInput])

    }

    //Item up Arrow
    const handleUpItems = (tempindex, itemindex) => {
        console.log('handleUpItems', tempindex, itemindex)
        if (itemindex == 0) {
            console.log('up item false')

            return false
        } else {
            console.log('upiteminsert')
            let from = itemInput[tempindex].items[itemindex];
            let to = itemInput[tempindex].items[itemindex - 1];
            itemInput[tempindex].items[itemindex] = to;
            itemInput[tempindex].items[itemindex - 1] = from
            setitemInput([...itemInput])

        }

    }

    //Item Down Arrow
    const handleDownItems = (tempindex, itemindex) => {
        console.log('handleDownItems', tempindex,itemindex)
        if (itemInput[tempindex].items[itemindex + 1]) { //check index is avaliable or not

            if (itemindex == 3) {
                console.log('downitem false')

                return false
            } else {
                console.log('downitem shuffle')
                let from = itemInput[tempindex].items[itemindex];
                let to = itemInput[tempindex].items[itemindex + 1];
                itemInput[tempindex].items[itemindex] = to;
                itemInput[tempindex].items[itemindex + 1] = from
                setitemInput([...itemInput])

            }

        } else {
            NotificationManager.error('No More Items')
        }

    }

    const addUploadItems = (tempindex, itemindex) => {
        console.log('addUploadItems', tempindex, itemindex)
        let myArray = itemInput[tempindex].items[itemindex].pictures.length

        console.log(myArray, 'pictures-length')

        if (myArray > 3) {
            NotificationManager.error('Sorrry, Only you can upload 4 images of Item');
        } else {
            itemInput[tempindex].items[itemindex].pictures.push(0)
            setitemInput([...itemInput])

        }

    }

    //Handle Upload Logo
    const handleUploadLogo = (e, index) => {
        console.log(handleUploadLogo)
        itemInput[index].upload_logo = e.target.files[0].name

        setUploadLogo(URL.createObjectURL(e.target.files[0]));
    }

    const handleUploadClick = (picindex, e, itemindex) => {
        // setPicval(picindex) //its use for update upload item length

        console.log(e.target.files, 'click upload', picindex, itemindex);

        itemInput.map(function (val) { //main array

            if (val.items == itemindex) {
                val.pictures[picindex] = e.target.files[0].name
            }
        });

        // setFile(URL.createObjectURL(e.target.files[0]));
    }

    //Save Photo
    const savePhoto = () => {
        console.log('savePhoto')

    }
    //Delete Photo
    const deletePhoto = () => {
        console.log('deletePhoto')

        for (let i = 0; itemInput.length > i; i++) {
            itemInput[i].pictures = []
            setitemInput([...itemInput])
        }
    }

    //Save Template
    const saveTemplate1 = (index) => {
        console.log('saveTemplate Click Button', itemInput, index)
        // saveTemplate(itemInput[index], index)

    }

    //Try

    const onStartTime = (e, index) => {
        setStartTimeFirst(e)
        let start_tim = timeConverter(e)
        itemInput[index].start_time = start_tim
        setitemInput([...itemInput])
    }
    const onEndTime = (e, index) => {
        setEndTimeFirst(e)
        let end_tim = timeConverter(e)
        itemInput[index].end_time = end_tim
        setitemInput([...itemInput])
    }
    const handleItemSpeed = (e, index) => {
        itemInput[index].item_speed = e.target.value
        // setitemInput([...itemInput])
    }

    const handleItemName = (e, tempindex, itemindex) => {

        itemInput[tempindex].items[itemindex].item_name = e.target.value
        setitemInput([...itemInput])
    }
    const handleLamp = (e, tempindex, itemindex) => {

        itemInput[tempindex].items[itemindex].lamp = e.target.value
        setitemInput([...itemInput])
    }


    // React.useEffect(()=>{

    // },[itemInput])

    console.log(itemInput, 'itemInput+++++++')


    return (
        <Box>
            <Grid style={{ textAlign: 'center' }}>
                <h2 className='create_project'>Lamps(On)+Display</h2>

                {itemInput.map((tempitem, tempindex) => {
                    return (
                        <>
                            <Grid style={{ justifyContent: 'space-between', display: 'flex' }} item xs={12} sm={12} md={12}>
                                <Grid >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="Start Time"
                                            name='startTime'
                                            value={startTimeFirst}
                                            onChange={(e) => { onStartTime(e, tempindex) }}
                                            // onChange={(newValue) => {
                                            //     setStartTimeFirst(newValue);
                                            // }}


                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="End Time"
                                            value={endTimeFirst}
                                            onChange={(e) => { onEndTime(e, tempindex) }}

                                            // onChange={(newValue) => {
                                            //     setEndTimeFirst(newValue);
                                            // }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                <Grid style={{ paddingTop: 8 }}>
                                    Item Speeds
                                </Grid>
                                <Grid>
                                    <FormControl>
                                        {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="fast" name='item_speed' onChange={(e) => { handleItemSpeed(e, tempindex) }} control={<Radio />} label="Fast" />
                                            <FormControlLabel value="normal" name='item_speed' onChange={(e) => { handleItemSpeed(e, tempindex) }} control={<Radio />} label="Normal" />
                                            <FormControlLabel value="slow" name='item_speed' onChange={(e) => { handleItemSpeed(e, tempindex) }} control={<Radio />} label="Slow" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                <Grid style={{ paddingTop: 8 }}>
                                    Upload Logo
                                </Grid>
                                <Grid>
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <input
                                            hidden accept="image/*"
                                            type="file"
                                            onChange={(e)=>{handleUploadLogo(e, tempindex)}}
                                            
                                        />
                                        <PhotoCamera />
                                    </IconButton>
                                </Grid>
                                <Grid>
                                    <img src={uploadlogo} width={100} height={100} />

                                    <Avatar
                                    // alt="Remy Sharp"
                                    //  src="/static/images/avatar/1.jpg"
                                    />
                                </Grid>
                            </Grid>
                            {tempitem.items.map((itemsdata, itemindex) => {
                                return (
                                    <>
                                        <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                            <Grid >
                                                <TextField
                                                    error={err?.item_name ? 'error' : ''}
                                                    fullWidth
                                                    helperText={err?.item_name ? err?.item_name : 'Please enter item name'}
                                                    id="demo-helper-text-misaligned"
                                                    label="Item Name"
                                                    margin="normal"
                                                    name='item_name'
                                                    onChange={(e) => { handleItemName(e, tempindex, itemindex) }}
                                                // onChange={onChange}
                                                />
                                            </Grid>
                                            <Grid>
                                                <TextField
                                                    error={err?.lamp_num ? 'error' : ''}
                                                    fullWidth
                                                    helperText={err?.lamp_num ? err?.lamp_num : 'Please enter lamp name'}
                                                    id="demo-helper-text-misaligned"
                                                    label="Lamp Number"
                                                    margin="normal"
                                                    name='lamp_num'
                                                    onChange={(e) => { handleLamp(e, tempindex, itemindex) }}
                                                />
                                            </Grid>
                                            <Grid style={{ paddingTop: 30 }}>
                                                <ArrowUpwardIcon style={{ cursor: 'pointer' }} onClick={(e) => { handleUpItems(tempindex, itemindex) }} />
                                                <ArrowDownwardIcon style={{ cursor: 'pointer' }} onClick={(e) => { handleDownItems(tempindex, itemindex) }} />
                                            </Grid>
                                            { tempitem.items.length - 1 == itemindex ?
                                                <>
                                                    <Grid style={{ paddingTop: 30 }}>
                                                        <Icon onClick={() => { addItemInputs(tempindex) }} style={{ color: 'green', cursor: 'pointer' }}>add_circle</Icon>
                                                        <RemoveCircleOutlinedIcon onClick={() => { removeItemInputs(tempindex, itemindex) }} style={{ color: 'red', cursor: 'pointer' }} />
                                                    </Grid>
                                                </> : null
                                            }
                                        </Grid>
                                        <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                            <Grid md={5} style={{ paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                                                Upload Images
                                                <AddCircleIcon onClick={() => { addUploadItems(tempindex, itemindex) }} style={{ color: 'green', cursor: 'pointer' }} />
                                            </Grid>

                                        </Grid>
                                        <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                            <Grid style={{ paddingTop: 8 }}>
                                                {itemsdata.pictures.map((pictures, picindex) => {

                                                    return (
                                                        <>
                                                            <IconButton color="primary" aria-label="upload picture" component="label">
                                                                <input
                                                                    hidden
                                                                    accept="image/*"
                                                                    type="file"
                                                                    onChange={(e) => { handleUploadClick(picindex, e, itemindex) }}
                                                                />
                                                                <PhotoCamera />
                                                                <img src={file} width={100} height={100} />

                                                            </IconButton>
                                                        </>
                                                    )
                                                })}
                                            </Grid>
                                        </Grid>
                                    </>
                                )
                            })}
                            <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'right', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                <Grid style={{ paddingTop: 8 }}>

                                </Grid>
                                <Grid>
                                    <Button onClick={savePhoto} className='save_photo'>Save Photo</Button>
                                </Grid>
                                <Grid>
                                    <Button onClick={deletePhoto} className='delete_photo'>Delete Photo</Button>
                                </Grid>
                                <Grid >
                                    <Button onClick={() => { saveTemplate1(tempindex) }} className='save_temp' >Save Template</Button>
                                </Grid>
                            </Grid>
                        </>
                    )
                })}
            </Grid>
        </Box>
    );
}

export default Template1;
