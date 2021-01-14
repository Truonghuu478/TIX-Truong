import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import {
  Fab,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableHead,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Swal from "sweetalert2";
import ModalAdmin from "../../../screen/modalAdmin/index";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import ScaleLoader from "react-spinners/ScaleLoader";
// *css loading
import loadingStyle from "../../../assets/jss/components/LoadingStyle";
// *css loading
// action
import * as action from "../../../../Redux/action/admin";
// constant
// location
import { useLocation } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
    borderCollapse: "collapse",
  },
  tableCell: {
    padding: 0,
    "& button": {
      "&:hover": {
        outline: "none ",
      },
      "&:focus": {
        outline: "none ",
      },
    },
  },
});
ManagerMovie.propTypes = {
  types: PropTypes.string.isRequired,
};

export default function ManagerMovie() {
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles2();
  const [detailMovie, setDetailMovie] = useState(null);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { indexSpinner, globalSearch, listMovies } = useSelector(
    (state) => state.AdminReducer
  );
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [emptyRows, setEmptyRows] = useState(0);
  useEffect(() => {
    setEmptyRows(
      rowsPerPage -
        Math.min(rowsPerPage, listMovies.length - page * rowsPerPage)
    );
    // eslint-disable-next-line
  }, [listMovies]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    if (location.pathname === "/admin/movie-theater") {
      if (globalSearch === "") {
        dispatch(action.getListMovies());
      }
    }
    // eslint-disable-next-line
  }, [globalSearch]);

  // delete movie
  const handleRemoveMovie = (maPhim) => {
    action
      .deleteMovie(maPhim)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "successful movie deletion!",
          // padding: "0 0 20px 0",
          width: "400px",
          timerProgressBar: false,
          showConfirmButton: false,

          timer: 1500,
        });
        dispatch(action.getListMovies());
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Movie deletion failed",
          text: err.message,
          // footer: '<a href>Why do I have this issue?</a>',
          timerProgressBar: false,
          showConfirmButton: true,

          // timer: 2000,
        });
      });
  };
  // handleOpen modal
  const handleOpenModal = () => {
    setDetailMovie(null);
    setTypeModal("Add-Movies");
    setShowModal(true);
  };
  //handeEdit Movie
  const handleEditMovie = (movie) => {
    setTypeModal("Edit-Movie");
    setDetailMovie(movie);
    setShowModal(true);
  };

  const renderHTML = React.useCallback(() => {
    if (listMovies.length > 0) {
      return (rowsPerPage > 0
        ? listMovies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : listMovies
      ).map((row, index) => (
        <TableRow key={index}>
          <TableCell className={classes.tableCell}>{index + 1}</TableCell>
          <TableCell component="th" scope="row">
            {row.tenPhim}
          </TableCell>
          <TableCell className={classes.tableCell}>{row.maPhim}</TableCell>
          <TableCell className={classes.tableCell}>
            <img
              src={row.hinhAnh}
              style={{ width: 150, height: 200, objectFit: "fill" }}
              alt={row.tenPhim}

              //  onError={(e)=>{e.target.onerror = null; e.target.src="\img/default-film.webp"}}
            />
          </TableCell>
          <TableCell className={classes.tableCell}>
            {new Date(row.ngayKhoiChieu).toLocaleDateString()}
          </TableCell>
          <TableCell className={classes.tableCell}>{row.danhGia}</TableCell>
          {/* <TableCell  >
            {row.trailer }
          </TableCell> */}
          <TableCell className={classes.tableCell}>
            {row.moTa.slice(1, 70) + "..."}
          </TableCell>

          <TableCell className={classes.tableCell}>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleRemoveMovie(row.maPhim)}
                aria-label="Delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
          <TableCell className={classes.tableCell}>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => handleEditMovie(row)}
                aria-label="Edit"
              >
                <EditRoundedIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      ));
    }
    return (
      <TableRow>
        <TableCell colSpan="7" style={{ color: "red", textAlign: "center" }}>
          Can't find the movies!
        </TableCell>
      </TableRow>
    );
    // eslint-disable-next-line
  }, [listMovies, globalSearch]);
  return indexSpinner ? (
    <ScaleLoader color={"#1769AA"} css={loadingStyle} />
  ) : (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Order</TableCell>
              <TableCell colSpan="1" style={{ fontWeight: "bold" }}>
                Movie's name
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Movie's code</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Images</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Launch date</TableCell>

              <TableCell style={{ fontWeight: "bold" }}>Evaluate</TableCell>

              {/* <TableCell className={classes.tableCell}>
              Trailer
            </TableCell> */}
              <TableCell style={{ fontWeight: "bold" }}>info</TableCell>
              <TableCell className={classes.tableCell}>
                <Fab onClick={handleOpenModal} color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderHTML()}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={listMovies.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ModalAdmin
        types={typeModal}
        show={showModal}
        detailMovie={detailMovie}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}
