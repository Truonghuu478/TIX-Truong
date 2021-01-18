import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  Card: {
    overflow: "inherit ",
  },
  cardDangChieu: {
    // width:"215px",
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      "& .MuiCardContent-root": {
        opacity: 0,
      },
      "& .MuiBox-root ": {
        opacity: 1,
      },
      "& .MuiCardActions-root": {
        opacity: 1,
      },
    },
  },
  cardSapChieu: {
    // width:"215px",
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      "& .MuiBox-root ": {
        opacity: 1,
      },
    },
  },
  CardContent: {
    opacity: 1,
    transition: "all 0.3s",
    padding: "16px 0",
  },
  cardItem: {
    width: "100%",
  },
  imgCard: {
    width: "100%",
    objectFit: "fill",
  },
  imgCardHeight: {
    minHeight: "318px",
  },
  checkStart: {
    width: 54,
    position: "absolute",
    top: 5,
    right: 10,
    backgroundColor: " rgba(12,27,54,.8)",
    border: "1px solid #1f2e46",
    borderRadius: 8,
  },
  checkStartImg: {
    maxWidth: "10px",
  },

  banner: {
    fontSize: "14px",
    borderRadius: "4px",
    padding: "0 5px",
    color: "#fff",
    minWidth: "33px",
    textAlign: "center",
    display: "inline-block",
    marginRight: "8px",
    maxHeight: "20px",
  },
  bannerMobile: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    color: "white",
    padding: "20px 10px !important",
  },
  boxMovie: {
    // display:"flex",
    // justifyContent:"flex-start",
    // alignItems:"center",
    paddingBottom: "10px",
    fontWeight: "bold",
    fontSize: "16px",
    height: "42px",
    display: "inline-block",
    // fontamily: 'SF Medium'/
  },
  boxMovieOver: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    transition: "all 0.3s",
    height: "100%",
    opacity: 0,

    "& img": {
      width: 70,
      height: 70,
    },
  },
  boxMovieOverImg: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    height: "318px",
    background: "linear-gradient(to top,#000,transparent 100%)",
  },
  boxMovieOverBtn: {
    marginTop: "10px",
    padding: 0,
    width: "100%",
  },
  btnMovie: {
    width: "100%",
    background: "linear-gradient(to left,#fb4226,#ce3017 100%)",
    color: "white",
    fontSize: 18,
    padding: "10px 0",
  },
  btnMovieMobile: {
    background: "linear-gradient(to left,#fb4226,#ce3017 100%)",
    borderRadius: 4,
    fontSize: 14,
    color: "white",
    padding: 3,
  },
  banner16: {
    backgroundColor: "#fb4226",
  },
  bannerP: {
    backgroundColor: "#00ac4d",
  },
  datTruoc: {
    position: "absolute",
    top: "0px",
    left: "-18px",
    width: "80%",
    pointerEvents: "none",
    overflow: "hidden",
    transform: " translate(-5%,-12%)",
    maxWidth: 150,
  },
}));
export default useStyles;
