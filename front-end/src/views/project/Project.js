import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Grid, Container, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { tokenData, getProject, deleteProject} from '../../utils/Api';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import AuthContext from '../../context/AuthContext';
import Modal from '@mui/material/Modal';
import authChecker from '../../utils/authHelper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TranslateContext from '../../context/TranslateContext';
import { border, color } from '@mui/system';
const Project = () => {
  const navigate = useNavigate();
  const {translateFunc, data}= React.useContext(TranslateContext); //Get Translate Data

    const {userauth}= React.useContext(AuthContext); //Get Login User
    const [project, setProject] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [delProject, setDelproject] = React.useState();
    const handleOpen = (id) =>{
     setOpen(true);
     setDelproject(id)
    }
    const handleClose = () => setOpen(false);
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      borderRadius:'10px !important',
      p: 4,
      background: '#ECA19D',
      color:'#fff',
      borderColor:'#ECA19D'
    };
    //DeleteProject
    const deleteProj = ()=>{
      // console.log('delete Project', delProject)
      deleteProject(delProject).then((res)=>{
        if(res.code === 200){
          NotificationManager.success(data.project_del)
          setOpen(false)
        }else{
          NotificationManager.error(data.project_del_err)
        }
      }).catch((err)=>{ 
        NotificationManager.error(data.internal_server_error)
      })
    }

    React.useEffect(()=>{
      const timer = setTimeout(() => {
        // console.log('userid',userauth )
        getProject().then((res)=>{
          // console.log('resProject', res)
          if(res.code === 200){
            setProject(res.data)
          }else{
            // NotificationManager.error('Something went wrong')
          }
        })
        .catch((err)=>{
          NotificationManager.error(data.internal_server_error)
        })
          }, 100);
          return () => clearTimeout(timer);
    },[open])

    React.useEffect(()=>{
      if (!authChecker('authCheck')) navigate('/', { replace: true });

    })
    return (
      <Grid className='mainlogin' style={{padding:0}}>

      <Box

          noValidate
          autoComplete="off"
      >

          <Grid style={{ display: 'flex', height: '100vh' }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid container spacing={2} item xs={9} style={{ borderRight: '1px solid #dcdcdc82', background: '#fff',}}>
        <Box mt={5} sx={{ width: '100%', padding:'0px 105px 0px 102px'}} >
          <Grid style={{float:'right', marginBottom:20}}>
          <RouterLink className='create_pro'  to="/create-project">
              {data.create_project_button}
          </RouterLink>
          </Grid>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h4">
            {data.del_project_title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button className='cancel-project' onClick={handleClose}>{data.modal_cancel}</Button>
            <Button className='del-project' onClick={deleteProj}>{data.modal_delete}</Button>
          </Typography>
        </Box>
      </Modal>
      <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> <strong>{data.tbl_project_name}</strong></TableCell>
            <TableCell ><strong>{data.tbl_status}</strong></TableCell>
            <TableCell ><strong>{data.tbl_edit}</strong></TableCell>
            <TableCell ><strong>{data.tbl_download}</strong></TableCell>
            <TableCell ><strong>{data.tbl_project_delete}</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {project.length > 0 ? project.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.project_name}
              </TableCell>
              <TableCell > <Chip label={row.status == 0 ? 'not-ready':row.status == 1 ? 'building':'ready'} className={row.status == 0 ? 'not-ready':row.status == 1 ? 'building':'ready'}/></TableCell>
              <TableCell>
                      <RouterLink to={`/edit-project/${row.id}`}>
                        <IconButton style={{color:'green'}}> <EditIcon /> </IconButton>
                        </RouterLink>
                        </TableCell>
                      <TableCell ><IconButton style={{color:'blue'}}> <DownloadIcon /> </IconButton>
                      </TableCell>
                      <TableCell >
                        <IconButton style={{color:'red'}} onClick={()=>{handleOpen(row.id)}}> <DeleteIcon  /> </IconButton>
                        </TableCell>
            </TableRow>
         ))
        :<p style={{textAlign:'center'}}>{data.no_records}</p>
        }
        </TableBody>
      </Table>
    </TableContainer>

      </Paper>
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

export default Project;
