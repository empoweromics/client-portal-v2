
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { SubmitOppForm } from './submitOppForm';
import { useEffect, useState } from 'react';
import { ProjectDetails } from './projectDetails';
import axiosClient from 'src/utilities/axios/axiosIntercept';

let projectObj= {
  "_id": "p-6fd01f65",
  "state": "under construction",
  "area": "el gameel",
  "city": "port said",
  "i18n": {
      "en": {
          "name": "Eclat",
          "description": "ÉCLAT is New plan developments’ fifth project on Egyptian grounds and the first in Port Said City, following the outstanding success of Serrano, Atika, Tonino Lamborghini, and Eleven in the prospering New Capital.New plan developments’ preceding projects have made a difference with their clear goal and mission already set in mind to redefine the meaning of comfort and luxury within the New Capital.New Plan developments decided to launch Éclat after the huge success of its well-established projects in New Capital, so the company decided to explore new territory, so the chosen destination was “Port Said”, to continue the splendid journey."
      },
      "ar": {
          "name": "",
          "description": ""
      }
  },
  "rating": 3.849645287230583,
  "developer": "d-bpl7mh85g",
  "developer_name": "new plan dev.",
  "logo": "6fd01f65.jpeg",
  "units": {
      "totla": 50,
      "start": {
          "_id": "u-21895e3f",
          "priceBase": 1689000,
          "spaceBuildUp": 70,
          "pricePerMeter": 24128.57
      },
      "avg": {
          "_id": "u-98317396",
          "priceBase": 3200000,
          "spaceBuildUp": 120,
          "pricePerMeter": 26666.67
      }
  }
}
function SimpleDialog(props) {
  const { onClose,  open ,projectId} = props;
const [renderedComponent, setRenderedComponent] = useState('ProJect-Details');
const [projectDetails, setProjectDetails] = useState();
  const handleClose = () => {
    setRenderedComponent('ProJect-Details')
    onClose();
  };
  // const authLogin=async(user) =>{
  //   console.log(user);
  //   try{
  // const res=await axios.put(`${process.env.REACT_APP_DEVELOP_URL}/client/auth/${user.uid}`,user)
  // console.log(res);
  //   }
  //   catch(e){
  // console.log(e);
  //   }
  // }
  
const getProject=async()=>{
  try{
    // const res= await axiosClient(`/client/project/project/${projectId}`,{
    //   headers: { 'user': 'cXtdTSxTS0a5nyti9CpGeKokWun2' }
    // })
    // console.log(res);
    setProjectDetails(projectObj)
    console.log(projectObj);
  }
  catch(e){
console.log(e);
  }
}
useEffect(() => {
 if(projectId)getProject()
}, [projectId]);
  return (
    <Dialog onClose={handleClose} open={open}
    maxWidth="sm"
    fullWidth
    >
   {renderedComponent==='Submit-Opp'&&  <SubmitOppForm setRenderedComponent={setRenderedComponent}/>}
   {renderedComponent==='ProJect-Details'&&  <ProjectDetails projectDetails={projectDetails} setRenderedComponent={setRenderedComponent}/>}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export  function OppDialog({projectId,open, setDialogProjectId}) {

  const handleClose = () => {
    setDialogProjectId(false);
  };

  return (
    <div>
           <SimpleDialog
           projectId={projectId}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}