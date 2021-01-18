import React, { useState, useEffect } from "react";
import {
  Container,
  LinearProgress,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../../themes";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import * as action from "../../../../Redux/action/admin";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import TabLogo from "../../../Layout/home/ShowIn/TabLogo";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import ModalAdmin from "../../../screen/modalAdmin/index";
// data MaHeThongRap
import dataMaHeThongRap from "../../../Layout/home/ShowIn/json/maHeThongRap.json";
// css
import { useLocation } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import data from "../../../../json/nameMovie.json";

const useStyle = makeStyles({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  buttonShowTime: {
    margin: "2rem 0",
    textAlign: "center",
    gridColumn: "1 / span 4",
  },
  item: {
    "& .MuiTabs-root": {
      width: "100% !important",
    },
  },
  theaterItem: {
    display: "flex",
    width: "100%",

    flexGrow: 3,
    // justifyContent: "space",
    alignItems: "center",
    padding: theme.spacing(1),
    "& button": {
      "&:hover": {
        backgroundColor: "transparent",
      },
      flexGrow: 2,
      "& span": {
        "& svg": {
          width: "2em",
          height: "2em",
          color: "orange",
        },
      },
    },
  },
  noneOutline: {
    "&:focus": {
      outline: "none",
    },
  },
  scrollBar: {
    "& .ps__rail-y": {
      zIndex: 999999,
    },
  },
});

export default function ManagerShowtime() {
  const urlPublic = process.env.PUBLIC_URL;
  const classes = useStyle();
  const location = useLocation();
  const dispatch = useDispatch();
  const { maHeThongRap, detailCinemaToTheater } = useSelector(
    (state) => state.MovieManaGerment
  );
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [cinemaCode, setCinemaCode] = useState(null);
  const [listTheater, setListTheater] = useState([]);

  const checkPath = React.useMemo(
    () => location.pathname === "/admin/movie-showtime",
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // handle change input

  // filter movie Theater
  const filterDetailTheater = React.useCallback(() => {
    if (detailCinemaToTheater.length > 0) {
      return detailCinemaToTheater.map((item, index) => {
        let RapImg = dataMaHeThongRap.find(
          (cumRap) => cumRap.maHeThongRap === maHeThongRap
        );
        let lastChar = item.tenCumRap.split("-");

        let attackChar = item.tenCumRap.split(` `, 1);

        let clusterName = data.find((item1) => item1.name === attackChar[0]);
        return (
          <Accordion square expanded key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={item.tenCumRap}
            >
              {
                <Grid className={classes.theaterItem}>
                  <img
                    width={50}
                    height={50}
                    src={RapImg.hinhAnh}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = urlPublic + "/img/default-film.webp";
                    }}
                    alt="ss"
                  />
                  <Grid style={{ paddingLeft: 20 }}>
                    <Typography style={{ fontWeight: 600 }} component="p">
                      <span style={{ color: clusterName.color }}>
                        {clusterName.name}
                      </span>{" "}
                      -
                      {lastChar[1] === " CGV Saigonres Nguyễn Xí"
                        ? lastChar[1]
                            .split(" ")
                            .forEach((char, index) =>
                              index !== 1 ? char + " " : null
                            )
                        : lastChar[1]}
                    </Typography>
                    {/* <Typography component="p">{item.tenCumRap}
            </Typography> */}
                    <Typography
                      component="span"
                      style={{
                        fontSize: 13,
                        color: "gray",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {item.diaChi}
                    </Typography>
                  </Grid>

                  <Tooltip
                    className={classes.noneOutline}
                    onClick={() =>
                      handleOpenModal(item.maCumRap, item.danhSachRap)
                    }
                    title="Create showtimes"
                  >
                    <IconButton aria-label="Add">
                      <AddToQueueIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              }
            </AccordionSummary>
            <AccordionDetails>
              {item.danhSachRap.map((rap, index1) => {
                return (
                  <Button
                    style={{ textAlign: "center", fontWeight: "bold" }}
                    variant={"contained"}
                    component={"span"}
                  >
                    {rap.tenRap}
                  </Button>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      });
    } else return <LinearProgress />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailCinemaToTheater]);

  // fetch ds movie
  useEffect(() => {
    dispatch(action.fetchListDetailTheater(maHeThongRap));
    // eslint-disable-next-line
  }, [maHeThongRap]);
  // handleOpen modal
  const handleOpenModal = (code, lstTheater) => {
    setCinemaCode(code);
    setListTheater(lstTheater);
    setTypeModal("Add-ShowTimes");
    setShowModal(true);
  };
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid
            item
            lg={3}
            xs={12}
            ms={6}
            md={4}
            className={checkPath ? classes.item : null}
          >
            <TabLogo />
          </Grid>
          <Grid item lg={9} xs={12} ms={6} md={8}>
            <PerfectScrollbar
              style={{ height: 450, overflowY: "hidden" }}
              className={classes.scrollBar}
            >
              {filterDetailTheater()}
            </PerfectScrollbar>
          </Grid>
        </Grid>
        <ModalAdmin
          show={showModal}
          listTheater={listTheater}
          types={typeModal}
          cinemaCode={cinemaCode}
          onHide={() => setShowModal(false)}
        />
      </Container>
    </>
  );
}
