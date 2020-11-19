import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import "./backtotop.css";
export default function BackToTop() {
  // reset scoll
  // useEffect(()=>{
  //     setShowScroll(false);

  // })

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);

    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 200) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      style={{ display: showScroll ? "flex" : "none" }}
      className="scrollTop"
    >
      <KeyboardArrowUpIcon onClick={scrollTop} />
    </div>
  );
}
