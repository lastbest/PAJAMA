import React from "react";

function Counter() {
  var dday = new Date("August 30, 2022, 0:00:00").getTime();
  setInterval(function () {
    var today = new Date().getTime();
    var gap = dday - today;
    var day = Math.ceil(gap / (1000 * 60 * 60 * 24));
    var hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
    var sec = Math.ceil((gap % (1000 * 60)) / 1000);

    document.getElementById("count").innerHTML =
      "D-" +
      day.toString().padStart(2, "0") +
      " : " +
      hour.toString().padStart(2, "0") +
      " : " +
      min.toString().padStart(2, "0") +
      " : " +
      sec.toString().padStart(2, "0");
  }, 1000);
  return (
    <div>
      <div id="count"></div>
    </div>
  );
}

export default Counter;
