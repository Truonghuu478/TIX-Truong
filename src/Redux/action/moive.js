import Axios from "axios"
import * as tyAction from "../constanst";




export const getHostAPIMovieTheater = (index) => {
    return dispatch => {
        Axios({
            method: "GET",
            url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
        }).then(result => {
            dispatch({
                type: tyAction.GETAPIMOVIETHEATER,
                listMovieTheater: result.data,
                index
            })
        }).catch(error => {
            console.log(error);

        })
    }
}
export const getAPISyStemTheaterClusters = (maHeThongRap,index) => {
    return (dispatch,getState) => {
        const {maNhom } = getState().MovieManaGerment;
        Axios({
            method: "GET",
            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${maNhom}`
        }).then(result => {
          
            dispatch({
                type: tyAction.getAPISYSTEMThEATERCLUSTERS,
                systemTheater: result.data,
                maHeThongRap,
                index
            })
        }).catch(error => {
            console.log(error);

        })
    }
}

export const getDetailMovieToCode = (id) => {
    return dispatch => {
        Axios({
            method: "GET",
            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
        }).then(result => {
            
            dispatch({
                type: tyAction.GETAPIDETAILMOVIE,
                infoMovie: result.data,
                
            })
        }).catch(err => {
            console.log(err);

        })
    }
}
export const  fetchListSyStemTheaterClusters =(Group)=>{
    return dispatch =>{
        Axios({
            method:"GET",
            url :`https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${Group}`
        }).then(res=>{
            dispatch({
                type :tyAction.FETCH_ALL_LIST_SYSTEM_THEATER,
                listMovieOnSystemTheater : res.data
            })
        })
    }
}

export const GetAPIDetailMovieToTheater = (maPhim)=>{
    return dispatch =>{
        Axios({
            method:"GET",
            url:`https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
        }).then(result=>{
            dispatch({
                type : tyAction.GET_DETAIL_MOVIE_TO_THEATER,
                detailCinemaToTheater:result.data,
                
            })
        }).catch(err=>{
            console.log(err.message);
            
        })
    }
}

export const fetchListMovie = (maNhom)=>{
  
     
        return Axios({
            method:"GET",
            url:"https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom="+maNhom,
        })
    
}