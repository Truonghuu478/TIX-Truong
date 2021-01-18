import { makeStyles } from "@material-ui/styles";

const VoucherStyles = makeStyles({
  root: {
    width: "90%",
    margin: "10px auto",
  },
  BoxBanner: {
    // width: "95% !important",
    // padding: 5,
    marginLeft: "auto",
  },
  BoxImg: {
    height: 150,
    transform: "scale(0.8)",
    transition: "all .6s",
    // overflow: "hidden",
    "& img": {
      boxShadow:
        "1px 9px 2px 0px rgb(106 103 103 / 25%), 0 10px 10px rgb(60 60 60 / 22%)",
      borderRadius: 16,
      width: "100%",

      height: "90%",
      objectFit: "fill",
    },
  },
});

export default VoucherStyles;
