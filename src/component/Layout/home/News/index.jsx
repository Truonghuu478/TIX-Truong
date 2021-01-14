/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function News() {
  return (
    <section id="news">
      <div className="container adsNews">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="pill" href="#cinemaE">
              Điện ảnh 24h
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="pill" href="#cinemaR">
              Review
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="pill" href="#cinemaO">
              Khuyến mãi
            </a>
          </li>
        </ul>
        {/* Tab panes */}
        <div className="tab-content">
          <div className="tab-pane active" id="cinemaE">
            <div style={{ margin: "0 15px 0 15px " }} className="row">
              <div className="col-md-6 col-12 abv">
                <div className="abv_item1">
                  <div className="image">
                    <img
                      src="./img/news/image1.png"
                      alt="new-1"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" className="title">
                      Bán Đảo Peninsula là bom tấn xác sống không thể bỏ lỡ!
                    </a>
                    <p className="sub_title">
                      Là phần phim khép lại bộ ba xác sống (Seoul Station, Train
                      to Busan - 2016) của đạo diễn Yeon Sang Ho, mới đây, bom
                      tấn Bán Đảo (Train to Busan 2/Peninsula) vừa chính thức
                      tung trailer hé lộ những tình tiết mới cực hấp dẫn.
                    </p>
                  </div>
                  <div className="statusBar">
                    <div className="d-flex align-items-center">
                      <i className="far fa-thumbs-up" />
                      <span>1</span>
                      <i className="far fa-comment" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 abv">
                <div className="abv_item1">
                  <div className="image">
                    <img
                      src="./img/news/image2.png"
                      alt="new-1"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    <a href="#" className="title">
                      ‘Tôi sẽ làm tất cả ngỡ ngàng bởi phiên bản tà ác của mình’
                      - Song Ji Hyo
                    </a>
                    <p className="sub_title">
                      Nhân dịp tác phẩm “Kẻ Xâm Nhập” giữ vững ngôi vương phòng
                      vé suốt gần một tuần trình chiếu tại quê nhà, ekip sản
                      xuất liền cho đăng tải poster cùng trailer đặc biệt, đồng
                      thời chia sẻ không ít thông tin lý thú xoay quanh nội dung
                      bộ
                    </p>
                  </div>
                  <div className="statusBar">
                    <div className="d-flex align-items-center">
                      <i className="far fa-thumbs-up" />
                      <span>0</span>
                      <i className="far fa-comment" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 abv ">
                <div className="abv_item1">
                  <div className="image">
                    <img
                      src="./img/news/image3.png"
                      alt="img-3"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    <a href="#" className="title">
                      Dàn mỹ nhân trong thế giới điện ảnh của quái kiệt
                      Christopher Nolan
                    </a>
                    <p className="sub_title">
                      Làng phim đương đại những năm qua chứng kiến sự lên ngôi
                      của cái tên Christopher Nolan, được biết tới như một trong
                      những đạo diễn thiên tài với khả
                    </p>
                  </div>
                  <div className="statusBar">
                    <div className="d-flex align-items-center">
                      <i className="far fa-thumbs-up" />
                      <span>0</span>
                      <i className="far fa-comment" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 abv ">
                <div className="abv_item1">
                  <div className="image">
                    <img
                      src="./img/news/image4.png"
                      alt="new-4"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    <a href="#" className="title">
                      Truy Cùng Giết Tận - Cuộc tái ngộ của hai 'ông hoàng phòng
                      vé' xứ Hàn
                    </a>
                    <p className="sub_title">
                      Sau 7 năm kể từ New World – bộ phim đạt thành tích hơn
                      4.68 triệu vé, hai tên tuổi lão làng trong làng điện ảnh
                      Hàn Quốc mới tiếp tục tái hợp trong
                    </p>
                  </div>
                  <div className="statusBar">
                    <div className="d-flex align-items-center">
                      <i className="far fa-thumbs-up" />
                      <span>0</span>
                      <i className="far fa-comment" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 abv ">
                <div className="abv_item2">
                  <div className="d-flex pt-0">
                    <img
                      src="./img/news/image5.png"
                      alt="new-5"
                      className="img-fluid"
                    />
                    <p>
                      6 đạo diễn tỉ đô làm nên thành công của những bom... tấn
                      đình đám nhất Hollywood
                    </p>
                  </div>
                  <div className="d-flex">
                    <img
                      src="./img/news/image6.png"
                      alt="new-6"
                      className="img-fluid"
                    />
                    <p>Gái Già Lắm Chiêu V – Những cuộc đời vương giả</p>
                  </div>
                  <div className="d-flex">
                    <img
                      src="./img/news/image7.png"
                      alt="abv_new3"
                      className="img-fluid"
                    />
                    <p>
                      Kaity Nguyễn trở thành mỹ nhân mới của vũ trụ Gái Già Lắm
                      Chiêu
                    </p>
                  </div>
                  <div className="d-flex">
                    <img
                      src="./img/news/image8.png"
                      alt="abv_new4"
                      className="img-fluid"
                    />
                    <p>
                      5 lý do khiến bạn không thể bỏ qua bộ phim Cậu Bé Người Gỗ
                      Pinocchio
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane pane__1 fade" id="cinemaR">
            <div className="row">
              <div className="col-md-6 col-12 abv">
                <div className="abv_item1">
                  <div className="image">
                    <img
                      src="./img/news/rw1.png"
                      alt="abv_7"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    <a href="#" className="title">
                      Review: Tàn Tích Quỷ Ám (Relic) - Ba thế hệ và mối liên
                      kết
                    </a>
                    <p className="sub_title">
                      Điểm nhấn của phim kinh dị năm 2020 chính là Tàn Tích Quỷ
                      Ám{" "}
                    </p>
                  </div>
                  <div className="statusBar">
                    <div className="d-flex align-items-center">
                      <i className="far fa-thumbs-up" />
                      <span>0</span>
                      <i className="far fa-comment" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 abv">
                <div className="abv_item1">
                  <div className="image">
                    <img
                      src="./img/news/rw2.png"
                      alt="abv_5"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    <a href="#" className="title">
                      Review: Dinh Thự Oan Khuất (Ghost Of War)
                    </a>
                    <p className="sub_title">
                      Tuy là một bộ phim có chất lượng tốt, nhưng có vẻ Dinh Thự
                      Oan Khuất vẫn chưa đủ để đem khán giả trở lại phòng vé!
                    </p>
                  </div>
                  <div className="statusBar">
                    <div className="d-flex align-items-center">
                      <i className="far fa-thumbs-up" />
                      <span>0</span>
                      <i className="far fa-comment" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 abv ">
                <div className="abv_item1">
                  <div className="image">
                    <img
                      src="./img/news/rw3.png"
                      alt="abv_6"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    <a href="#" className="title">
                      ‘BlacKkKlansman’ - cốc nước lạnh để người Mỹ thức tỉnh
                    </a>
                    <p className="sub_title">
                      Tác phẩm nhận đề cử Phim truyện xuất sắc tại Oscar 2019
                      của đạo diễn Spike Lee là một lát cắt nữa về nạn phân biệt
                      chủng tộc - nỗi đau gây nhức nhối nước Mỹ cho tới tận hôm
                      nay.
                    </p>
                  </div>
                  <div className="statusBar">
                    <div className="d-flex align-items-center">
                      <i className="far fa-thumbs-up" />
                      <span>0</span>
                      <i className="far fa-comment" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 abv ">
                <div className="abv_item1">
                  <div className="image">
                    <img
                      src="./img/news/rw4.png"
                      alt="abv_4"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    <a href="#" className="title">
                      American Sniper - Chính nghĩa hay phi nghĩa?
                    </a>
                    <p className="sub_title">
                      American Sniper khắc họa một tay súng bắn tỉa “huyền
                      thoại” của Hải quân Mỹ với 4 lần tham chiến ở Trung Đông.
                      Câu chuyện phim chậm rãi đưa người xem qua từng thời khắc
                      khác nhau của Kyle, từ thửa nhỏ, thiếu niên, rồi gia nhập
                      quân đội, rồi tham chiến. Từng khoảnh khắc bắt đầu nhẹ
                      nhàng...
                    </p>
                  </div>
                  <div className="statusBar">
                    <div className="d-flex align-items-center">
                      <i className="far fa-thumbs-up" />
                      <span>0</span>
                      <i className="far fa-comment" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 abv ">
                <div className="abv_item2">
                  <div className="d-flex pt-0">
                    <img
                      src="./img/news/rw5.png"
                      alt="abv_new5"
                      className="img-fluid"
                    />
                    <p>Review: Spider-Man: Into The Spider-Vesre </p>
                  </div>
                  <div className="d-flex">
                    <img
                      src="./img/news/rw6.png"
                      alt="abv_new6"
                      className="img-fluid"
                    />
                    <p>
                      COVID-19 là bản chính thức của MEV-1 phim contagion (2011)
                    </p>
                  </div>
                  <div className="d-flex">
                    <img
                      src="./img/news/rw7.png"
                      alt="abv_new7"
                      className="img-fluid"
                    />
                    <p>
                      [Review] Siêu Vệ Sĩ Sợ Vợ - Giải cứu Tổng thống chưa bao
                      giờ lầy lội và hài hước đến thế
                    </p>
                  </div>
                  <div className="d-flex">
                    <img
                      src="./img/news/rw8.png"
                      alt="abv_new8"
                      className="img-fluid"
                    />
                    <p>
                      [Review] Bloodshot - Mở màn ấn tượng cho Vũ trụ Siêu anh
                      hùng Valiant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane pane__1 fade" id="cinemaO">
            <div className="row">
              <div className="col-md-6 col-12 abv">
                <div className="abv_item1">
                  <div className="image">
                    <img
                      src="./img/news/voucher1.jpg"
                      alt="abv_8"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    <a href="#" className="title">
                      BHD STAR VÉ CHỈ 59.000Đ CẢ TUẦN!
                    </a>
                    <p className="sub_title">
                      Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với
                      giá 59k/vé khi mua vé trên TIX và thanh toán bằng ZaloPay
                      hoặc Mục Vé Phim trên ZaloPay.
                    </p>
                  </div>
                  <div className="statusBar">
                    <div className="d-flex align-items-center">
                      <i className="far fa-thumbs-up" />
                      <span>1</span>
                      <i className="far fa-comment" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 abv">
                <div className="abv_item1">
                  <div className="image">
                    <img
                      src="./img/news/voucher2.jpg"
                      alt="abv_9"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    <a href="#" className="title">
                      Beta Cineplex trở lại với hàng loạt ưu đãi lớn
                    </a>
                    <p className="sub_title">
                      Từ thứ 7 tuần này (9/5), toàn bộ các rạp Beta Cinemas trên
                      toàn quốc sẽ mở cửa trở lại. Mừng ngày trở lại, hàng loạt
                      khuyến mại KHỦNG đổ bộ cùng lúc dàng cho các tín đồ của
                      TIX đây.
                    </p>
                  </div>
                  <div className="statusBar">
                    <div className="d-flex align-items-center">
                      <i className="far fa-thumbs-up" />
                      <span>0</span>
                      <i className="far fa-comment" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 abv ">
                <div className="abv_item1">
                  <div className="image">
                    <img
                      src="./img/news/voucher3.jpg"
                      alt="abv_10"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    <a href="#" className="title">
                      [123Phim] Thứ 6 Không Đen Tối - Ưu đãi huỷ diệt 11k/vé Anh
                      Trai Yêu Quái{" "}
                    </a>
                    <p className="sub_title">
                      Từ giờ đến 05.12.2019, chỉ cần lần đầu mua vé trên
                      123Phim, chọn thanh toán bằng ZaloPay hoặc mục Vé Phim
                      trên ZaloPay, bạn có thể đặt ngay vé phim
                    </p>
                  </div>
                  <div className="statusBar">
                    <div className="d-flex align-items-center">
                      <i className="far fa-thumbs-up" />
                      <span>0</span>
                      <i className="far fa-comment" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 abv ">
                <div className="abv_item1">
                  <div className="image">
                    <img
                      src="./img/news/voucher4.jpg"
                      alt="abv_11"
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    <a href="#" className="title">
                      [123Phim] NHẬP MÃ 'PSM30K' - Giảm ngay 30k khi đặt vé Pháp
                      Sư Mù: Ai Chết Giơ Tay
                    </a>
                    <p className="sub_title">
                      123Phim đồng hành cùng phim Việt - Giảm ngay 30k mỗi giao
                      dịch khi đặt vé Pháp Sư Mù: Ai Chết Giơ Tay trên ứng dụng
                      123Phim.
                    </p>
                  </div>
                  <div className="statusBar">
                    <div className="d-flex align-items-center">
                      <i className="far fa-thumbs-up" />
                      <span>0</span>
                      <i className="far fa-comment" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 abv ">
                <div className="abv_item2">
                  <div className="d-flex pt-0">
                    <img
                      src="./img/news/voucher5.jpg"
                      alt="abv_new9"
                      className="img-fluid"
                    />
                    <p>[Mega GS] Một đoá hoa thay ngàn lời yêu</p>
                  </div>
                  <div className="d-flex">
                    <img
                      src="./img/news/voucher6.jpg"
                      alt="abv_new10"
                      className="img-fluid"
                    />
                    <p>
                      [123Phim] NHẬP MÃ 'BKT' - Giảm ngay 20k khi đặt vé Bắc Kim
                      Thang
                    </p>
                  </div>
                  <div className="d-flex">
                    <img
                      src="./img/news/voucher7.jpg"
                      alt="abv_new11"
                      className="img-fluid"
                    />
                    <p>Sinh Nhật Mega GS</p>
                  </div>
                  <div className="d-flex">
                    <img
                      src="./img/news/voucher8.jpg"
                      alt="abv_new12"
                      className="img-fluid"
                    />
                    <p>[123Phim] TixShop trở lại, quà ‘xịn’ hơn xưa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-light" id="btn-more">
            Xem thêm
          </button>
        </div>
      </div>
    </section>
  );
}
