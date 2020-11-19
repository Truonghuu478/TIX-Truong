import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    // backgroundImage: "linear-gradient(to bottom, rgba(20, 50, 93, 0.9), rgba(8, 22, 48, 0.9))",
    //         boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.45)",
    //         backgroundAttachment: "fixed",

    // '& > *': {
    //   borderBottom: 'unset',
    // },
  },
});


function Row(props) {
  const { row,index } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        
        <TableCell component="th" scope="row">
          {index}
        </TableCell>
        <TableCell align="left">{new Date(row.ngayDat).toLocaleDateString()}</TableCell>
        <TableCell align="left">{new Date(row.ngayDat).toLocaleTimeString()}</TableCell>

        <TableCell align="left">{row.maVe}</TableCell>
        <TableCell align="left">{row.tenPhim}</TableCell>
        <TableCell align="left">{row.thoiLuongPhim}</TableCell>
        <TableCell align="left">{row.giaVe}</TableCell>

        <TableCell onClick={() => setOpen(!open)} style={{cursor:"pointer"}}>
        Click here
          <IconButton  aria-label="expand row" size="small" >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: open ?10:0, paddingTop: open ?10:0,transition:"all .5s"}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                List
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Mã ghế</TableCell>
                    <TableCell>Tên ghế</TableCell>
                    <TableCell align="left">Tên cụm rạp</TableCell>
                    <TableCell align="left">Tên Hệ thống rạp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.danhSachGhe.map((historyRow) => (
                    <TableRow key={historyRow.maGhe}>
                      <TableCell component="th" scope="row">
                        {historyRow.maGhe}
                      </TableCell>
                      <TableCell>{historyRow.tenGhe}</TableCell>
                      <TableCell align="left">{historyRow.tenRap}</TableCell>
                      <TableCell align="left">
                        {historyRow.tenHeThongRap}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// danhSachGhe: [{…}]
// giaVe: 75000
// maVe: 14710
// ngayDat: "2020-10-21T11:02:54.043"
// tenPhim: "Batman v Superman: Dawn of Justice"
// thoiLuongPhim: 120

Row.propTypes = {
  row: PropTypes.shape({
    ngayDat: PropTypes.string.isRequired,
    tenPhim: PropTypes.string.isRequired,
    maVe: PropTypes.number.isRequired,
    thoiLuongPhim : PropTypes.number.isRequired,  
    giaVe : PropTypes.number.isRequired,
    danhSachGhe: PropTypes.arrayOf(
      PropTypes.shape({
        maGhe: PropTypes.number.isRequired,
        tenGhe :PropTypes.string.isRequired,
        tenCumRap: PropTypes.string.isRequired,
        tenHeThongRap: PropTypes.string.isRequired,
      }),
    ).isRequired,
   
  }).isRequired,
};

//       maCumRap: "Rạp 4"
// maGhe: 60696
// maHeThongRap: "CGV"
// maRap: 534
// tenCumRap: "Rạp 4"
// tenGhe: "16"
// tenHeThongRap: "CGV - CGV Saigonres Nguyễn Xí"
// tenRap: "Rạp 4"
// __proto__: Object

export default function TableHistory(props) {

  const rows = props.thongTinDatVe;
  return (
    <TableContainer component={Paper} >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
           
            <TableCell>No</TableCell>
            <TableCell align="left">Ngày chiếu</TableCell>
            <TableCell align="left">Giờ chiếu</TableCell>

            <TableCell align="left">Mã vé</TableCell>
            <TableCell align="left">Tên phim</TableCell>
            <TableCell align="left">Thời lượng</TableCell>
            <TableCell align="left">Giá vé</TableCell>

            <TableCell align="left" >Danh sách ghế </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 ? rows.map((row,index) => (
            <Row key={index} index={index} row={row} />
          )):null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

