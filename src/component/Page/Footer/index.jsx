import React from "react";
import BackToTop from '../../mixin/backtotop/backtotop';
import data from "../../../json/license.json";
import { Clearfix } from "react-bootstrap";
// index.propTypes = {

// };


const _renderPartner = () => {
  let dem = 0;
  return data.map((item, index) => {
    ++dem;

    if (dem >= 5) {
      dem = 0;
      return (
        <div key={index} className="partner-past">
          <a href="http://">
            <img className="logo-partner" src={item.logo} alt="" />
          </a>
          <br />
        </div>
      );
    }
    return (
      <div key={index} className="partner-past">
        <a href="http://">
          <img className="logo-partner" src={item.logo} alt="" />
        </a>
      </div>
    );
  });
};
function Footer(props) {

  return (
    <>
      <footer className="Footer">
        <div className="container">
          <div className=" Footer__company">
            <div className="Footer__company-text">
              <p className="title">TIX</p>
              <div className="row">
                <div className="col-md-6">
                  <a href="">FAQ</a>
                </div>
                <div className="col-md-6">
                  <a href="">Thỏa thuận sử dụng</a>
                </div>
                <div className="col-md-6">
                  <a href="">Brand Guidelines</a>
                </div>
                <div className="col-md-6">
                  <a href="">Chính sách bảo mật</a>
                </div>
              </div>
            </div>

            <div className="Footer__company-partner">
              <p className="title">Đối tác</p>
              <div className="container-fluid">
                <div className=" linePartner ">{_renderPartner()}</div>
              </div>
            </div>
            <div className="Footer__company-soc">
              <p className="title">MOBILE APP</p>
              <div className="d-flex">
                <img
                  src="https://tix.vn/app/assets/img/icons/apple-logo.png"
                  alt="apple-logo"
                />
                <img
                  src="https://tix.vn/app/assets/img/icons/android-logo.png"
                  alt="android-logo"
                />
              </div>
            </div>
            <div className="Footer__company-soc">
              <p className="title">social</p>
              <div className="d-flex">
                <img
                  src="https://tix.vn/app/assets/img/icons/facebook-logo.png"
                  alt="apple-logo"
                />
                <img src="https://tix.vn/app/assets/img/icons/zalo-logo.png" />
              </div>
            </div>
          </div>
          <div className="Footer__license row">
            <div className=" col-md-3 Footer__license-logo">
              <img
                src="https://tix.vn/app/assets/img/icons/zion-logo.jpg"
                alt="zion"
              />
            </div>
            <div className="Footer__license-detail  col-md-6 ">
              <p>TIX –Dự án cuối khóa Lập trình Frontend [CYBERSOFT-ACADEMY]</p>

              <p>
                Người thực hiện : LÊ HỮU TRƯỜNG
            </p>
              {/* <p>
              Giấy chứng nhận đăng ký kinh doanh số: 0101659783, đăng ký thay
              đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư
              Thành phố Hồ Chí Minh cấp.
            </p> */}
              <p>Số Điện Thoại (Hotline): 0867837427</p>
              <p>
                Email:
              <a
                  target="_black"
                  className="email-tool"
                  href="https://mail.google.com/mail/u/0/#inbox"
                >
                  {" "}
                truonghuu478@gmail.com
              </a>
              </p>
            </div>
            <div className="col-md-3 Footer__license-chick   ">
              <a
                target="_blank"
                href="http://online.gov.vn/Home/WebDetails/62782?AspxAutoDetectCookieSupport=1
              "
              >
                <img
                  src="https://s3img.vcdn.vn/123phim/2020/03/d1e6bd560daa9e20131ea8a0f62e87f8.png"
                  alt="alert"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}

export default Footer;
