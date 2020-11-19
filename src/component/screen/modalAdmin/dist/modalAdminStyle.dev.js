"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styles = require("@material-ui/core/styles");

var useStyles = (0, _styles.makeStyles)({
  root: {
    "& .modal-content": {
      backgroundColor: "#f1ecec",
      "& .modal-header": {
        marginBottom: "3rem",
        "& .modal-title": {
          margin: "1rem 0",
          textAlign: "center",
          width: "100%"
        }
      }
    }
  },
  headerModal: {
    marginBottom: "20px",
    height: "0 !important"
  },
  formModal: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "20px",
    overflow: "hidden"
  }
});
var _default = useStyles;
exports["default"] = _default;