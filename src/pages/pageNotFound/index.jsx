import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'
import { Typography, Button } from "@material-ui/core";
function PageNotFound(props) {
  const dispatch = useDispatch();
  const urlImg = useMemo(() => process.env.PUBLIC_URL, []);
  return (
    <div className="pageFound">
      <div className="pageFound__content">
        <img src={urlImg + "/img/logo/logo.png"} alt="logo" />
        <Typography component="p">Không thể tìm thấy Page!</Typography>
        <Button onClick={() => dispatch} variant="outlined">
          <Link to="/">Quay về trang chủ </Link>
        </Button>
      </div>
    </div>
  );
}

// PageNotFound.propTypes = {

// }

export default PageNotFound;
