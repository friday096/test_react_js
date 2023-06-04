import React from 'react';
import Header from './components/layouts/Header'
import { useRoutes, useNavigate } from 'react-router-dom';
import routes from './routes';
import './App.css';
import { tokenData } from './utils/Api';
import AuthContext from './context/AuthContext';
import { NotificationManager } from 'react-notifications';
import TranslateContext from './context/TranslateContext';

function App() {
  
  const {setAuth}= React.useContext(AuthContext); //Login Context
  const navigate = useNavigate();
  const {data}= React.useContext(TranslateContext); //Get Login User

  React.useEffect(()=>{
    const timer = setTimeout(() => {
      let token = localStorage.getItem("token");
      if(token){
        tokenData({token:token}).then((res)=>{
          console.log('token response', res)
          if(res.status === 400){
            NotificationManager.error(data.token_error)
            localStorage.removeItem('token')
             navigate('/login')
          }
          if(res.code === 200){
            setAuth({
              id:res.data.id,
              name:res.data.contact_name,
              email:res.data.email
          })
          }else{
           NotificationManager.error(data.login_error)
  
            navigate('/login')
          }
        }).catch((res)=>{
          NotificationManager.error(data.internal_server_error)
        })
      }
        }, 10);
        return () => clearTimeout(timer);


  },[])
  const routing = useRoutes(routes);

  return (
    <>
           <Header />

          {routing}


    </>
  );
}

export default App;
