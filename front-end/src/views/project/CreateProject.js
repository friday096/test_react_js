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
import FormHelperText from '@mui/material/FormHelperText';
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
import { FileUploader } from "react-drag-drop-files";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
const CreateProject = () => {
  const navigate = useNavigate();
  const inputRef = React.useRef(null);

  const [date, setDate] = React.useState(null); //Datepicker
  const [projectValue, setprojectValue] = React.useState(false);
  const [err, setError] = React.useState();
  const [disable, setDisable] = React.useState(true);
  const {data } = React.useContext(TranslateContext); //Get Translate Data
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [tempform, setTempform] = React.useState({
    project_name: '',
    project_err: false,
    project_date: '',
    templates: [{
      temp_value: '',
      start_time: '',
      start_time_err: false,
      start_time_e: '',
      end_time: '',
      end_time_err: false,
      end_time_e: '',
      item_speed: '',
      item_speed_err: false,
      logo_image: '',
      call_to_action_image: '',
      data_items: [{
        item_name: '',
        item_name_err: false,
        lamp: '',
        lamp_err: false,
        pictures: [],
        picture_err: false,
        videos: '',
        video_err: false
      }]

    }]
  });

  const checkValidations = (data) => {
    // console.log('check-validation', data)

    let is_false = false;

    if (data.project_name == '') {
      data.project_err = true
      setTempform({ ...tempform })
      is_false = true
    } else {
      data.project_err = false
      setTempform({ ...tempform })

    }


    for (let i = 0; i <= data.templates.length - 1; i++) {

      if (data.templates[i].start_time == '') {
        data.templates[i].start_time_err = true
        setTempform({ ...tempform })
        is_false = true
      } else {
        data.templates[i].start_time_err = false
        setTempform({ ...tempform })
      }
      if (data.templates[i].end_time == '') {
        data.templates[i].end_time_err = true
        setTempform({ ...tempform })
        is_false = true
      } else {
        data.templates[i].end_time_err = false
        setTempform({ ...tempform })
      }

      if (data.templates[i].temp_value != 4) {

        if (data.templates[i].item_speed == '') {
          data.templates[i].item_speed_err = true
          setTempform({ ...tempform })
          is_false = true

        } else {
          data.templates[i].item_speed_err = false
          setTempform({ ...tempform })
        }
      }
      for (let j = 0; j <= data.templates[i].data_items.length - 1; j++) {
            // console.log('dataiiiiiiii',i, data.templates[i].temp_value)
            //Temp Value 1
            if (data.templates[i].temp_value == 1) {
              if (data.templates[i].data_items[j].item_name == '') {
                data.templates[i].data_items[j].item_name_err = true
                setTempform({ ...tempform })
                is_false = true
              } else {
                data.templates[i].data_items[j].item_name_err = false
                setTempform({ ...tempform })
              }
              if (data.templates[i].data_items[j].lamp == '') {
                data.templates[i].data_items[j].lamp_err = true
                setTempform({ ...tempform })
                is_false = true
              } else {
                data.templates[i].data_items[j].lamp_err = false
                setTempform({ ...tempform })
              }
    
              if (data.templates[i].data_items[j].pictures.length != 2) {
                data.templates[i].data_items[j].picture_err = true
                setTempform({ ...tempform })
                is_false = true
              } else {
                data.templates[i].data_items[j].picture_err = false
                setTempform({ ...tempform })
              }
            }
            //Temp Value 2
            if (data.templates[i].temp_value == 2) {
              if (data.templates[i].data_items[j].item_name == '') {
                data.templates[i].data_items[j].item_name_err = true
                setTempform({ ...tempform })
                is_false = true
              } else {
                data.templates[i].data_items[j].item_name_err = false
                setTempform({ ...tempform })
              }
              if (data.templates[i].data_items[j].pictures.length != 2) {
                data.templates[i].data_items[j].picture_err = true
                setTempform({ ...tempform })
                is_false = true
              } else {
                data.templates[i].data_items[j].picture_err = false
                setTempform({ ...tempform })
              }
            }
            //Temp Value 3
            if (data.templates[i].temp_value == 3) {
              if (data.templates[i].data_items[j].item_name == '') {
                data.templates[i].data_items[j].item_name_err = true
                setTempform({ ...tempform })
                is_false = true
              } else {
                data.templates[i].data_items[j].item_name_err = false
                setTempform({ ...tempform })
              }
              if (data.templates[i].data_items[j].lamp == '') {
                data.templates[i].data_items[j].lamp_err = true
                setTempform({ ...tempform })
                is_false = true
              } else {
                data.templates[i].data_items[j].lamp_err = false
                setTempform({ ...tempform })
              }

            }
            //Temp Value == 4
            if (data.templates[i].temp_value == 4) {
              // console.log('passsssssssssssssssss')
              if (data.templates[i].data_items[j].videos == '') {
                // alert('Please Minimum 2 Images Upload')
                data.templates[i].data_items[j].video_err = true
                setTempform({ ...tempform })
                is_false = true
              } else {
                data.templates[i].data_items[j].video_err = false
                setTempform({ ...tempform })
              }
            }
      }

    }

    return is_false


  }

  //Time Converter
  function timeConverter(str) {
    var date = new Date(str)
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds}`
  }

  React.useEffect(() => {
    if (!authChecker('authCheck')) navigate('/', { replace: true });

  }, [])

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
    // console.log('Project Name')
    tempform.project_name = e.target.value
    setTempform({ ...tempform })
  }
  // const handleDate = (e) => {
  //   setDate(e)
  //   console.log('Project Date')
  //   let new_date = new Date(e.$d).toISOString()
  //   tempform.project_date = new_date.split("T")[0]
  //   setTempform({ ...tempform })
  // }

  //Add Item nad Item Number Function
  const addItemInputs = (itemindex, index) => {
    // console.log('addItemInputs', itemindex, index)

    if (tempform.templates[index].data_items.length > 3) {
      NotificationManager.error(data.no_more_items)

    } else {
      let newfield = {
        item_name: '',
        item_name_err: false,
        lamp: '',
        lamp_err: false,
        pictures: [],
        picture_err: false,
        videos: '',
        video_err: false

      }
      // console.log('check add item', tempform)
      tempform.templates[index].data_items.push(newfield)
      setTempform({ ...tempform })
    }
  }
  //Remove Item nad Item Number Function using filter
  const removeItemInputs = (itemindex, index) => {
    // console.log('removeItemInputs', itemindex, index)
    // console.log('fdfd', tempform.templates[index].data_items)

    let myArray = tempform.templates[index].data_items.filter(function (item, itemndex) {
      return itemndex != itemindex;
    });
    // console.log('new array ', myArray)

    tempform.templates[index].data_items = myArray
    setTempform({ ...tempform })

  }

  //Item up Arrow
  const handleUpItems = (itemindex, index) => {
    // console.log('handleUpItems', itemindex, index)
    if (itemindex == 0) {
      // console.log('up item false')
      NotificationManager.error(data.lamp_no_more_items)
    } else {
      // console.log('upiteminsert')
      let from = tempform.templates[index].data_items[itemindex];
      let to = tempform.templates[index].data_items[itemindex - 1];
      tempform.templates[index].data_items[itemindex] = to;
      tempform.templates[index].data_items[itemindex - 1] = from
      setTempform({ ...tempform })

    }

  }

  //Item Down Arrow
  const handleDownItems = (itemindex, index) => {
    // console.log('handleDownItems', itemindex, index)
    if (tempform.templates[index].data_items[itemindex + 1]) { //check index is avaliable or not

      if (itemindex == 3) {
        NotificationManager.error(data.lamp_no_more_items)
      } else {
        // console.log('downitem shuffle')
        let from = tempform.templates[index].data_items[itemindex];
        let to = tempform.templates[index].data_items[itemindex + 1];
        tempform.templates[index].data_items[itemindex] = to;
        tempform.templates[index].data_items[itemindex + 1] = from
        setTempform({ ...tempform })

      }

    } else {
      NotificationManager.error(data.lamp_no_more_items)
    }

  }

  const addUploadItems = (itemindex, index) => {
    // console.log('addUploadItems', itemindex, index)

    let myArray = tempform.templates[index].data_items[itemindex].pictures.length

    // console.log(myArray, 'pictures-length')

    if (myArray > 3) {
      NotificationManager.error(data.no_more_images);
      // NotificationManager.error('Sorrry, Only you can upload 4 images of Item');

    } else {
      tempform.templates[index].data_items[itemindex].pictures.push('')
      setTempform({ ...tempform })

    }

  }

  //Handle Upload Logo
  const handleUploadLogo = async (e, index) => {
    // console.log('handleUploadLogo', e, index)
    // console.log(e, 'files++++++++++++');

    // console.log(e.target.files[0], 'click upload', index); //normal input check
    let formData = new FormData();
    formData.append("file", e);
    // formData.append("file", e.target.files[0]); //normal input use

    await imageUpload(formData, { token: localStorage.getItem('token') }).then((res) => {
      // setplanImg(res.data.filename)
      // console.log(res, 'res+++++++++')
      if (res.code === 200) {
        tempform.templates[index].logo_image = res.data
        setTempform({ ...tempform })
      } else {
        NotificationManager.error(data.project_err_msg);

      }
    })
    // itemInput[index].logo_image = e.target.files[0].name

    // setUploadLogo(URL.createObjectURL(e.target.files[0]));
  }

  //Handle Action Image
  const handleActionImage = async (e, index) => {
    // console.log('handleActionImage', e, index)
    // console.log(e, 'files++++++++++++');

    // console.log(e.target.files[0], 'click upload', index); //normal input check
    let formData = new FormData();
    formData.append("file", e);
    // formData.append("file", e.target.files[0]); //normal input use

    await imageUpload(formData, { token: localStorage.getItem('token') }).then((res) => {
      // setplanImg(res.data.filename)
      // console.log(res, 'res+++++++++')
      if (res.code === 200) {
        tempform.templates[index].call_to_action_image = res.data
        setTempform({ ...tempform })
      } else {
        NotificationManager.error(data.project_err_msg);

      }
    })
  }

  const handleUploadVideo = async (e, index) => {
    // console.log('handleUploadVideo', e)
    if (e.type != 'video/mp4') {
      return NotificationManager.error(data.video_type_err);

    }
    // tempform.templates[index].data_items.pictures[] = e.target.files[0].name
    let formData = new FormData();
    // formData.append("file", e.target.files[0]); //with input
    formData.append("file", e);

    await imageUpload(formData, { token: localStorage.getItem('token') }).then((res) => {
      // setplanImg(res.data.filename)
      // console.log(res, 'res+++++++++ Video')
      if (res.code === 200) {
        tempform.templates[index].data_items[0].videos = res.data
        setTempform({ ...tempform })
      } else {
        NotificationManager.error(data.project_err_msg);

      }
    })

    setTempform({ ...tempform })

  }

  const handleUploadClick = async (e, picindex, itemindex, index) => {
    // setPicval(picindex) //its use for update upload item length

    // console.log(e, 'click upload', picindex, itemindex, index);
    let formData = new FormData();
    // formData.append("file", e.target.files[0]);
    formData.append("file", e);

    await imageUpload(formData, { token: localStorage.getItem('token') }).then((res) => {
      // setplanImg(res.data.filename)
      // console.log(res, 'res+++++++++')
      if (res.code === 200) {
        tempform.templates[index].data_items[itemindex].pictures[picindex] = res.data
        setTempform({ ...tempform })
      } else {
        NotificationManager.error(data.project_err_msg);

      }
    })

  }

  //Save Photo
  const savePhoto = (e) => {
    // console.log('savePhoto')
    NotificationManager.success(data.add_photo_msg)


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
    // console.log('deleteVideo', index, inputRef)
    inputRef.current.value = null;

    tempform.templates[index].data_items[index].videos = ''
    setTempform({ ...tempform })

  }

  //Save Template
  const saveTemplate1 = (index) => {
    let validate = checkValidations(tempform)
    // console.log('validation_check', validate)
    if (validate != true) {
      NotificationManager.success(data.temp_add_msg)
    } else {
      NotificationManager.error(data.submit_err_required)
    }

    // console.log('saveTemplate Click Button', index)
    // let data = tempform.templates[index].data_items

    // var hasDuplicate = false;
    // data.map(v => v.lamp).sort().sort((a, b) => {
    //   if (a === b) hasDuplicate = true
    // })

    // if (hasDuplicate == true) {
    //   NotificationManager.error(data.unique_lamp_title)

    // } else {
    //   NotificationManager.success(data.temp_add_msg)

    // }

    // console.log('hasDuplicate', hasDuplicate)


    // console.log('dataFinal', tempform)
    // setTempform({...})
    // saveTemplate(itemInput[index], index)

  }


  //Template Save 2
  const saveTemplate2 = (index) => {
    // console.log('saveTemplate2', index)
    let validate = checkValidations(tempform)
    // console.log('validation_check', validate)
    if (validate != true) {
      NotificationManager.success(data.temp_add_msg)
    } else {
      NotificationManager.error(data.submit_err_required)
    }
  }
  const saveTemplate3 = (index) => {
    let validate = checkValidations(tempform)
    // console.log('validation_check', validate)
    if (validate != true) {
      NotificationManager.success(data.temp_add_msg)
    } else {
      NotificationManager.error(data.submit_err_required)
    }
  }
  const saveTemplate4 = (index) => {
    let validate = checkValidations(tempform)
    // console.log('validation_check', validate)
    if (validate != true) {
      NotificationManager.success(data.temp_add_msg)
    } else {
      NotificationManager.error(data.submit_err_required)
    }
  }

  //Try

  const onStartTime = (e, index) => {
    // console.log('startTime', e)
    // console.log('index val', index)

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
    // console.log('e.target.value', e.target.value)
    let data = tempform.templates[index].data_items
    var isDuplicate = false;

    // console.log('remove call', val)
    let myArray = data.filter(function (obj, index) {
      if (obj.lamp == e.target.value) isDuplicate = true
    });

    if (isDuplicate == true) {
      NotificationManager.error(data.unique_lamp_title)
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
    let validate = checkValidations(tempform)
    // console.log('validation_check', validate)
    if (validate == true) {
      NotificationManager.error(data.submit_err_required)

    } else {
      let newfield = {
        temp_value: '',
        start_time: '',
        start_time_err: false,
        start_time_e: '',
        end_time: '',
        end_time_err: false,
        end_time_e: '',
        item_speed: '',
        item_speed_err: false,
        logo_image: '',
        call_to_action_image: '',
        data_items: [{
          item_name: '',
          item_name_err: false,
          lamp: '',
          lamp_err: false,
          pictures: [],
          picture_err: false,
          videos: '',
          video_err: false
        }]
      }
      tempform.templates.push(newfield)
      setTempform({ ...tempform })
    }
  }

  const addForm = (index, e) => {
    if (e.target.value >= 1) {
      setAddButton(true) //add template button value true then show

    } else {
      setAddButton(false) //add template button value false then disable

    }

    tempform.templates[index].temp_value = e.target.value;

    // console.log(tempform, 'tempform',)

    setTempform({ ...tempform })
  }


  //Remove Template

  const RemoveTemplate = (val) => {
    // console.log('remove call', val)
    // console.log('remove call', val, tempform.templates.length)
    
    // return false;
    if(tempform.templates.length == 1){
      tempform.templates[0].temp_value = ''
      setTempform({ ...tempform })
      setAddButton(false)
    }else{
    let myArray = tempform.templates.filter(function (obj, index) {
      return index != val;
    });
    tempform.templates = myArray
    setTempform({ ...tempform })
  }
  }
  React.useEffect(() => {

  }, [val, tempform])


  //Final Submit Project
  const submitProject = (e) => {
    e.preventDefault();
    let validate = checkValidations(tempform)
    // console.log('validation_check', validate)
    if (validate != true) {
      setprojectValue(true)
      checkTemplate(tempform).then((res) => {
        // console.log('ress', res)
        if (res.code === 200) {
          NotificationManager.success(data.submit_success_msg)
          setDisable(false)
        } else if (res.code === 201) {
          NotificationManager.error(data.submit_err_msg)
          setDisable(true)
        }
      }).catch((err) => {
        // console.log('catch-err', err)
        // NotificationManager.error(translateFunc(err))
      })
      // console.log(tempform, 'tempform Project')
    } else {
      NotificationManager.error(data.submit_err_required)
    }



  }
  //Generate Button
  const generateButton = (e) => {
    e.preventDefault();

    //Validation Check
    var validateErr = validate({
      project_name: tempform.project_name,
      // project_date: tempform.project_date,
    });

    setError(validateErr);
    // console.log('check err', err)
    if (Object.keys(validateErr).length == 0) {

      addProject(tempform).then((res) => {
        // console.log('ress', res)
        if (res.code === 200) {
          NotificationManager.success(data.project_success_msg)
          navigate('/project')
        } else {
          NotificationManager.error(data.project_err_msg)
        }
      }).catch((err) => {
        // console.log('catch-err', err)

        // NotificationManager.error(translateFunc(err))
      })
    }
    // console.log(tempform, 'tempform Project')

  }
  // console.log(tempform, 'tempform Project')


  return (
    <Grid className='mainlogin' style={{padding:0}}>

    <Box
    
        noValidate
        autoComplete="off"
    >
    
        <Grid style={{ display: 'flex', height: '100vh' }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid container spacing={2} item xs={9} style={{ borderRight: '1px solid #dcdcdc82', display:'block',background: '#fff',}}>
            <Box>
      <Container >
        <Grid style={{ textAlign: 'center' }} py={3}>
          <h2 className='create_project'>{data.project_title_header}</h2>
        </Grid>
        <Grid container spacing={2} >
          <Grid style={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} item xs={12}>

          <Grid>
            
          </Grid>
            <Grid style={{ margin: '0 10px' }} item xs={12} sm={6} md={6} >
              <TextField
                error={tempform?.project_err ? 'error' : ''}
                fullWidth
                helperText={tempform?.project_err ? data.project_required : data.enter_project}
                id="demo-helper-text-misaligned"
                label={data.project_title}
                margin="normal"
                name='project_name'
                onChange={handleProject}
              />

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>

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
              </LocalizationProvider> */}
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
                      <option> {data.option_heading}</option>
                      <option value={1} selected={item.temp_value == 1 ? 'selected' : ''}>{data.template_name_1}</option>
                      <option value={2} selected={item.temp_value == 2 ? 'selected' : ''}>{data.template_name_2}</option>
                      <option value={3} selected={item.temp_value == 3 ? 'selected' : ''}>{data.template_name_3}</option>
                      <option value={4} selected={item.temp_value == 4 ? 'selected' : ''}>{data.template_name_4}</option>

                    </Select>
                    {item.temp_value == 1 ?
                      <>
                        <Accordion style={{ margin: '25px 0' }}>

                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{background: '#ff0000a6', color:'#fff'}}
                          >
                            <Typography style={{ fontSize: 12, fontWeight: 700 }}>{data.template_name_1}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>

                            <Grid style={{ textAlign: 'center'}}>
                              <h2 className='create_project'>{data.template_name_1}</h2>

                              <Grid style={{ justifyContent: 'space-between', display: 'flex' }} item xs={12} sm={12} md={12}>
                                <Grid >
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                      label={data.start_time_title}
                                      value={item?.start_time_e ? item?.start_time_e : null}
                                      onChange={(e) => { onStartTime(e, index) }}
                                      renderInput={(params, index) =>
                                        <TextField {...params}
                                          error={item.start_time_err ? 'error' : null}
                                          helperText={item?.start_time_err ? data.start_time_required : null}
                                        />}
                                    />
                                  </LocalizationProvider>
                                </Grid>

                                <Grid>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                      label={data.end_time_title}
                                      value={item?.end_time_e ? item.end_time_e : null}
                                      onChange={(e) => { onEndTime(e, index) }}
                                      renderInput={(params) => <TextField {...params}
                                        error={item.end_time_err ? 'error' : null}
                                        helperText={item?.end_time_err ? data.end_time_required : null}
                                      />}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                              </Grid>


                              <Grid className={item?.item_speed_err ? 'item_speed_default_err' : 'item_speed_default'}>
                                <Grid style={{ paddingTop: 8, paddingRight: '15px' }}>
                                  <strong>{data.item_speed_title}</strong>
                                </Grid>
                                <Grid>
                                  <FormControl style={{ fontSize: '15px !important' }}>
                                    <RadioGroup
                                      error={true}
                                      row
                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                      name="row-radio-buttons-group"
                                    >
                                      <FormControlLabel error value="FAST" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={data.item_speed_fast} style={{ fontSize: '15px !important' }} />
                                      <FormControlLabel value="NORMAL" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={data.item_speed_normal} style={{ fontSize: '15px !important' }} />
                                      <FormControlLabel value="SLOW" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={data.item_speed_slow} style={{ fontSize: '15px !important' }} />
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>
                              </Grid>
                              <span style={{ color: item?.item_speed_err ? 'item_speed_err' : null }} className={item?.item_speed_err ? 'item_speed_err' : null}>{item?.item_speed_err ? data.item_speed_required : null}</span>

                              <Grid style={{ display: 'flex', alignItems: 'center', border: '1px solid #c4c4c4', padding: '15px', marginTop: 25, alignItems: 'center', paddingTop: 10 }} >
                                <Grid md={4} style={{ paddingTop: 8, textAlign: 'left', paddingBottom: 8 }}>
                                  <strong>{data.upload_logo_title}</strong>
                                </Grid>
                                <Grid md={4}>
                                  <IconButton color="primary" aria-label="upload picture" component="label">
                                    {/* <input
                                          hidden accept="image/*"
                                          type="file"
                                          onChange={(e) => { handleUploadLogo(e, index) }}

                                        /> */}

                                    {/* <PhotoCamera /> */}
                                    <FileUploader handleChange={(e) => { handleUploadLogo(e, index) }} name="file" types={fileTypes} />
                                  </IconButton>
                                </Grid>
                                <Grid xs={4}>
                                  {tempform.templates[index].logo_image != '' ?

                                    <img
                                      src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].logo_image}`}

                                      width={100}
                                      height={100}
                                      style={{marginLeft:140}} />
                                    : null
                                  }
                                </Grid>
                              </Grid>
                              <Grid style={{ display: 'flex', alignItems: 'center', border: '1px solid #c4c4c4', padding: '15px', marginTop: 25, alignItems: 'center', paddingTop: 10 }} >
                                <Grid style={{ paddingTop: 8, textAlign: 'left', paddingBottom: 8 }} md={4}>
                                  <strong>{data.upload_action_image_title}</strong>
                                </Grid>
                                <Grid md={4}>
                                  <FileUploader handleChange={(e) => { handleActionImage(e, index) }} name="file" types={fileTypes} />
                                </Grid>
                                <Grid xs={4}>
                                  {tempform.templates[index].call_to_action_image != '' ?

                                    <img
                                      src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].call_to_action_image}`}

                                      width={100}
                                      height={100}
                                      style={{marginLeft: 140}}
                                    />
                                    : null
                                  }
                                </Grid>
                              </Grid>
                              {item?.data_items.map((itemsdata, itemindex) => {

                                return (
                                  <>
                                    <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                      <Grid>
                                        <TextField
                                          error={itemsdata?.item_name_err ? 'error' : ''}
                                          fullWidth
                                          helperText={itemsdata?.item_name_err ? data.item_name_required : data.enter_item_name}
                                          id="demo-helper-text-misaligned"
                                          label={data.item_name_title}
                                          margin="normal"
                                          name='item_name'
                                          value={itemsdata?.item_name ? itemsdata?.item_name : ''}
                                          onChange={(e) => { handleItemName(e, itemindex, index) }}
                                        // onChange={onChange}
                                        />
                                      </Grid>
                                      <Grid>
                                        <TextField
                                          type='number'
                                          error={itemsdata?.lamp_err ? 'error' : ''}
                                          fullWidth
                                          helperText={itemsdata?.lamp_err ? data.lamp_number_required : data.enter_lamp_number}
                                          id="demo-helper-text-misaligned"
                                          label={data.lamp_number_title}
                                          margin="normal"
                                          name='lamp_num'
                                          value={itemsdata?.lamp ? itemsdata?.lamp : ''}
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
                                    <Grid className={itemsdata.picture_err ? 'upload_images_default_err' : 'upload_images_default'} mt={5} item xs={12} sm={12} md={12}>
                                      <Grid md={3} style={{ paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                                        <strong>{data.upload_images_title}</strong>
                                        <AddCircleIcon onClick={() => { addUploadItems(itemindex, index) }} style={{ color: 'green', cursor: 'pointer' }} />
                                      </Grid>

                                      <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-evenly', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                        <Grid style={{ paddingTop: 8, display: 'grid', justifyContent: 'space-between' }}>
                                          {itemsdata.pictures.map((pictures, picindex) => {

                                            return (
                                              <>
                                                <IconButton color="primary" aria-label="upload picture" component="label">

                                                  {/* <input
                                                      hidden
                                                      accept="image/*"
                                                      type="file"
                                                      onChange={(e) => { handleUploadClick(e, picindex, itemindex, index) }}
                                                    /> */}
                                                  <FileUploader handleChange={(e) => { handleUploadClick(e, picindex, itemindex, index) }} name="file" types={fileTypes} />


                                                  {tempform.templates[index].data_items[itemindex].pictures[picindex] != '' ?
                                                    <img
                                                      src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].data_items[itemindex].pictures[picindex]}`}
                                                      width={100}
                                                      height={100}
                                                      style={{ marginLeft: 50 }}
                                                    />
                                                    :
                                                    null}
                                                </IconButton>
                                              </>
                                            )
                                          })}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <span style={{ color: itemsdata.picture_err ? 'upload_images_err' : null }} className={itemsdata.picture_err ? 'upload_images_err' : null}>{itemsdata?.picture_err ? data.upload_images_required : null}</span>
                                  </>
                                )
                              })}

                              <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'right', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                <Grid style={{ paddingTop: 8 }}>

                                </Grid>
                                <Grid>
                                  <Button onClick={savePhoto} className='save_photo'>{data.save_photo_title}</Button>
                                </Grid>
                                <Grid>
                                  <Button onClick={() => { deletePhoto(index) }} className='delete_photo'>{data.delete_photo_title}</Button>
                                </Grid>
                                <Grid >
                                  <Button onClick={() => { saveTemplate1(index) }} className='save_temp1' >{data.save_template_title}</Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </AccordionDetails>

                        </Accordion >
                        <RemoveCircleOutlinedIcon clssName='1stTemp' onClick={() => { RemoveTemplate(index) }} style={{ color: 'red', cursor: 'pointer', float: 'left', margin: ' 0 0 0 710px', top: '92px', right: '-48px', position: 'absolute' }} />


                      </>
                      : item.temp_value == 2 ?
                        <>

                          <Accordion style={{ margin: '25px 0' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              style={{background: '#ff0000a6', color:'#fff'}}
                            >
                              <Typography style={{ fontSize: 12, fontWeight: 700 }}>{data.template_name_2}</Typography>
                              <RemoveCircleOutlinedIcon onClick={() => { RemoveTemplate(index) }} style={{ color: 'red', float: 'left', margin: ' 0 0 0 710px', top: '11px', right: '-48px', position: 'absolute' }} />

                            </AccordionSummary>
                            <AccordionDetails>

                              <Grid style={{ textAlign: 'center' }}>
                                <h2 className='create_project'> {data.template_name_2}</h2>

                                <Grid style={{ justifyContent: 'space-between', display: 'flex' }} item xs={12} sm={12} md={12}>
                                  <Grid >
                                    {/* <timepicker onchange={onchange} value='{value}' />   */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                      <TimePicker
                                        label={data.start_time_title}
                                        value={item?.start_time_e ? item?.start_time_e : null}
                                        onChange={(e) => { onStartTime(e, index) }}
                                        renderInput={(params, index) => <TextField
                                          {...params} id={index}
                                          error={item.start_time_err ? 'error' : null}
                                          helperText={item?.start_time_err ? data.start_time_required : null}

                                        />}
                                      />
                                    </LocalizationProvider>
                                  </Grid>
                                  <Grid>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <TimePicker
                                        label={data.end_time_title}
                                        value={item?.end_time_e ? item?.end_time_e : null}
                                        onChange={(e) => { onEndTime(e, index) }}
                                        renderInput={(params) => <TextField
                                          {...params}
                                          error={item.end_time_err ? 'error' : null}
                                          helperText={item?.end_time_err ? data.end_time_required : null}
                                        />}
                                      />
                                    </LocalizationProvider>
                                  </Grid>
                                </Grid>
                                <Grid className={item?.item_speed_err ? 'item_speed_default_err' : 'item_speed_default'}>
                                  <Grid style={{ paddingTop: 8, paddingRight: '15px' }}>
                                    <strong>{data.item_speed_title}</strong>
                                  </Grid>
                                  <Grid>
                                    <FormControl style={{ fontSize: '15px !important' }}>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                      >
                                        <FormControlLabel value="FAST" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={data.item_speed_fast} style={{ fontSize: '15px !important' }} />
                                        <FormControlLabel value="NORMAL" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={data.item_speed_normal} style={{ fontSize: '15px !important' }} />
                                        <FormControlLabel value="SLOW" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={data.item_speed_slow} style={{ fontSize: '15px !important' }} />
                                      </RadioGroup>
                                    </FormControl>
                                  </Grid>
                                </Grid>
                                <span style={{ color: item?.item_speed_err ? 'item_speed_err' : null }} className={item?.item_speed_err ? 'item_speed_err' : null}>{item?.item_speed_err ? data.item_speed_required : null}</span>


                                <Grid style={{ display: 'flex', alignItems: 'center', border: '1px solid #c4c4c4', padding: '15px', marginTop: 25, alignItems: 'center', paddingTop: 10 }} >
                                  <Grid md={4} style={{ paddingTop: 8, textAlign: 'left', paddingBottom: 8 }}>
                                    <strong>{data.upload_logo_title}</strong>
                                  </Grid>
                                  <Grid md={4}>
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                      {/* <input
                                          hidden accept="image/*"
                                          type="file"
                                          onChange={(e) => { handleUploadLogo(e, index) }}

                                        /> */}

                                      {/* <PhotoCamera /> */}
                                      <FileUploader handleChange={(e) => { handleUploadLogo(e, index) }} name="file" types={fileTypes} />
                                    </IconButton>
                                  </Grid>
                                  <Grid xs={4}>
                                    {tempform.templates[index].logo_image != '' ?

                                      <img
                                        src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].logo_image}`}

                                        width={100}
                                        height={100}
                                        style={{marginLeft:100}} />
                                      : null
                                    }
                                  </Grid>
                                </Grid>
                                <Grid style={{ display: 'flex', alignItems: 'center', border: '1px solid #c4c4c4', padding: '15px', marginTop: 25, alignItems: 'center', paddingTop: 10 }} >
                                  <Grid style={{ paddingTop: 8, textAlign: 'left', paddingBottom: 8 }} md={4}>
                                    <strong>{data.upload_action_image_title}</strong>
                                  </Grid>
                                  <Grid md={4}>
                                    <FileUploader handleChange={(e) => { handleActionImage(e, index) }} name="file" types={fileTypes} />
                                  </Grid>
                                  <Grid xs={4}>
                                    {tempform.templates[index].call_to_action_image != '' ?

                                      <img
                                        src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].call_to_action_image}`}

                                        width={100}
                                        height={100}
                                        style={{marginLeft:100}}
                                      />
                                      : null
                                    }
                                  </Grid>
                                </Grid>

                                {item.data_items.map((itemsdata, itemindex) => {

                                  return (
                                    <>
                                      <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                        <Grid >
                                          <TextField
                                            error={itemsdata?.item_name_err ? 'error' : ''}
                                            fullWidth
                                            helperText={itemsdata?.item_name_err ? data.item_name_required : data.enter_item_name}
                                            id="demo-helper-text-misaligned"
                                            label={data.item_name_title}
                                            margin="normal"
                                            name='item_name'
                                            value={itemsdata?.item_name ? itemsdata?.item_name : ''}
                                            onChange={(e) => { handleItemName(e, itemindex, index) }}
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
                                      <Grid className={itemsdata.picture_err ? 'upload_images_default_err' : 'upload_images_default'} mt={5} item xs={12} sm={12} md={12}>
                                        <Grid md={3} style={{ paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                                          <strong>{data.upload_images_title}</strong>
                                          <AddCircleIcon onClick={() => { addUploadItems(itemindex, index) }} style={{ color: 'green', cursor: 'pointer' }} />
                                        </Grid>

                                        <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-evenly', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                          <Grid style={{ paddingTop: 8, display: 'grid', justifyContent: 'space-between' }}>
                                            {itemsdata.pictures.map((pictures, picindex) => {

                                              return (
                                                <>
                                                  <IconButton color="primary" aria-label="upload picture" component="label">
                                                    {/* <input
                                                        hidden
                                                        accept="image/*"
                                                        type="file"
                                                        onChange={(e) => { handleUploadClick(e, picindex, itemindex, index) }}
                                                      />
                                                      <PhotoCamera /> */}
                                                    <FileUploader handleChange={(e) => { handleUploadClick(e, picindex, itemindex, index) }} name="file" types={fileTypes} />

                                                    {tempform.templates[index].data_items[itemindex].pictures[picindex] != '' ?

                                                      <img
                                                        src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].data_items[itemindex].pictures[picindex]}`}
                                                        width={100}
                                                        height={100}
                                                        style={{ marginLeft: 50 }}
                                                      />
                                                      : null}
                                                    {/* <img src={file} width={100} height={100} /> */}

                                                  </IconButton>
                                                </>
                                              )
                                            })}

                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <span style={{ color: itemsdata.picture_err ? 'upload_images_err' : null }} className={itemsdata.picture_err ? 'upload_images_err' : null}>{itemsdata?.picture_err ? data.upload_images_required : null}</span>

                                    </>
                                  )
                                })}

                                <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'right', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                  <Grid style={{ paddingTop: 8 }}>
                                  </Grid>
                                  <Grid>
                                    <Button onClick={savePhoto} className='save_photo'>{data.save_photo_title}</Button>
                                  </Grid>
                                  <Grid>
                                    <Button onClick={() => { deletePhoto(index) }} className='delete_photo'>{data.delete_photo_title}</Button>
                                  </Grid>
                                  <Grid >
                                    <Button onClick={() => { saveTemplate2(index) }} className='save_temp1' >{data.save_template_title}</Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </AccordionDetails>

                          </Accordion >

                        </> : item.temp_value == 3 ?
                          <>
                            <Accordion style={{ margin: '25px 0' }}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{background: '#ff0000a6', color:'#fff'}}
                              >
                                <Typography style={{ fontSize: 12, fontWeight: 700 }}>{data.template_name_3}</Typography>
                                <RemoveCircleOutlinedIcon onClick={() => { RemoveTemplate(index) }} style={{ color: 'red', float: 'left', margin: ' 0 0 0 710px', top: '11px', right: '-48px', position: 'absolute' }} />
                              </AccordionSummary>
                              <AccordionDetails>

                                <Grid style={{ textAlign: 'center' }}>
                                  <h2 className='create_project'>{data.template_name_3}</h2>

                                  <Grid style={{ justifyContent: 'space-between', display: 'flex' }} item xs={12} sm={12} md={12}>
                                    <Grid >
                                      {/* <timepicker onchange={onchange} value='{value}' />   */}
                                      <LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <TimePicker
                                          label={data.start_time_title}
                                          value={item.start_time_e ? item?.start_time_e : null}
                                          onChange={(e) => { onStartTime(e, index) }}
                                          renderInput={(params, index) => <TextField
                                            {...params} id={index}
                                            error={item.start_time_err ? 'error' : null}
                                            helperText={item?.start_time_err ? data.start_time_required : null}
                                          />}
                                        />
                                      </LocalizationProvider>
                                    </Grid>
                                    <Grid>
                                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                          label={data.end_time_title}
                                          value={item?.end_time_e ? item?.end_time_e : null}
                                          onChange={(e) => { onEndTime(e, index) }}
                                          renderInput={(params) => <TextField
                                            {...params}
                                            error={item.end_time_err ? 'error' : null}
                                            helperText={item?.end_time_err ? data.end_time_required : null}
                                          />}
                                        />
                                      </LocalizationProvider>
                                    </Grid>
                                  </Grid>
                                  <Grid className={item?.item_speed_err ? 'item_speed_default_err' : 'item_speed_default'}>
                                    <Grid style={{ paddingTop: 8, paddingRight: '15px' }}>
                                      <strong>{data.item_speed_title}</strong>
                                    </Grid>
                                    <Grid>
                                      <FormControl style={{ fontSize: '15px !important' }}>
                                        <RadioGroup
                                          row
                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                          name="row-radio-buttons-group"
                                        >
                                          <FormControlLabel value="FAST" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={data.item_speed_fast} style={{ fontSize: '15px !important' }} />
                                          <FormControlLabel value="NORMAL" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={data.item_speed_normal} style={{ fontSize: '15px !important' }} />
                                          <FormControlLabel value="SLOW" name='item_speed' onChange={(e) => { handleItemSpeed(e, index) }} control={<Radio />} label={data.item_speed_slow} style={{ fontSize: '15px !important' }} />
                                        </RadioGroup>
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                  <span style={{ color: item?.item_speed_err ? 'item_speed_err' : null }} className={item?.item_speed_err ? 'item_speed_err' : null}>{item?.item_speed_err ? data.item_speed_required : null}</span>

                                  <Grid style={{ display: 'flex', alignItems: 'center', border: '1px solid #c4c4c4', padding: '15px', marginTop: 25, alignItems: 'center', paddingTop: 10 }} >
                                    <Grid md={4} style={{ paddingTop: 8, textAlign: 'left', paddingBottom: 8 }}>
                                      <strong>{data.upload_logo_title}</strong>
                                    </Grid>
                                    <Grid md={4}>
                                      <IconButton color="primary" aria-label="upload picture" component="label">
                                        {/* <input
                                          hidden accept="image/*"
                                          type="file"
                                          onChange={(e) => { handleUploadLogo(e, index) }}

                                        /> */}

                                        {/* <PhotoCamera /> */}
                                        <FileUploader handleChange={(e) => { handleUploadLogo(e, index) }} name="file" types={fileTypes} />
                                      </IconButton>
                                    </Grid>
                                    <Grid xs={4}>
                                      {tempform.templates[index].logo_image != '' ?

                                        <img
                                          src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].logo_image}`}

                                          width={100}
                                          height={100}
                                          style={{marginLeft:100}} />
                                        : null
                                      }
                                    </Grid>
                                  </Grid>
                                  <Grid style={{ display: 'flex', alignItems: 'center', border: '1px solid #c4c4c4', padding: '15px', marginTop: 25, alignItems: 'center', paddingTop: 10 }} >
                                    <Grid style={{ paddingTop: 8, textAlign: 'left', paddingBottom: 8 }} md={4}>
                                      <strong>{data.upload_action_image_title}</strong>
                                    </Grid>
                                    <Grid md={4}>
                                      <FileUploader handleChange={(e) => { handleActionImage(e, index) }} name="file" types={fileTypes} />
                                    </Grid>
                                    <Grid xs={4}>
                                      {tempform.templates[index].call_to_action_image != '' ?

                                        <img
                                          src={`${global.serverUrl}uploads/template_image/${tempform.templates[index].call_to_action_image}`}

                                          width={100}
                                          height={100}
                                          style={{marginLeft:100}}
                                        />
                                        : null
                                      }
                                    </Grid>
                                  </Grid>

                                  {item.data_items.map((itemsdata, itemindex) => {

                                    return (
                                      <>
                                        <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                          <Grid >
                                            <TextField
                                              error={itemsdata?.item_name_err ? 'error' : ''}
                                              fullWidth
                                              helperText={itemsdata?.item_name_err ? data.item_name_required : data.enter_item_name}
                                              id="demo-helper-text-misaligned"
                                              label={data.item_name_title}
                                              margin="normal"
                                              name='item_name'
                                              value={itemsdata?.item_name ? itemsdata?.item_name : ''}
                                              onChange={(e) => { handleItemName(e, itemindex, index) }}
                                            />
                                          </Grid>
                                          <Grid>
                                            <TextField
                                              type='number'
                                              error={itemsdata?.lamp_err ? 'error' : ''}
                                              fullWidth
                                              helperText={itemsdata?.lamp_err ? data.lamp_number_required : data.enter_lamp_number}
                                              id="demo-helper-text-misaligned"
                                              label={data.lamp_number_title}
                                              margin="normal"
                                              name='lamp_num'
                                              value={itemsdata?.lamp ? itemsdata?.lamp : ''}
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
                                      <Button onClick={() => { saveTemplate3(index) }} className='save_temp' >{data.save_template_title}</Button>
                                    </Grid>
                                  </Grid>
                                </Grid>

                              </AccordionDetails>

                            </Accordion >

                          </> : item.temp_value == 4 ?
                            <>
                              <Accordion style={{ margin: '25px 0' }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                  style={{background: '#ff0000a6', color:'#fff'}}
                                >
                                  <Typography style={{ fontSize: 12, fontWeight: 700 }}>{data.template_name_4}</Typography>
                                  <RemoveCircleOutlinedIcon onClick={() => { RemoveTemplate(index) }} style={{ color: 'red', float: 'left', margin: ' 0 0 0 710px', cursor: 'pointer', top: '11px', right: '-48px', position: 'absolute' }} />

                                </AccordionSummary>
                                <AccordionDetails>

                                  <Grid style={{ textAlign: 'center' }}>
                                    <h2 className='create_project'>{data.template_name_4}</h2>

                                    <Grid style={{ justifyContent: 'space-between', display: 'flex' }} item xs={12} sm={12} md={12}>
                                      <Grid >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                                          <TimePicker
                                            label={data.start_time_title}
                                            value={item?.start_time_e ? item?.start_time_e : null}
                                            onChange={(e) => { onStartTime(e, index) }}
                                            renderInput={(params, index) => <TextField
                                              {...params} id={index}
                                              error={item.start_time_err ? 'error' : null}
                                              helperText={item?.start_time_err ? data.start_time_required : null}
                                            />}
                                          />
                                        </LocalizationProvider>
                                      </Grid>
                                      <Grid>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <TimePicker
                                            label={data.end_time_title}
                                            value={item?.end_time_e ? item?.end_time_e : null}
                                            onChange={(e) => { onEndTime(e, index) }}
                                            renderInput={(params) => <TextField
                                              {...params}
                                              error={item.end_time_err ? 'error' : null}
                                              helperText={item?.end_time_err ? data.end_time_required : null}
                                            />}
                                          />
                                        </LocalizationProvider>
                                      </Grid>
                                    </Grid>
                                    <Grid className={tempform.templates[index]?.data_items[0].video_err ? 'upload_videos_default_err' : 'upload_videos_default'}>
                                      <Grid style={{ paddingTop: 50, textAlign: 'center' }} md={2}>
                                        <strong>{data.upload_video_title}</strong>
                                      </Grid>
                                      <Grid style={{ paddingTop: 25 }} md={4}>
                                        <FileUploader handleChange={(e) => { handleUploadVideo(e, index) }} name="file" />
                                      </Grid>
                                      <Grid md={4}>
                                        {tempform.templates[index]?.data_items[0]?.videos != '' ?
                                          <video width="200" controls style={{paddingTop:"10px",marginLeft:"30px"}}>
                                            <source
                                              src={`${global.serverUrl}uploads/template_image/${tempform.templates[index]?.data_items[0]?.videos}`}
                                            />
                                          </video>
                                          : null}
                                      </Grid>
                                    </Grid>
                                    <span style={{ color: tempform.templates[index]?.data_items[0].video_err ? 'upload_videos_span_err' : null }} className={tempform.templates[index]?.data_items[0].video_err ? 'upload_videos_span_err' : null}>{tempform.templates[index]?.data_items[0].video_err ? data.required_video : null}</span>

                                    <Grid style={{ margin: '0 10px', display: 'flex', justifyContent: 'right', marginTop: 8, padding: '10px 0' }} mt={5} item xs={12} sm={12} md={12}>
                                      <Grid style={{ paddingTop: 8 }}>

                                      </Grid>
                                      {/* <Grid>
                                          <Button onClick={savePhoto} className='save_photo'>Save Photo</Button>
                                        </Grid> */}
                                      <Grid>
                                        <Button onClick={() => { deleteVideo(index) }} className='delete_photo'>{data.del_video_title}</Button>
                                      </Grid>
                                      <Grid >
                                        <Button onClick={() => { saveTemplate4(index) }} className='save_temp1' >{data.save_template_title}</Button>
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
              {addButton ?
                <>
                  <Button style={{ float: 'left', margin: '12px 0' }} className='save_temp' onClick={() => { addTemplateSelect(1) }}>{data.new_temp_butt}</Button>
                  <Button style={{ float: 'right' }} className='subpro' onClick={submitProject}> {data.submit_butt}</Button>

                </> : null

              }

            </Grid>
          </Grid>
        </Grid>
        {projectValue ?
          <Grid style={{ justifyContent: 'space-between' }} item xs={12} sm={12} md={12}>
            <h4 style={{ textAlign: 'left', width: '187px' }}>{data.final_file_generation}</h4>
            <Grid col-md-12 style={{ border: '1px solid', padding: '3px 0 0 22px' }}>
              <h3 style={{ textAlign: 'left' }}><span>{data.project_title}:</span> <span style={{ textAlign: 'left', fontwweight: '100' }}>{tempform.project_name}</span></h3>
              <Grid className='Filegeneration'>
                <h3 style={{ textAlign: 'center' }} >{data.file_generation}</h3>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell ><strong>{data.temp_name}</strong></TableCell>
                        <TableCell ><strong>{data.event_scheduled}</strong></TableCell>
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
                              </TableCell>
                           */}
                          <TableCell >{row.temp_value == 1 ? data.template_name_1 : row.temp_value == 2 ? data.template_name_2 : row.temp_value == 3 ? data.template_name_3 : row.temp_value == 4 ? data.template_name_4 : ''}</TableCell>
                          <TableCell ><strong>{data.from}</strong> {tConvert(row.start_time)} <strong>{data.to}</strong> {tConvert(row.end_time)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid style={{ textAlign: 'center' }} mt={5}>
                  <Button className={disable ? 'btn-disable' : 'btn-generate'} disabled={disable} onClick={generateButton}> {data.generate}</Button>
                </Grid>
              </Grid>
              <h3>{data.preview_video}</h3>
            </Grid>
          </Grid>
          : null}
      </Container>
    </Box>
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
  );
}

export default CreateProject;
