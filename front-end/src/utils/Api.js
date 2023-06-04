import Axios from 'axios';
import global from './global';
Axios.defaults.baseURL = `${global.serverUrl}`;
// var TOKEN = localStorage.getItem('token');
// console.log('Apiiii', TOKEN)
// Axios.defaults.headers.common['x-access-token'] = TOKEN


  //Register
  export async function userRegister(data) {
    const DATA = await Axios.post('users/registration', data,{
    }).then((res) => {
        console.log(res, 'registration')
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  }

  //Email Verification
  export async function emailVerification(data) {
    const DATA = await Axios.post('users/emailVerification', data).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 
  

 //LogIn
 export async function logIn(data) {
    const DATA = await Axios.post('users/login', data,{
    }).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 

  //Forget Password Send Otp
  export async function forgotPassword(data) {
    const DATA = await Axios.post('users/sendOtp', data).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 

  //Update Reset Password
  export async function updatePassword(data) {
    const DATA = await Axios.put('users/forgotPassword', data).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 

  //Get User Data with Token
  export async function tokenData(token) {
    const DATA = await Axios.get('users/getUserTokenData',{
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 

  //Image & Video Upload
  export async function imageUpload(data, token) {
    const DATA = await Axios.post('users/uploadTemplateImage',data,{
      headers: {
        'x-access-token': token.token
      }
    }).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 
  

  
  export async function checkTemplate(data) {
    const DATA = await Axios.post('users/checkTemplateDateTime',data,{
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 

  //Check 24 Hours Complete of Templates during Edit Time 

  export async function checkEditTemplateDateTime(data) {
    const DATA = await Axios.post('users/checkEditTemplateDateTime',data,{
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 

  //Project Submission

  export async function addProject(data, token) {
    const DATA = await Axios.post('users/addProject',data,{
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 

  //Get Project
  export async function getProject() {
    const DATA = await Axios.get('users/getProject',{
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 


  //Edit Project With Templates Data
  export async function editProjectTemp(data) {
    const DATA = await Axios.post('users/editProjectTemp',data,{
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 

  //Update Project

  export async function updateProject(data) {
    const DATA = await Axios.put('users/updateProject',data,{
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 


  //Delete Project
  
  export async function deleteProject(project_id) {
    console.log('project_id', project_id)
    const DATA = await Axios.delete('users/deleteProject/'+project_id,{
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if (res.data === 200) {
        return res.data;
      }
      return res.data;
    }).catch((err) => {
      console.log(err);
    });
    return DATA;
  } 
