import React, { useMemo } from "react";

const TiXLoading = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const screenWidth = useMemo(() => window.innerWidth, [window.innerWidth]);
  return (
    <div className="loading-spinners">
      <img
        src={
          screenWidth < 576
            ? "https://tix.vn/app/assets/img/login/group@2x.png"
            : "img/logo/logo.png"
        }
        alt="logo"
      />
    </div>
  );
};

export default TiXLoading;
