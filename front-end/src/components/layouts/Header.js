import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Drawer from '@mui/material/Drawer';
// import Divider from '@mui/material/Divider';
// import List from '@mui/material/List'; 
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Flag from 'react-world-flags'
// import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Fade from '@mui/material/Fade';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import { Grid } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import TranslateContext from '../../context/TranslateContext';
const Header = () => {

  const navigate = useNavigate();
  const [country, setCountry] = React.useState('us');
  const {userauth, setAuth}= React.useContext(AuthContext); //Get Login User
  const {checkLanguage, data}= React.useContext(TranslateContext); //Get Login User


  const handleChange = (event) => {
    setCountry(event.target.value);
    checkLanguage(event.target.value)
  };
  const logOut = (e) =>{
    console.log('logout');
    e.preventDefault();
    setAuth({})
    localStorage.removeItem('token')
    navigate('/login')
  }
  React.useEffect(() => {
  }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar  style={{backgroundColor:'white' ,color:"#fff"}}position="static" >
            <Toolbar className='main_header'>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                {/* <MenuIcon /> */}
              </IconButton>
              <Typography variant="h6" style={{color:'white'}} component="div" sx={{ flexGrow: 1 }}>
                Vetrine.com
              </Typography>
             {Object.keys(userauth).length !== 0 ? <> {userauth?.name}
             <Button className='btn-logout' onClick={logOut}> {data.header_logout}</Button></>: <>
             <RouterLink className='btn-login'  to="/login">
                  {data.header_login}
             </RouterLink>
                <RouterLink className='btn-register' to="/register">{data.header_register} </RouterLink>
                </>  }


              <FormControl>
              {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Age
          </InputLabel> */}
              <Select
                
                className='select custom-select'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="Country"
                onChange={handleChange}
                // input={<Flag code="us" height="16" />}
              > 
               <MenuItem value='us'><Flag code="us" height="16" /> &nbsp;USA</MenuItem>
            {/* <MenuItem value='fr'><Flag code="fr" height="16" />France</MenuItem>
            <MenuItem value='de'><Flag code="de" height="16" /> Germany</MenuItem> */}
            <MenuItem value='it'><Flag code="it" height="16" /> &nbsp;Italy </MenuItem>

            </Select>
            </FormControl>

            </Toolbar>
          </AppBar>
        </Box>
      );
}

export default Header;
