import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import {useSelector,useDispatch} from "react-redux"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
     step: {
        color: "red",
        borderTop: "2px solid red",
        height: "80px",
        lineHeight: "70px",
        transition:"all 0.6s"
    }, user :{
        fontWeight: 400,
        color:"#9b9b9b",
        fontSize:15
    }
}));
function ShowTicket(props) {
    const classes = useStyles();
        
        const {step} = useSelector(state=>state.BookingReducer);
        const {userLogin} =useSelector(state => state.UserReducer);
        const dispatch = useDispatch();
        const screenWidth = React.useMemo(()=> window.innerWidth)
    // xuly render user
    const handleChangeRenderUser = React.useCallback(() => {
        let checkTaiKhoan = userLogin.taiKhoan ;
        switch (checkTaiKhoan) {
            case "letruong": {
                return (
                    <>
                        <img
                            className="rounded-circle"
                            width="35px"
                            height="35px"
                            src="/img/avatar/huutruong.jpg"
                            alt="ảnh của tôi"
                        />

                        <span className={`ml-1 ${classes.user}`}>Hữu Trường</span>

                    </>
                );
            }
            case "hienho": {
                return (
                    <>
                        <img
                            className="rounded-circle"
                            width="35px"
                            height="35px"
                            src="https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.0-9/p960x960/117617583_750120582491870_6621740211623032897_o.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=YI7BZpCGFroAX84XIoZ&_nc_ht=scontent.fsgn5-7.fna&tp=6&oh=0175810ead5e20989b46075a6dad1f12&oe=5F7590A9"
                            alt="ảnh của tôi"
                        />
                        <span className={`ml-1 ${classes.user}`}>Hiền Hồ </span>

                    </>
                );
            }
            default:
                {
                    return (
                        <>
                            <h2 className={"user--logo"}>{userLogin.hoTen.slice(0,1)}</h2>
                            <span className={`ml-1 ${classes.user}`}>{userLogin.taiKhoan}</span>

                        </>
                    );
                }
        }
    },[]);

    const changeStep =(i,status = "step")=>{
        dispatch({
            type:"CHECK_STEP",
            i,
            status
        })
    }
    const __renderStep = React.useCallback( () => {
        const arrStep = ["CHỌN LOẠI VÉ", " CHỌN GHẾ & THANH TOÁN", "KẾT QUẢ ĐẶT VÉ"];
        return arrStep.map((item, index) => {
            if (step === index + 1 && step !== 3) {
                
                return <div key={index}
                 style={{cursor:null,fontWeight:500,width:screenWidth <768 ? "100%":null}} 
                 className={classes.step}
                    //  onClick={step > index+1? ()=>{}}
                 >
                    <span>{`0${index + 1} `}</span>
                    {item}
                </div>
            }else if(step === 3 && step === index + 1){
                return <div key={index}
                style={{cursor: "no",fontWeight:500,width:screenWidth <768 ? "100%":null}} 
                   onClick={step > index+1? ()=>{changeStep(index)}:null}
                   className={classes.step}
                >
                   <span>{`0${index + 1} `}</span>
                   {item}
               </div>
            }
            return <div key={index}
             style={{cursor: step > index+1 && step !== 3? 'pointer' :null,fontWeight:500,width:screenWidth <768 ? "100%":null}} 
                onClick={step > index+1 && step !== 3? ()=>{changeStep(index,"restart__listChair")}:null}
                 
             >
                <span>{`0${index + 1} `}</span>
                {item}
            </div>
        })
    },[step])

    return (
        
            <div style={{width : step === 2 ? "77%":null}} className="showStep row">
                <div className={step === 2 ? "col-xs-12 col-md-9 col-xl-9 col-lg-10":"col-xs-12 col-md-9 col-xl-10 col-lg-10"}>
                    <div className="showStep__content">

                        {__renderStep()}
                    </div>
                </div>
                {
                  screenWidth >768 &&  <div className="col-xs-0 col-md-3 col-xl-2 col-lg-2">
                    <div style={{justifyContent:step !== 1  && step !== 3 ?"end":"flex-end"}} className="user">
                        {handleChangeRenderUser()}

                    </div>
                </div>
                }
            </div>
        
    );
}

export default ShowTicket;