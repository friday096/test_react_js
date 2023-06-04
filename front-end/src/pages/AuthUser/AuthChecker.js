import React from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { emailVerification, tokenData } from '../../utils/Api';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AuthContext from '../../context/AuthContext';
import TranslateContext from '../../context/TranslateContext';

const AuthChecker = () => {
  const [open, setOpen] = React.useState(true);
  const [status, setStatus] = React.useState(false)
  const params = useParams();
  const navigate = useNavigate();
  const { setAuth } = React.useContext(AuthContext); //Login Context
  const {data}= React.useContext(TranslateContext); //Get Translate Data


  React.useEffect(() => {


    const timer = setTimeout(() => {
      emailVerification({ id: params.id }).then((res) => {
         console.log('verification result', res)
        if (res.msg === "This verification link is expired") {
          setStatus(true)
        }

        else if (res.code === 201) {
          navigate('/login')
          NotificationManager.warning(res.msg);

        }
        else if (res.code === 200) {
          console.log('resss sucesss', res)


          // setStatus(res.)
          if (res.jwtToken) {
            console.log('resss hellll', res.jwtToken)

            localStorage.setItem('token', res.jwtToken)

            tokenData({ token: res.jwtToken }).then((res) => {
              console.log('token response', res)
              if (res.code === 200) {
                setAuth({
                  id: res.data.id,
                  name: res.data.contact_name,
                  email: res.data.email
                })
                navigate('/project')

              } else {
                NotificationManager.error(data.login_error)

                // navigate('/login')
              }
            }).catch((res) => {
              NotificationManager.error(data.internal_server_error)
            })
          }


          // localStorage.setItem('token', res.jwtToken)
          // NotificationManager.success(res.msg);

        }
      })
      setOpen(false)
    }, 2000);
    return () => clearTimeout(timer);

  }, [])
  return (

    <div>
      {status === false ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
          <p style={{ marginTop: 90, marginRight: 20, position: 'absolute' }}> Activating Account......</p>

        </Backdrop>) :
        (
          <p style={{ display:"flex",justifyContent:"center",minHeight:"100vh",alignItems:"center"}}> You are already Verified</p>
        )}
    </div>
  );
}

export default AuthChecker;
