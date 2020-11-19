import React,{useState}  from "react";
import { connect } from "react-redux";
import * as action from "../../Redux/action/admin";

function  LoginAdmin (props) {
 
  const  [state,setState] = useState({
    taiKhoan: "",
    matKhau: ""
  })
  
 const  handleOnchange = e => {
    let { name, value } = e.target;
    setState({...state,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.login(state, props.history);
    
  };



    return (
      <div className="container">
        
        <div className="col-sm-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="">Username</label>
              <input
                type="text"
                className="form-control"
                name="taiKhoan"
                onChange={handleOnchange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input
                type="password"
                className="form-control"
                name="matKhau"
                onChange={handleOnchange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user, history) => {
      dispatch(action.actLogin(user, history));
    }
  };
};

export default connect(null, mapDispatchToProps)(LoginAdmin);
