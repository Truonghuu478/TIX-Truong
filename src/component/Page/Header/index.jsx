import React,{useState,Fragment,useRef} from "react";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { NavLink,Link,useLocation } from "react-router-dom";
import {useDispatch} from "react-redux"
import PropsTypes from "prop-types";
// icon dropdown  
import {Box }from "@material-ui/core";
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
// left icon 
import SimpleMenu from "../../mixin/SimpleMenu"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
Header.prototype = {
  login: PropsTypes.string,
};
Header.defaultProps = {
  login: "",
};

function Header(props) {
  const location = useLocation()

  const dispatch  = useDispatch();
  // console.log(props.login);
  let [dropdown,setDropdown]  = useState(false);
  let screenWidth = React.useMemo(()=> window.innerWidth);
  //set login success

  // xuly render user
  const handleChangeRenderUser = React.useCallback( () => {
    let checkTaiKhoan =props.login;

   if(checkTaiKhoan) switch (checkTaiKhoan.taiKhoan) {
      case "letruong": {
        return (
          <div className="imgLogin">
            <img
              className="rounded-circle "
              width="35px"
              height="35px"
              src="/img/avatar/huutruong.jpg"
              alt="ảnh của tôi"
            />

            <span className=" ml-1">Hữu Trường</span>
            
         <SimpleMenu/>
          </div>
        );
      }
      case "hienho": {
        return (
          <div className="imgLogin">
            <img
              className="rounded-circle "
              width="35px"
              height="35px"
              src="img/avatar/huutruong.jpg"
              alt="ảnh của tôi"
            />
            <span className=" ml-1">Hiền Hồ </span>
            
          </div>
        );
      }
      default:{
          return (
            <div className="imgLogin">
             <div className="d-flex align-items-center">
              <h2 className={"user--logo"}>{props.login.hoTen.slice(0,1)}</h2>
              <span className=" ml-1">{props.login.hoTen }</span>
             </div>
             <SimpleMenu/>
            </div>
          );
        }
        break;
    }
  },[props.login,JSON.parse(localStorage.getItem("user"))]);

  // || localStorage.getItem("user")
  const _handleChangeStyleLogin = React.useCallback( () => {
    if (props.login  ) {
      return <>{handleChangeRenderUser()}</>;
    }

    return (
      <Link to="/login">
        <div className="header__top--login ">
          <img src="https://tix.vn/app/assets/img/avatar.png" alt=""/>
          <span className=" pr-2">
            Đăng nhập
            {/* <Button color="default" variant="outlined" className="header__top-logout ">Đăng xuất</Button> */}
          </span>
        </div>
      </Link>
    );
  },[props.login]);
  const handleChangeRoute = (section)=>{
    // let domRef = useRef(section);  
  let a = null;
    if(screenWidth < 768)  setDropdown(false);
    window.location.pathname !== "/"? a = setTimeout(() => {
      
      document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
      
    }, 2000) :  document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
    dispatch({
      type:"RESTART__MOVIE"
    })
    return ()=>{
      clearTimeout(a)
    }
  }

  // handleDisplay 
  
  
  return (
      <Fragment>
        
      
    <header id="home" className="header ">
      <div className="header__category">
          {
          screenWidth < 768 && location.pathname !== "/"  &&
        <Link to="/" onClick={()=> dispatch({
          type:"RESTART__ALL"})} >
           <ArrowBackIosIcon style={{color:"gray"}} />
        </Link>
           }
        <Link onClick={()=>window.location.pathname !== "/" ? dispatch({
          type:"RESTART__ALL"
        }) : window.location.reload()} to="/"  className="navbar-brand" >
          <img
          
            src="https://tix.vn/app/assets/img/icons/web-logo.png"
            alt="logo"
          />
          {/* <img src={`./img/logo.svg`} alt="logo" /> */}
        </Link>
      <nav className="navbar   navbar-dark   p-0 ">
        
      <ul className="navbar__content  ">
     
        <li>
        <NavLink  to="/" 
            
             
            onClick={()=>handleChangeRoute("new-in")}
             className="nav-item  "
             >

            
        
               Lịch chiếu
             
            
            </NavLink>
        </li>

            <li>
            <NavLink to="/" 
             
            
           
             onClick={()=>handleChangeRoute("show-in")}
              className="nav-item  ">
                    
 
         
                 Cụm rạp
              
             
             </NavLink>
            </li>
            <li>
            <NavLink to="/" 
              
              
              onClick={()=>handleChangeRoute("news")}
               className="nav-item  ">
              
          
              Tin tức
               
              
              </NavLink>
            </li>
            
           <li>
           <NavLink to="/" 
               
               onClick={()=>handleChangeRoute("ungDung")}
   
               className="nav-item  ">
   
                 Ứng dụng
              
              </NavLink>
           </li>
          </ul>
      </nav>
      <div onClick={()=>setDropdown(!dropdown)} className="header__dropdown">
          <FormatAlignRightIcon/>
      </div>
      <div className={"loginUser"}>{_handleChangeStyleLogin()}</div>
      </div>

    </header>
      

        <Box style={{width:dropdown?"70%":0,padding:dropdown?"15px":0,}} className={"menu-dropdown"} component="div" variant="div">
        <ul>
            <li style={{display:"flex",justifyContent:"space-between"}}>
          <div className={"loginUser"}>{_handleChangeStyleLogin()}</div>
          <div onClick={()=>setDropdown(!dropdown)}>

           {dropdown && <ArrowForwardIosIcon/>}
          </div>
              </li>  

         
        <li>
        <NavLink  to="/" 
            
             
            onClick={()=>handleChangeRoute("new-in")}
             className="nav-item  "
             >

            
        
               Lịch chiếu
             
            
            </NavLink>
        </li>

            <li>
            <NavLink to="/" 
             
            
           
             onClick={()=>handleChangeRoute("show-in")}
              className="nav-item  ">
                    
 
         
                 Cụm rạp
              
             
             </NavLink>
            </li>
            <li>
            <NavLink to="/" 
              
              
              onClick={()=>handleChangeRoute("news")}
               className="nav-item  ">
              
          
              Tin tức
               
              
              </NavLink>
            </li>
            
           <li>
           <NavLink to="/" 
               
               onClick={()=>handleChangeRoute("ungDung")}
   
               className="nav-item  ">
   
                 Ứng dụng
              
              </NavLink>
           </li>
           <li>
           <Button
           style={{display:props.login ?"inline-block":"none"}}
                onClick={()=>props.handleOutUser()}
                className="btn-out"
                variant="contained"
              >
                Đăng xuất
              </Button>
           </li>
            
        </ul>
        </Box>
  
          <Box
          onClick={()=>setDropdown(!dropdown)}
           style={{backgroundColor:dropdown?"rgba(0,0,0,.8)":"transparent",pointerEvents:dropdown?"inherit":"none"}} className="side-menu">

          </Box>
    </Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    login: state.UserReducer.userLogin,

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleOutUser: () => {
      dispatch({
        type: "OUT_USER",
        
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
