import React, { useEffect, useState } from "react";
import "./../App.css";

const Menu = ({
  onMouseClick,
  setOnMouseClick,
  onMousePush,
  isLose,
  setIsLose,
  isWon,
  setIsWon,
  restart,
  setRestart,
}) => {
  const [timeLeft, setTimeLeft] = useState(2400);
  const mins = Math.floor(timeLeft / 60);
  const min1 = Math.floor(mins / 10);
  const min2 = mins % 10;
  const sec1 = Math.floor((timeLeft - mins * 60) / 10);
  const sec2 = (timeLeft - mins * 60) % 10;

  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (restart) {
      setTimeLeft(2400);
      return;
    }
    if (timeLeft === 0) {
      setIsLose(true);
      return;
    }
    const interval = setInterval(() => {
      if (onMouseClick && !isWon && !isLose) {
        setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isLose, restart, isWon, onMouseClick, setIsLose, timeLeft]);

  return (
    <div className="menu">
      <div className="counter">
        <div
          className="counter__num"
          style={{ backgroundPositionX: -126 + `px` }}
        ></div>
        <div
          className="counter__num"
          style={{
            backgroundPositionX:
              min1 !== 0 ? (min1 - 1) * -14 + `px` : -126 + `px`,
          }}
        ></div>
        <div
          className="counter__num"
          style={{
            backgroundPositionX:
              min2 !== 0 ? (min2 - 1) * -14 + `px` : -126 + `px`,
          }}
        ></div>
      </div>
      <div
        className={`main-button ${onMousePush ? "onMousePushButton" : ""} ${
          isWon ? "isWonButton" : isLose ? "isLoseButton" : ""
        } ${isMouseDown ? "onMouseDownButton" : ""}`}
        onMouseDown={() => {
          setIsMouseDown(true);
        }}
        onClick={() => {
          setIsMouseDown(false);
          setRestart(true);
          setIsLose(false);
          setIsWon(false);
          setOnMouseClick(false);
        }}
      ></div>
      <div className="counter">
        <div
          className="counter__num"
          style={{ backgroundPositionX: -126 + `px` }}
        ></div>
        <div
          className="counter__num"
          style={{
            backgroundPositionX:
              sec1 !== 0 ? (sec1 - 1) * -14 + `px` : -126 + `px`,
          }}
        ></div>
        <div
          className="counter__num"
          style={{
            backgroundPositionX:
              sec2 !== 0 ? (sec2 - 1) * -14 + `px` : -126 + `px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Menu;
