import React, { useEffect, useCallback } from "react";
import SpringModal from "../../../screen/modal-video/star/index";

import {
  Container,
  Typography,
  Card,
  CardHeader,
  Avatar,
  makeStyles,
  CardContent,
  CardActions,
  IconButton,
  withStyles,
  Badge,
} from "@material-ui/core";
// import { Rating } from '@material-ui/lab';
import Swal from "sweetalert2";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import FavoriteIcon from "@material-ui/icons/Favorite";
// restar
import RenderStar from "../../../../vender/star";
// import PropTypes from 'prop-types';

// index.propTypes = {

// };
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// const StyledBadge = withStyles((theme) => ({
//   badge: {
//     backgroundColor: "#44b700",
//     color: "#44b700",
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     "&::after": {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       borderRadius: "50%",
//       animation: "$ripple 1.2s infinite ease-in-out",
//       border: "1px solid currentColor",
//       content: '""',
//     },
//   },
//   "@keyframes ripple": {
//     "0%": {
//       transform: "scale(.8)",
//       opacity: 1,
//     },
//     "100%": {
//       transform: "scale(2.4)",
//       opacity: 0,
//     },
//   },
// }))(Badge);
const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const useStyles = makeStyles({
  iconHeart: {
    color: "red",
    width: 18,
  },
  Card: {
    margin: "10px 0",
    boxShadow: "-1px 2px 7px #777",
  },
  HeaderCheck: {
    "& .MuiCardHeader-content": {
      "& .MuiCardHeader-title": {
        color: "#9b9b9b",
        fontSize: 14,
      },
    },
  },
  CardHeader: {
    "& .MuiCardHeader-content": {
      "& .MuiCardHeader-title": {
        color: "#000",
      },
      "& .MuiCardHeader-subheader": {
        fontSize: 11,
      },
    },
  },
  CardContent: {
    padding: "0 16px",
  },
  cardActions: {
    padding: 0,
    "& button": {
      "&:focus": {
        outline: "none",
      },
    },
  },
  rootStar: {
    display: "flex",
    alignItems: "center",
    marginTop: 15,
    //   marginRight: 64,
    "& img": {
      // minWidth:24,
      margin: "0 2px",
      color: "#fda193 !important",
    },
  },
  btnMoreCard: {
    fontSize: 14,
    color: " #949494",
    fontFamily: "SF Regular",
    border: "1px solid #949494",
    borderRadius: 4,
    textAlign: "center",
    background: "0 0",
    padding: "7px 25px",
    transition: " all .2s",
    margin: "auto",
    marginTop: 35,
    marginBottom: 20,
    display: "block",
    "&:hover": {
      backgroundColor: "#fb4226",
      borderColor: "#fb4226",
      color: "#fff!important",
    },
  },
  Avatar: {
    textTransform: "uppercase",
  },
});
function Evaluate(props) {
  const classes = useStyles();
  const history = useHistory();
  // const { infoMovie } = useSelector((state) => state.UserReducer);
  const { userLogin } = useSelector((state) => state.UserReducer);
  const { listUser } = useSelector((state) => state.MovieManaGerment);
  const dispatch = useDispatch();
  const [seeMore, setSeeMore] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const renderHeart = (total) => {
    return [...Array(total)].map((item, index) => (
      <React.Fragment key={index}>
        <FavoriteIcon className={classes.iconHeart} />
      </React.Fragment>
    ));
  };

  // check user
  const handleCheckUser = () => {
    if (!userLogin) {
      Swal.fire({
        icon: "error",
        title: "Bạn cần phải đăng nhập",
        // allowOutsideClick: false,
      }).then((res) => {
        if (res.value) {
          history.push("/login");
        }
      });
    } else {
      setOpen(true);
    }
  };

  // handleAddComment
  const handleAddComment = (text, numStar) => {
    let { hoTen, taiKhoan } = userLogin;

    let card = {
      name: hoTen,
      hinhAnh: taiKhoan === "letruong" ? "/img/avatar/huutruong.jpg" : null,
      activeTimes: "Vừa xong",
      text: text,
      appendHeart: 0,
      evaluate: numStar,
      like: 0,
      activeLike: false,
      status: taiKhoan === "letruong" ? 0 : 1, //0 :face,   1:normal,
      id: hoTen + "_" + Math.random().toString(36).substr(2, 9),
    };

    dispatch({ type: "ADD_LIST_USER", data: card });
  };

  // handleAddCMT
  const handleAddCMT = (text, numStar) => {
    let { hoTen, taiKhoan } = userLogin;

    let card = {
      name: hoTen,
      hinhAnh: taiKhoan === "letruong" ? "/img/avatar/huutruong.jpg" : null,
      activeTimes: "Vừa xong",
      text: text,
      appendHeart: 0,
      evaluate: numStar,
      like: 0,
      activeLike: false,
      status: taiKhoan === "letruong" ? 0 : 1, //0 :face,   1:normal,
      id: hoTen + "_" + Math.random().toString(36).substr(2, 9),
    };

    dispatch({ type: "ADD_LIST_USER", data: card });
  };

  // like
  const handleLike = (card, status) => {
    let newUsers = [...listUser];

    let index = newUsers.findIndex((item) => item.id === card.id);
    if (index !== -1) {
      if (card.activeLike) {
        card.activeLike = false;
        document.getElementById(`${card.id}`).style.color = "gray";
        newUsers[index].like--;
      } else {
        newUsers[index].like++;
        card.activeLike = true;
        document.getElementById(`${card.id}`).style.color = "#fb4226";
      }
      dispatch({ type: "EDIT_LIKE_USER", data: newUsers });
    }
  };
  const replayCards = useCallback(() => {
    setSeeMore(true);
    renderCard(listUser.reverse());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUser]);
  // restart seeMore
  useEffect(() => {
    if (listUser.length > 5) {
      document.querySelector("#hide-btn").style.cssText =
        "opacity:1;display:block";
    }
    if (seeMore || listUser.length < 5) {
      document.querySelector("#hide-btn").style.cssText =
        "opacity:0;display:none";
    }
  }, [listUser.length, seeMore]);
  const renderCard = useCallback(
    (arr = seeMore ? listUser : listUser.slice(0, 6) || []) => {
      return arr.reverse().map((card, index) => {
        return (
          <Card key={index} className={classes.Card}>
            <CardHeader
              className={classes.CardHeader}
              avatar={
                userLogin ? (
                  card.status === 1 ? (
                    <Avatar
                      className={classes.Avatar}
                      src="/broken-image.jpg"
                      alt={"logo-man"}
                    >
                      {userLogin.hoTen.slice(0, 1)}
                    </Avatar>
                  ) : (
                    <Badge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={
                        <SmallAvatar
                          alt="Remy Sharp"
                          src="/img/icon/avatar/facebook.svg"
                        />
                      }
                    >
                      <Avatar alt="Travis Howard" src={card.hinhAnh} />
                    </Badge>
                  )
                ) : card.status === 1 ? (
                  <Avatar
                    className={classes.Avatar}
                    src="/broken-image.jpg"
                    alt={"logo-man"}
                  >
                    {userLogin.hoTen.slice(0, 1)}
                  </Avatar>
                ) : (
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <SmallAvatar
                        alt="Remy Sharp"
                        src="/img/icon/avatar/facebook.svg"
                      />
                    }
                  >
                    <Avatar alt="Travis Howard" src={card.hinhAnh} />
                  </Badge>
                )
              }
              action={
                <Typography style={{ textAlign: "center" }} component={"div"}>
                  <span style={{ color: "#91d25a", fontWeight: "500" }}>
                    {card.evaluate}
                  </span>
                  <Typography component={"div"}>
                    {RenderStar(card.evaluate, "newIns")}
                  </Typography>
                </Typography>
              }
              title={card.name}
              subheader={card.activeTimes}
            />
            {/* content
             */}
            <CardContent className={classes.CardContent}>
              <Typography
                style={{ textAlign: "justify" }}
                color={"textSecondary"}
                component="div"
              >
                {card.text}
                {renderHeart(card.appendHeart)}
              </Typography>
              <hr style={{ margin: "5px 0 0 0" }} width={"100%"} />
            </CardContent>

            <CardActions className={classes.cardActions} disableSpacing>
              <IconButton
                onClick={() => handleLike(card, "list")}
                id={card.id}
                style={{ color: card.activeLike ? "#fb4226" : "gray" }}
                aria-label="add to favorites"
              >
                <ThumbUpAltIcon />
              </IconButton>
              <span style={{ color: "gray", fontSize: 15 }}>
                {card.like} Thích
              </span>
            </CardActions>
          </Card>
        );
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listUser]
  );
  const renderHTML = () => {
    return (
      <Typography component="div">
        <Typography component="div">
          {userLogin && (
            <Card
              data-toggle="modal"
              data-target="#modal-combo"
              id="countTicket-combo"
              onClick={handleCheckUser}
              className={classes.Card}
              style={{ cursor: "pointer" }}
            >
              <CardHeader
                className={classes.HeaderCheck}
                avatar={
                  userLogin.taiKhoan !== "letruong" ? (
                    <Avatar
                      style={{ textTransform: "uppercase" }}
                      src="/broken-image.jpg"
                      alt={"logo-man"}
                    >
                      {userLogin.hoTen.slice(0, 1)}
                    </Avatar>
                  ) : (
                    <Avatar
                      src={"/img/avatar/huutruong.jpg"}
                      alt={"logo-man"}
                    />
                  )
                }
                action={
                  <Typography
                    style={{ textAlign: "center" }}
                    component={"div"}
                    className={classes.rootStar}
                  >
                    <img src={"/img/icon/listStar.png"} alt="List"/>
                  </Typography>
                }
                title={"Bạn nghĩ gì về phim này ?"}
                // subheader={card.activeTimes}
              />
              {/* content
               */}
            </Card>
          )}
          {!userLogin && (
            <Card
              onClick={handleCheckUser}
              className={classes.Card}
              style={{ cursor: "pointer" }}
            >
              <CardHeader
                className={classes.HeaderCheck}
                avatar={<Avatar src="/broken-image.jpg" />}
                action={
                  <Typography
                    style={{ textAlign: "center" }}
                    component={"div"}
                    className={classes.rootStar}
                  >
                    {RenderStar(5, "newIns")}
                  </Typography>
                }
                title={"Bạn nghĩ gì về phim này ?"}
                // subheader={card.activeTimes}
              />
              {/* content
               */}
            </Card>
          )}
        </Typography>
        <Typography component="div">
          {renderCard()}
          {/* {renderFistCard()} */}

          <button
            id="hide-btn"
            onClick={replayCards}
            className={classes.btnMoreCard}
          >
            Xem Thêm
          </button>
        </Typography>
      </Typography>
    );
  };
  return (
    <div className="Evaluate">
      <Container maxWidth="lg">{renderHTML()}</Container>
      <SpringModal
        show={open}
        handleAdd={handleAddCMT}
        handleAddComment={handleAddComment}
        onHide={() => setOpen(false)}
      />
    </div>
  );
}
export default Evaluate;
