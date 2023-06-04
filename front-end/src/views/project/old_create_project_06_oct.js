import React from 'react';
import Box from '@mui/material/Box';
import Page from '../../components/Pages';
import { Grid, Container, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import timepicker from 'react-time-picker';
import global from '../../utils/global';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { NotificationManager } from 'react-notifications';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import authChecker from '../../utils/authHelper';
//Date Picker
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//End Date Picker
// import validate from '../FormValidationRules';
// import {logIn } from '../../utils/Api';
// import AuthContext from '../../context/AuthContext';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import Template4 from './Template4';
import validate from '../../pages/FormValidationRules';
import { imageUpload, checkTemplate, addProject } from '../../utils/Api';
import TranslateContext from '../../context/TranslateContext';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
const CreateProject = () => {
  const navigate = useNavigate();
  const [date, setDate] = React.useState(null); //Datepicker
  const [projectValue, setprojectValue] = React.useState(false);
  const [err, setError] = React.useState();
  const [disable, setDisable] = React.useState(true);
  const errdata = 'Sorry, Only you can create 4 Items'
  const {translateFunc}= React.useContext(TranslateContext); //Get Translate Data

  const [tempform, setTempform] = React.useState({
    project_name: '',
    project_date: '',
    templates: [{
      temp_value: '',
      start_time: '',
      start_time_e: '',
      end_time: '',
      end_time_e: '',
      item_speed: '',
      logo_image: '',
      data_items: [{
        item_name: '',
        lamp: '',
        pictures: [],
        videos: ''
      }]

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

  React.useEffect(()=>{
    if (!authChecker('authCheck')) navigate('/', { replace: true });

  },[])

  function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  //Handle Project Name

  const handleProject = (e) => {
    console.log('Project Name')
    tempform.project_name = e.target.value
    setTempform({ ...tempform })
  }
  const handleDate = (e) => {
    setDate(e)
    console.log('Project Date')
    let new_date = new Date(e.$d).toISOString()
    tempform.project_date = new_date.split("T")[0]
    setTempform({ ...tempform })
  }

  //Add Item nad Item Number Function
  const addItemInputs = (itemindex, index) => {
    console.log('addItemInputs', itemindex, index)

    if (tempform.templates[index].data_items.length > 3) {
      NotificationManager.error(translateFunc('Sorry, only you can create 4 Items'))

    } else {
      let newfield = {
        item_name: '',
        lamp: '',
        pictures: [],
        videos: ''

      }
      console.log('check add item', tempform)
      tempform.templates[index].data_items.push(newfield)
      setTempform({ ...tempform })
    }
  }
  //Remove Item nad Item Number Function using filter
  const removeItemInputs = (itemindex, index) => {
    console.log('removeItemInputs', itemindex, index)
    console.log('fdfd', tempform.templates[index].data_items)

    let myArray = tempform.templates[index].data_items.filter(function (item, itemndex) {
      return itemndex != itemindex;
    });
    console.log('new array ', myArray)

    tempform.templates[index].data_items = myArray
    setTempform({ ...tempform })

  }

  //Item up Arrow
  const handleUpItems = (itemindex, index) => {
    console.log('handleUpItems', itemindex, index)
    if (itemindex == 0) {
      console.log('up item false')
      NotificationManager.error(translateFunc('No More Items'))
    } else {
      console.log('upiteminsert')
      let from = tempform.templates[index].data_items[itemindex];
      let to = tempform.templates[index].data_items[itemindex - 1];
      tempform.templates[index].data_items[itemindex] = to;
      tempform.templates[index].data_items[itemindex - 1] = from
      setTempform({ ...tempform })

    }

  }

  //Item Down Arrow
  const handleDownItems = (itemindex, index) => {
    console.log('handleDownItems', itemindex, index)
    if (tempform.templates[index].data_items[itemindex + 1]) { //check index is avaliable or not

      if (itemindex == 3) {
        NotificationManager.error(translateFunc('No More Items'))
      } else {
        console.log('downitem shuffle')
        let from = tempform.templates[index].data_items[itemindex];
        let to = tempform.templates[index].data_items[itemindex + 1];
        tempform.templates[index].data_items[itemindex] = to;
        tempform.templates[index].data_items[itemindex + 1] = from
        setTempform({ ...tempform })

      }

    } else {
      NotificationManager.error(translateFunc('No More Items'))
    }

  }

  const addUploadItems = (itemindex, index) => {
    console.log('addUploadItems', itemindex, index)

    let myArray = tempform.templates[index].data_items[itemindex].pictures.length

    console.log(myArray, 'pictures-length')

    if (myArray > 3) {
      NotificationManager.error(translateFunc('Sorry, only you can upload 4 images of Items'));
      // NotificationManager.error('Sorrry, Only you can upload 4 images of Item');

    } else {
      tempform.templates[index].data_items[itemindex].pictures.push('')
      setTempform({ ...tempform })

    }

  }

  //Handle Upload Logo
  const handleUploadLogo = async (e, index) => {
    console.log('handleUploadLogo', e, index)

    console.log(e.target.files[0], 'click upload', index);
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    await imageUpload(formData, { token: localStorage.getItem('token') }).then((res) => {
      // setplanImg(res.data.filename)
      console.log(res, 'res+++++++++')
      if (res.code === 200) {
        tempform.templates[index].logo_image = res.data
        setTempform({ ...tempform })
      } else {
        NotificationManager.error('Somwthing Went Wrong');

      }
    })
    // itemInput[index].logo_image = e.target.files[0].name

    // setUploadLogo(URL.createObjectURL(e.target.files[0]));
  }

  const handleUploadVideo = async (e, index) => {
    console.log('handleUploadVideo', index)
    // tempform.templates[index].data_items.pictures[] = e.target.files[0].name
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    await imageUpload(formData, { token: localStorage.getItem('token') }).then((res) => {
      // setplanImg(res.data.filename)
      console.log(res, 'res+++++++++ Video')
      if (res.code === 200) {
        tempform.templates[index].data_items[0].videos = res.data
        setTempform({ ...tempform })
      } else {
        NotificationManager.error(translateFunc('Something Went Wrong'));

      }
    })

    setTempform({ ...tempform })

  }

  const handleUploadClick = async (e, picindex, itemindex, index) => {
    // setPicval(picindex) //its use for update upload item length

    console.log(e.target.files[0], 'click upload', picindex, itemindex, index);
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    await imageUpload(formData, { token: localStorage.getItem('token') }).then((res) => {
      // setplanImg(res.data.filename)
      console.log(res, 'res+++++++++')
      if (res.code === 200) {
        tempform.templates[index].data_items[itemindex].pictures[picindex] = res.data
        setTempform({ ...tempform })
      } else {
        NotificationManager.error(translateFunc('Something Went Wrong'));

      }
    })

  }

  //Save Photo
  const savePhoto = (e) => {
    console.log('savePhoto')
    NotificationManager.success(translateFunc('Photos Add Successfully'))


  }
  //Delete Photo
  const deletePhoto = (index) => {
    console.log('deletePhoto', index)
    for (let i = 0; tempform.templates[index].data_items.length > i; i++) {
      tempform.templates[index].data_items[i].pictures = []
      setTempform({ ...tempform })
    }
  }

  //Delete Video
  const deleteVideo = (index) => {
    console.log('deletePhoto', index)

    tempform.templates[index].data_items[index].videos = ''
    setTempform({ ...tempform })

  }

  //Save Template
  const saveTemplate1 = (index) => {
    setprojectValue(false)
    NotificationManager.success(translateFunc('Template Add Succesfully'))

    // console.log('saveTemplate Click Button', index)
    // let data = tempform.templates[index].data_items

    // var hasDuplicate = false;
    // data.map(v => v.lamp).sort().sort((a, b) => {
    //   if (a === b) hasDuplicate = true
    // })

    // if (hasDuplicate == true) {
    //   NotificationManager.error(translateFunc('Please enter unique Lamp Number'))

    // } else {
    //   NotificationManager.success(translateFunc('Template Add Succesfully'))

    // }

    // console.log('hasDuplicate', hasDuplicate)


    console.log('dataFinal', tempform)
    // setTempform({...})
    // saveTemplate(itemInput[index], index)

  }


  //Template Save 2
  const saveTemplate2 = (index) => {
    console.log('saveTemplate2', index)
    console.log('dataFinal2', tempform)
    NotificationManager.success(translateFunc('Template Add Succesfully'))
    setprojectValue(false)

  }
  const saveTemplate3 = (index) => {
    NotificationManager.success(translateFunc('Template Add Succesfully'))
    setprojectValue(false)

    console.log('saveTemplate3', index)
    console.log('dataFinal3', tempform)
  }
  const saveTemplate4 = (index) => {
    NotificationManager.success(translateFunc('Template Add Succesfully'))
    setprojectValue(false)

    console.log('saveTemplate4', index)
    console.log('dataFinal4', tempform)
  }

  //Try

  const onStartTime = (e, index) => {
    console.log('startTime', e)
    console.log('index val', index)

    let start_tim = timeConverter(e)
    tempform.templates[index].start_time = start_tim
    tempform.templates[index].start_time_e = e

    setTempform({ ...tempform })
  }

  const onEndTime = (e, index) => {
    let end_tim = timeConverter(e)
    tempform.templates[index].end_time = end_tim
    tempform.templates[index].end_time_e = e

    setTempform({ ...tempform })

  }
  const handleItemSpeed = (e, index) => {
    tempform.templates[index].item_speed = e.target.value
    setTempform({ ...tempform })

  }

  const handleItemName = (e, itemindex, index) => {

    tempform.templates[index].data_items[itemindex].item_name = e.target.value
    setTempform({ ...tempform })

  }
  const handleLamp = (e, itemindex, index) => {
    console.log('e.target.value', e.target.value)
    let data = tempform.templates[index].data_items
    var isDuplicate = false;

      console.log('remove call', val)
      let myArray = data.filter(function (obj, index) {
        if (obj.lamp ==  e.target.value) isDuplicate = true
      });

    if (isDuplicate == true) {
      NotificationManager.error(translateFunc('Please enter unique Lamp Number'))
      // tempform.templates[index].data_items[itemindex].lamp = e.target.value
      // setTempform({ ...tempform })
    } else {
      // NotificationManager.success('Template Add Succesfully')
   tempform.templates[index].data_items[itemindex].lamp = e.target.value
    setTempform({ ...tempform })
    }


 
  }


  //End Template 1

  const [addButton, setAddButton] = React.useState(false)
  const [val, setValue] = React.useState('') //its use for update form onChnage                                             
  const addTemplateSelect = () => {

    let newfield = {
      temp_value: '',
      start_time: '',
      start_time_e: '',
      end_time: '',
      end_time_e: '',
      item_speed: '',
      logo_image: '',
      data_items: [{
        item_name: '',
        lamp: '',
        pictures: [],
        videos: ''
      }]
    }
    tempform.templates.push(newfield)
    setTempform({ ...tempform })

  }

  const addForm = (index, e) => {
    if (e.target.value >= 1) {
      setAddButton(true) //add template button value true then show

    } else {
      setAddButton(false) //add template button value false then disable

    }

    tempform.templates[index].temp_value = e.target.value;

    console.log(tempform, 'tempform',)

    setTempform({ ...tempform })
  }


  //Remove

  const Remove = (val) => {
    console.log('remove call', val)
    let myArray = tempform.templates.filter(function (obj, index) {
      return index != val;
    });
    tempform.templates = myArray
    setTempform({ ...tempform })

  }
  React.useEffect(() => {

  }, [val, tempform])


  //Final Submit Project
  const submitProject = (e) => {
    e.preventDefault();
    setprojectValue(true)
    checkTemplate(tempform).then((res) => {
      console.log('ress', res)
      if (res.code === 200) {
        NotificationManager.success(res.msg)
        setDisable(false)
      } else {
        NotificationManager.error(res.msg)
        setDisable(true)
      }
    }).catch((res) => {
      NotificationManager.error(translateFunc('Internal Server Error'))
    })
    console.log(tempform, 'tempform Project')

  }
  //Generate Button
  const generateButton = (e) => {
    e.preventDefault();

    //Validation Check
    var validateErr = validate({
      project_name: tempform.project_name,
      project_date: tempform.project_date,
    });

    setError(validateErr);
    console.log('check err', err)
    if (Object.keys(validateErr).length == 0) {

      addProject(tempform).then((res) => {
        console.log('ress', res)
        if (res.code === 200) {
          NotificationManager.success(res.msg)
          navigate('/project')
        } else {
          NotificationManager.error(res.msg)
        }
      }).catch((res) => {
        NotificationManager.error(translateFunc('Internal Server Error'))
      })
    }
    console.log(tempform, 'tempform Project')

  }
  console.log(tempform, 'tempform Project')


  return (
    <Box>
      <Container>
        <Grid style={{ textAlign: 'center' }} py={3}>
          <h2 className='create_project'>{translateFunc('Create Project')}</h2>
        </Grid>
        <Grid container spacing={2} >
          <Grid style={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} item xs={12}>

            <Grid style={{ margin: '0 10px' }} item xs={12} sm={6} md={6} >
              <TextField
                error={err?.project_name ? 'error' : ''}
                fullWidth
                helperText={err?.project_name ? translateFunc(err?.project_name) : translateFunc('Please enter project name')}
                id="demo-helper-text-misaligned"
                label={translateFunc("Project Name")}
                margin="normal"
                name='project_name'
                onChange={handleProject}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>

                <DatePicker

                  label={translateFunc("Select Date")}
                  value={date}
                  onChange={handleDate}


                  renderInput={(params) => <TextField
                    fullWidth {...params}
                    error={err?.project_date ? 'error' : ''}
                    helperText={err?.project_date ? translateFunc(err?.project_date) : translateFunc('Please enter project date')}


                  />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid style={{ margin: '0 10px' }} item xs={12} sm={6} md={10}>

              {tempform.templates.map((item, index) => {
                // console.log('indexxx', index, input)

                return (

                  <div className='test1' style={{ marginTop: 25, position: 'relative' }} key={index}>
                    <Select
                      style={{ maxWidth: 575 }}
                      fullWidth
                      native
                      onChange={(e) => { addForm(index, e) }}

                    >
                      <option >{translateFunc('Select Template')}</option>
                      <option value={1} selected={item.temp_value == 1 ? 'selected' : ''}>{translateFunc('Lamps(On)+Display')}</option>
                      <option value={2} selected={item.temp_value == 2 ? 'selected' : ''}>{translateFunc('Lamps(Off)+Display')}</option>
                      <option value={3} selected={item.temp_value == 3 ? 'selected' : ''}>{translateFunc('Lamps(On) Without Display')}</option>
                      <option value={4} selected={item.temp_value == 4 ? 'selected' : ''}>{translateFunc('Without Lamps-Only Display')}</option>

                    </Select>
                    {item.temp_value == 1 ?
                      <>
                        <Accordion style={{ margin: '25px 0', backgroundColor: '#a9a9a96b' }}>

                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography style={{ fontSize: 12, fontWeight: 700 }}>{translateFunc('Lamps(On)+Display Form')}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>

                            <Grid style={{ textAlign: 'center' }}>
                              <h2 className='create_project'>{translateFunc('Lamps(On)+Display')}</h2>

                              <Grid style={{ justifyContent: 'space-between', display: 'flex' }} item xs={12} sm={12} md={12}>
                                <Grid >
                                  <LocalizationProvider id='5555' dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                      label={translateFunc("Start Time")}
                                      value={item?.start_time_e ? item?.start_time_e : null}
                                      onChange={(e) => { onStartTime(e, index) }}
                                      renderInput={(params, index) => <TextField {...params}/>}
                                    />
                                  </LocalizationProvider>
                                </Grid>

                                {/* <Grid >
                                  <LocalizationProvider id='5589' dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                      label="last Time"
                                      value={tempform.templates[index]?.start_time_e ? tempform.templates[0]?.start_time_e : null}
                                      onChange={(e) => { onStartTime(e, index) }}
                                      renderInput={(params, index) => <TextField {...params} id='Santos' className='tyf'/>}
                                    />
                                  </LocalizationProvider>
                                </Grid> */}

                                <Grid>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                      label={translateFunc("End Time")}
                                      value={item?.end_time_e ? item.end_time_e : null}
                                      onChange={(e) => { onEndTime(e, index) }}
                                      renderInput={(params) => <TextField {...params} />}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                              </Grid>
                              <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                <Grid style={{ paddingTop: 8 }}>
                                  {translateFunc('Item Speeds')}
                                </Grid>
                                <Grid>
                                  <FormControl>
                                    {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                                    <RadioGroup
                                      row
                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                      name="row-radio-buttons-group"
                                    >
                                      <FormControlLabel value="FAST" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={translateFunc('Fast')} />
                                      <FormControlLabel value="NORMAL" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={translateFunc('Normal')} />
                                      <FormControlLabel value="SLOW" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={translateFunc('Slow')} />
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>
                              </Grid>

                              <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                <Grid style={{ paddingTop: 8 }}>
                                  {translateFunc('Upload Logo')}
                                </Grid>
                                <Grid>
                                  <IconButton color="primary" aria-label="upload picture" component="label">
                                    <input
                                      hidden accept="image/*"
                                      type="file"
                                      onChange={(e) => { handleUploadLogo(e, index) }}

                                    />
                                    <PhotoCamera />
                                  </IconButton>
                                </Grid>
                                <Grid>
                                  {tempform.templates[index].logo_image != '' ?

                                    <img
                                      src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].logo_image}`}

                                      width={100}
                                      height={100} />
                                    : null
                                  }
                                  {/* <Avatar
                                  // alt="Remy Sharp"
                                  //  src="/static/images/avatar/1.jpg"
                                  /> */}
                                </Grid>
                              </Grid>
                              {item.data_items.map((itemsdata, itemindex) => {

                                return (
                                  <>
                                    <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                      <Grid >
                                        <TextField
                                          error={err?.item_name ? 'error' : ''}
                                          fullWidth
                                          helperText={err?.item_name ? translateFunc('err?.item_name') : translateFunc('Please enter item name')}
                                          id="demo-helper-text-misaligned"
                                          label={translateFunc('Item Name')}
                                          margin="normal"
                                          name='item_name'
                                          onChange={(e) => { handleItemName(e, itemindex, index) }}
                                        // onChange={onChange}
                                        />
                                      </Grid>
                                      <Grid>
                                        <TextField
                                          error={err?.lamp_num ? 'error' : ''}
                                          fullWidth
                                          helperText={err?.lamp_num ? err?.lamp_num : 'Please enter lamp name'}
                                          id="demo-helper-text-misaligned"
                                          label={translateFunc('Lamp Number')}
                                          margin="normal"
                                          name='lamp_num'
                                          onChange={(e) => { handleLamp(e, itemindex, index) }}
                                        />
                                      </Grid>
                                      <Grid style={{ paddingTop: 30 }}>
                                        <ArrowUpwardIcon style={{ cursor: 'pointer' }} onClick={(e) => { handleUpItems(itemindex, index) }} />
                                        <ArrowDownwardIcon style={{ cursor: 'pointer' }} onClick={(e) => { handleDownItems(itemindex, index) }} />
                                      </Grid>
                                      {item.data_items.length - 1 == itemindex ?
                                        <>
                                          <Grid style={{ paddingTop: 30 }}>
                                            <Icon onClick={() => { addItemInputs(itemindex, index) }} style={{ color: 'green', cursor: 'pointer' }}>add_circle</Icon>
                                            <RemoveCircleOutlinedIcon onClick={() => { removeItemInputs(itemindex, index) }} style={{ color: 'red', cursor: 'pointer' }} />
                                          </Grid>
                                        </>
                                        : null
                                      }
                                    </Grid>
                                    <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                      <Grid md={5} style={{ paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                                        {translateFunc('Upload Images')}
                                        <AddCircleIcon onClick={() => { addUploadItems(itemindex, index) }} style={{ color: 'green', cursor: 'pointer' }} />
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
                                                  onChange={(e) => { handleUploadClick(e, picindex, itemindex, index) }}
                                                />
                                                <PhotoCamera />
                                                {/* <Avatar
                                                    // className={classes.avatar}
                                                    src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].data_items[itemindex].pictures[picindex]}`}
                                                >
                                                  
                                                </Avatar> */}
                                                {tempform.templates[index].data_items[itemindex].pictures[picindex] != ''?
                                                <img
                                                  src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].data_items[itemindex].pictures[picindex]}`}
                                                  width={100}
                                                  height={100} />
                                                  :null}
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
                                  <Button onClick={savePhoto} className='save_photo'>{translateFunc('Save Photo')}</Button>
                                </Grid>
                                <Grid>
                                  <Button onClick={() => { deletePhoto(index) }} className='delete_photo'>{translateFunc('Delete Photo')}</Button>
                                </Grid>
                                <Grid >
                                  <Button onClick={() => { saveTemplate1(index) }} className='save_temp' >{translateFunc('Save Template')}</Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </AccordionDetails>

                        </Accordion >
                        <RemoveCircleOutlinedIcon clssName='1stTemp' onClick={() => { Remove(index) }} style={{ color: 'red', cursor: 'pointer', float: 'left', margin: ' 0 0 0 710px', top: '92px', right: '-48px', position: 'absolute' }} />


                      </>
                      : item.temp_value == 2 ?
                        <>

                          <Accordion style={{ margin: '25px 0', backgroundColor: '#a9a9a96b' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography style={{ fontSize: 12, fontWeight: 700 }}>{translateFunc('Lamps(Off)+Display Form')}</Typography>
                              <RemoveCircleOutlinedIcon onClick={() => { Remove(index) }} style={{ color: 'red', float: 'left', margin: ' 0 0 0 710px', top: '11px', right: '-48px', position: 'absolute' }} />

                            </AccordionSummary>
                            <AccordionDetails>

                              <Grid style={{ textAlign: 'center' }}>
                                <h2 className='create_project'> {translateFunc('Lamps(Off)+Display')}</h2>

                                <Grid style={{ justifyContent: 'space-between', display: 'flex' }} item xs={12} sm={12} md={12}>
                                  <Grid >
                                    {/* <timepicker onchange={onchange} value='{value}' />   */}
                                    <LocalizationProvider id='5555' dateAdapter={AdapterDayjs}>

                                      <TimePicker
                                        label={translateFunc('Start Time')}
                                        value={item?.start_time_e ? item?.start_time_e : null}
                                        onChange={(e) => { onStartTime(e, index) }}
                                        renderInput={(params, index) => <TextField {...params} id={index} />}
                                      />
                                    </LocalizationProvider>
                                  </Grid>
                                  <Grid>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <TimePicker
                                        label={translateFunc('End Time')}
                                        value={item?.end_time_e ? item?.end_time_e : null}
                                        onChange={(e) => { onEndTime(e, index) }}
                                        renderInput={(params) => <TextField {...params} />}
                                      />
                                    </LocalizationProvider>
                                  </Grid>
                                </Grid>
                                <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                  <Grid style={{ paddingTop: 8 }}>
                                    {translateFunc('Item Speeds')}
                                  </Grid>
                                  <Grid>
                                    <FormControl>
                                      {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                      >
                                        <FormControlLabel value="FAST" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={translateFunc('Fast')} />
                                        <FormControlLabel value="NORMAL" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={translateFunc('Normal')} />
                                        <FormControlLabel value="SLOW" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={translateFunc('Slow')} />
                                      </RadioGroup>
                                    </FormControl>
                                  </Grid>
                                </Grid>

                                <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                  <Grid style={{ paddingTop: 8 }}>
                                  {translateFunc('Upload Logo')}
                                  </Grid>
                                  <Grid>
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                      <input
                                        hidden accept="image/*"
                                        type="file"
                                        onChange={(e) => { handleUploadLogo(e, index) }}

                                      />
                                      <PhotoCamera />
                                    </IconButton>
                                  </Grid>
                                  <Grid>
                                    {tempform.templates[index].logo_image != '' ?

                                      <img
                                        src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].logo_image}`}

                                        width={100}
                                        height={100} />
                                      : null
                                    }

                                    {/* <img src={uploadlogo} width={100} height={100} /> */}

                                    {/* <Avatar
                                  // alt="Remy Sharp"
                                  //  src="/static/images/avatar/1.jpg"
                                  /> */}
                                  </Grid>
                                </Grid>
                                {item.data_items.map((itemsdata, itemindex) => {

                                  return (
                                    <>
                                      <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                        <Grid >
                                          <TextField
                                            error={err?.item_name ? 'error' : ''}
                                            fullWidth
                                            helperText={err?.item_name ? translateFunc(err?.item_name) : translateFunc('Please enter item name')}
                                            id="demo-helper-text-misaligned"
                                            label={translateFunc('Item Name')}
                                            margin="normal"
                                            name='item_name'
                                            onChange={(e) => { handleItemName(e, itemindex, index) }}
                                          // onChange={onChange}
                                          />
                                        </Grid>
                                        <Grid style={{ paddingTop: 30 }}>
                                          <ArrowUpwardIcon style={{ cursor: 'pointer' }} onClick={(e) => { handleUpItems(itemindex, index) }} />
                                          <ArrowDownwardIcon style={{ cursor: 'pointer' }} onClick={(e) => { handleDownItems(itemindex, index) }} />
                                        </Grid>
                                        {item.data_items.length - 1 == itemindex ?
                                          <>
                                            <Grid style={{ paddingTop: 30 }}>
                                              <Icon onClick={() => { addItemInputs(itemindex, index) }} style={{ color: 'green', cursor: 'pointer' }}>add_circle</Icon>
                                              <RemoveCircleOutlinedIcon onClick={() => { removeItemInputs(itemindex, index) }} style={{ color: 'red', cursor: 'pointer' }} />
                                            </Grid>
                                          </>
                                          : null
                                        }
                                      </Grid>
                                      <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                        <Grid md={5} style={{ paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                                         {translateFunc('Upload Images')}
                                          <AddCircleIcon onClick={() => { addUploadItems(itemindex, index) }} style={{ color: 'green', cursor: 'pointer' }} />
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
                                                    onChange={(e) => { handleUploadClick(e, picindex, itemindex, index) }}
                                                  />
                                                  <PhotoCamera />
                                                  {tempform.templates[index].data_items[itemindex].pictures[picindex] != ''?

                                                  <img
                                                    src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].data_items[itemindex].pictures[picindex]}`}
                                                    width={100}
                                                    height={100} />
                                                :null}
                                                  {/* <img src={file} width={100} height={100} /> */}

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
                                    <Button onClick={savePhoto} className='save_photo'>{translateFunc('Save Photo')}</Button>
                                  </Grid>
                                  <Grid>
                                    <Button onClick={() => { deletePhoto(index) }} className='delete_photo'>{translateFunc('Delete Photo')}</Button>
                                  </Grid>
                                  <Grid >
                                    <Button onClick={() => { saveTemplate2(index) }} className='save_temp' >{translateFunc('Save Template')}</Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </AccordionDetails>

                          </Accordion >

                        </> : item.temp_value == 3 ?
                          <>
                            <Accordion style={{ margin: '25px 0', backgroundColor: '#a9a9a96b' }}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography style={{ fontSize: 12, fontWeight: 700 }}>{translateFunc('Lamps(On) Without Display Form')}</Typography>
                                <RemoveCircleOutlinedIcon onClick={() => { Remove(index) }} style={{ color: 'red', float: 'left', margin: ' 0 0 0 710px', top: '11px', right: '-48px', position: 'absolute' }} />
                              </AccordionSummary>
                              <AccordionDetails>

                                <Grid style={{ textAlign: 'center' }}>
                                  <h2 className='create_project'>{translateFunc('Lamps(On) Without Display')}</h2>

                                  <Grid style={{ justifyContent: 'space-between', display: 'flex' }} item xs={12} sm={12} md={12}>
                                    <Grid >
                                      {/* <timepicker onchange={onchange} value='{value}' />   */}
                                      <LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <TimePicker
                                          label={translateFunc('Start Time')}
                                          value={item.start_time_e ? item?.start_time_e : null}
                                          onChange={(e) => { onStartTime(e, index) }}
                                          renderInput={(params, index) => <TextField {...params} id={index} />}
                                        />
                                      </LocalizationProvider>
                                    </Grid>
                                    <Grid>
                                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                           label={translateFunc('End Time')}
                                          value={item?.end_time_e ? item?.end_time_e : null}
                                          onChange={(e) => { onEndTime(e, index) }}
                                          renderInput={(params) => <TextField {...params} />}
                                        />
                                      </LocalizationProvider>
                                    </Grid>
                                  </Grid>
                                  <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                    <Grid style={{ paddingTop: 8 }}>
                                      {translateFunc('Item Speeds')}
                                    </Grid>
                                    <Grid>
                                      <FormControl>
                                        {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                                        <RadioGroup
                                          row
                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                          name="row-radio-buttons-group"
                                        >
                                          <FormControlLabel value="FAST" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={translateFunc('Fast')} />
                                          <FormControlLabel value="NORMAL" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={translateFunc('Normal')} />
                                          <FormControlLabel value="SLOW" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={translateFunc('Slow')} />
                                        </RadioGroup>
                                      </FormControl>
                                    </Grid>
                                  </Grid>

                                  <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                    <Grid style={{ paddingTop: 8 }}>
                                      {translateFunc('Upload Logo')}
                                    </Grid>
                                    <Grid>
                                      <IconButton color="primary" aria-label="upload picture" component="label">
                                        <input
                                          hidden accept="image/*"
                                          type="file"
                                          onChange={(e) => { handleUploadLogo(e, index) }}
                                        />
                                        <PhotoCamera />
                                      </IconButton>
                                    </Grid>
                                    <Grid>
                                      {tempform.templates[index].logo_image != '' ?

                                        <img
                                          src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].logo_image}`}
                                          width={100}
                                          height={100} />
                                        : null
                                      }
                                      {/* <Avatar
                                  // alt="Remy Sharp"
                                  //  src="/static/images/avatar/1.jpg"
                                  /> */}
                                    </Grid>
                                  </Grid>
                                  {item.data_items.map((itemsdata, itemindex) => {

                                    return (
                                      <>
                                        <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                          <Grid >
                                            <TextField
                                              error={err?.item_name ? 'error' : ''}
                                              fullWidth
                                              helperText={err?.item_name ? translateFunc(err?.item_name) : translateFunc('Please enter item name')}
                                              id="demo-helper-text-misaligned"
                                              label={translateFunc('Item Name')}
                                              margin="normal"
                                              name='item_name'
                                              onChange={(e) => { handleItemName(e, itemindex, index) }}
                                            // onChange={onChange}
                                            />
                                          </Grid>
                                          <Grid>
                                            <TextField
                                              error={err?.lamp_num ? 'error' : ''}
                                              fullWidth
                                              helperText={err?.lamp_num ? translateFunc(err?.lamp_num) : translateFunc('Please enter lamp name')}
                                              id="demo-helper-text-misaligned"
                                              label={translateFunc('Lamp Number')}
                                              margin="normal"
                                              name='lamp_num'
                                              onChange={(e) => { handleLamp(e, itemindex, index) }}
                                            />
                                          </Grid>
                                          <Grid style={{ paddingTop: 30 }}>
                                            <ArrowUpwardIcon style={{ cursor: 'pointer' }} onClick={(e) => { handleUpItems(itemindex, index) }} />
                                            <ArrowDownwardIcon style={{ cursor: 'pointer' }} onClick={(e) => { handleDownItems(itemindex, index) }} />
                                          </Grid>
                                          {item.data_items.length - 1 == itemindex ?
                                            <>
                                              <Grid style={{ paddingTop: 30 }}>
                                                <Icon onClick={() => { addItemInputs(itemindex, index) }} style={{ color: 'green', cursor: 'pointer' }}>add_circle</Icon>
                                                <RemoveCircleOutlinedIcon onClick={() => { removeItemInputs(itemindex, index) }} style={{ color: 'red', cursor: 'pointer' }} />
                                              </Grid>
                                            </>
                                            : null
                                          }
                                        </Grid>

                                      </>
                                    )
                                  })}

                                  <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'right', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                    <Grid style={{ paddingTop: 8 }}>

                                    </Grid>
                                    {/* <Grid>
                                  <Button onClick={savePhoto} className='save_photo'>Save Photo</Button>
                                </Grid>
                                <Grid>
                                  <Button onClick={()=>{deletePhoto(index)}} className='delete_photo'>Delete Photo</Button>
                                </Grid> */}
                                    <Grid >
                                      <Button onClick={() => { saveTemplate3(index) }} className='save_temp' >{translateFunc('Save Template')}</Button>
                                    </Grid>
                                  </Grid>
                                </Grid>

                              </AccordionDetails>

                            </Accordion >

                          </> : item.temp_value == 4 ?
                            <>
                              <Accordion style={{ margin: '25px 0', backgroundColor: '#a9a9a96b' }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography style={{ fontSize: 12, fontWeight: 700 }}>{translateFunc('Without Lamps-Only Display Form')}</Typography>
                                  <RemoveCircleOutlinedIcon onClick={() => { Remove(index) }} style={{ color: 'red', float: 'left', margin: ' 0 0 0 710px', cursor: 'pointer', top: '11px', right: '-48px', position: 'absolute' }} />

                                </AccordionSummary>
                                <AccordionDetails>

                                  <Grid style={{ textAlign: 'center' }}>
                                    <h2 className='create_project'>{translateFunc('Without Lamps-Only Display')}</h2>

                                    <Grid style={{ justifyContent: 'space-between', display: 'flex' }} item xs={12} sm={12} md={12}>
                                      <Grid >
                                        <LocalizationProvider id='5555' dateAdapter={AdapterDayjs}>

                                          <TimePicker
                                            label={translateFunc('Start Time')}
                                            value={item?.start_time_e ? item?.start_time_e : null}
                                            onChange={(e) => { onStartTime(e, index) }}
                                            renderInput={(params, index) => <TextField {...params} id={index} />}
                                          />
                                        </LocalizationProvider>
                                      </Grid>
                                      <Grid>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <TimePicker
                                             label={translateFunc('End Time')}
                                            value={item?.end_time_e ? item?.end_time_e : null}
                                            onChange={(e) => { onEndTime(e, index) }}
                                            renderInput={(params) => <TextField {...params} />}
                                          />
                                        </LocalizationProvider>
                                      </Grid>
                                    </Grid>
                                    <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '35px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                      <Grid style={{ paddingTop: 40 }}>
                                        {translateFunc('Upload Video')}
                                      </Grid>
                                      <Grid style={{ paddingTop: 40 }}>
                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                          <input hidden 
                                            type="file"
                                            accept="video/mp4,video/x-m4v,video/*"
                                            onChange={(e) => { handleUploadVideo(e, index) }}
                                          />
                                          <VideoFileIcon />
                                        </IconButton>
                                      </Grid>
                                      <Grid>
                                        {tempform.templates[index]?.data_items[index]?.videos != '' ?
                                          <video width="200" controls>
                                            <source
                                              src={`${global.serverUrl}uploads/template_image/${tempform.templates[index]?.data_items[0]?.videos}`}
                                            />
                                          </video>
                                          : null}

                                        {/* <Avatar
                                    // alt="Remy Sharp"
                                  //  src="/static/images/avatar/1.jpg"
                                    /> */}
                                      </Grid>
                                    </Grid>

                                    <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'right', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                      <Grid style={{ paddingTop: 8 }}>

                                      </Grid>
                                      {/* <Grid>
                                  <Button onClick={savePhoto} className='save_photo'>Save Photo</Button>
                                </Grid> */}
                                      <Grid>
                                        <Button onClick={() => { deleteVideo(index) }} className='delete_photo'>{translateFunc('Delete Video')}</Button>
                                      </Grid>
                                      <Grid >
                                        <Button onClick={() => { saveTemplate4(index) }} className='save_temp' >{translateFunc('Save Template')}</Button>
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                </AccordionDetails>

                              </Accordion >

                            </>
                            : ''
                    }
                  </div>
                )
              })}
              {tempform.templates.length >= 1 ?
                <>
                  <Button style={{ float: 'left', margin: '12px 0' }} className='save_temp' onClick={() => { addTemplateSelect(1) }}>{translateFunc('Add New Template')}</Button>
                  <Button style={{ float: 'right' }} className='subpro' onClick={submitProject}> {translateFunc('Submit Project ')}</Button>

                </> : ''

              }

            </Grid>
          </Grid>
        </Grid>
        {projectValue ?
          <Grid style={{ justifyContent: 'space-between' }} item xs={12} sm={12} md={12}>
            <h4 style={{ textAlign: 'left', width: '159px' }}>{translateFunc('Final File Generation')}</h4>
            <Grid col-md-12 style={{ border: '1px solid', padding: '3px 0 0 22px' }}>
              <h3 style={{ textAlign: 'left' }}><span>{translateFunc('Project Name')}:</span> <span style={{ textAlign: 'left', fontwweight: '100' }}>{tempform.project_name}</span></h3>
              <Grid className='Filegeneration'>
                <h3 style={{ textAlign: 'center' }} >{translateFunc('File Generation')}</h3>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell ><strong>{translateFunc('Template Name')}</strong></TableCell>
                        <TableCell ><strong>{translateFunc('Start Time')}</strong></TableCell>
                        <TableCell ><strong>{translateFunc('End Time')}</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {tempform.templates.map((row, item) => (
                        <TableRow
                          key={row.item}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                          <TableCell >{row.temp_value == 1 ? 'Lamps(On)+Display' : row.temp_value == 2 ? 'Lamps(Off)+Display' : row.temp_value == 3 ? 'Lamps(On) Without Display' : row.temp_value == 4 ? 'Without Lamps-Only Display' : ''}</TableCell>
                          <TableCell >{tConvert(row.start_time)}</TableCell>
                          <TableCell >{tConvert(row.end_time)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid style={{ textAlign: 'center' }} mt={5}>
                  <Button className='btn-generate' disabled={disable} onClick={generateButton}  > GENERATE</Button>
                </Grid>
              </Grid>
              <h3>{translateFunc('PREVIEW VIDEO')}</h3>
            </Grid>
          </Grid>
          : null}
      </Container>
    </Box>
  );
}

export default CreateProject;
