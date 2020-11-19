import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import {Box,withStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const labels = {
  0.5: 0.5,
  1: 1,
  1.5: 1.5,
  2: 2,
  2.5: 2.5,
  3:3,
  3.5 :3.5,
  4 : 4,
  4.5 : 4.5,
  5:5
};
const ValidationTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);

const useStyles = makeStyles({
  root: {
    textAlign:"center",
   
    "& .MuiBox-root ":{
      margin:0,
      //xanh
      color:"#7ed321", 
      fontSize:40,
      
    },
    "& .MuiRating-root":{//red mo #fda193
      color:"#fb3b22",
      "& .MuiRating-decimal":{
        fontSize:50,
          
        "& label":{
          display:"block"
        }
      }
      
    }
    // width: 200,
    // display: 'flex',
    // alignItems: 'center',
  },
  inputTextField:{
    width:"100%",
    transition:"all 0.4s",
    "&:focus":{
      borderColor:"#fb3b22",
      boxShadow:
     " 0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)"
    
    },
    "&:placeholder":{
      color:"gray",
      fontWeight:"400"
    },
    "& input":{
      width:"100%",
      whiteSpace: "normal",
      wordBreak:" break-all"
    }
  }
  ,Modal:{
    "& .modal-content":{
      height:"auto"
    }
  },
  btn:{
    "&:focus":{
      outline: "none"
    }
  }
});

function SpringModal(props) {

  const [numStar, setNumStar] = React.useState(2.5);
  const [hover, setHover] = React.useState(-1);
  const  [textCmt,setTextCmt] = React.useState("");
  const classes = useStyles();
  const handleChange  =(event)=>{
    setTextCmt(event.target.value)

  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    props.handleAddComment(textCmt,numStar)
       props.onHide();
  }
  const handleAdd = ()=>{
    
    props.handleAddComment(textCmt,numStar)
    props.onHide();
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      
      autoFocus={false}
      enforceFocus={false}
      className={classes.Modal}
     
    >
   
      <Modal.Body  style={{ flex: "initial"}}>
      <div className={classes.root}>
      {numStar !== null && <Box component="div"
        ml={2}>{labels[hover !== -1 ? hover : numStar]}</Box>}
      <Rating
         name="hover-feedback"
        value={numStar}
        precision={0.5}
        onChange={(event, newValue) => {
          setNumStar(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      
    </div>
      <form noValidate autoComplete="off" onSubmit={
          handleSubmit
        }>
          <ValidationTextField
            className={classes.inputTextField}
            onChange={handleChange}
             autoFocus
            required
            color={"secondary"}
            variant="outlined"
            placeholder="Nói cho mọi người biết bạn nghĩ gì về phim này ..."
          />
      </form>

      </Modal.Body>
      <Modal.Footer>
      <Button variant="contained" 
      className={classes.btn}
      style={{marginRight:15}}   onClick={()=>
          
          
         props.onHide() 
        }>Đóng</Button>
        <Button variant="contained"
        onClick={()=>handleAdd()}
        className={classes.btn}
        color="secondary"   >Đăng</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default SpringModal;