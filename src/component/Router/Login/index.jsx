import React,{useState,useEffect} from 'react'
import "./_login.scss";
import Login from "./login";
import Registers from "./registers";
import {useSelector} from "react-redux"
import TixLoading from "../../Layout/Loading";

export default function Logins() {

  const {formRegister} = useSelector(state=>state.UserReducer)
        const [loading,setLoading] = useState(true);
        const [ isCurrentComponent,setIsCurrentComponent] = useState(true);
          //stop loading 
  useEffect(() => {
    try {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    } catch (error) {
      console.log(error);

    }
  }, [])
  
  useEffect(() => {
    setIsCurrentComponent(true)
  }, [formRegister])
  //handleChangeStatus 
  const handleChangeStatus =(status)=>{
      if(status === "register"){
        setIsCurrentComponent(false)
      }else setIsCurrentComponent(true)

  }

  
  return (
        <>
              {(loading ? <div className="sweet-loading">
        <TixLoading  />

      </div> : <div className="Login">
          {isCurrentComponent  && <Login handleChangeStatus={handleChangeStatus}  formRegister={formRegister}/>}
          {!isCurrentComponent && <Registers handleChangeStatus={handleChangeStatus}  />}

        </div>
      )}
        </>
    )
}
