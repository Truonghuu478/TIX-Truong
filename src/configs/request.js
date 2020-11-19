


import axios from "axios";

 const request = (method="",url="",data={},accessUser="user") => {
        
    return axios({
        method,
        url,
        data,
        headers:{
            Authorization :"Bearer " +JSON.parse(localStorage.getItem(accessUser)).accessToken
        }
    })
}
export default request;


