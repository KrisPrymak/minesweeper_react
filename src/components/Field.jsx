import React, { useEffect, useState } from "react";
import "./../App.css";

const Field = ({
  onMouseClick,
  setOnMouseClick,
  setOnMousePush,
  restart,
  setRestart,
  isLose,
  setIsLose,
  isWon,
  setIsWon,
}) => {
  const mine = -1;
  const field_size = 16;
  const cellArray = new Array(field_size).fill(null);

  let [countOpen, setCountOpen] = useState(0);

  let [itemsCondition] = useState(() => createField(field_size));

  function isStarted() {
    let start = true;
    if (isWon === false && isLose === false && onMouseClick === false) {
      start = false;
      setRestart(false);
    }
    return start;
  }

  useEffect(() => {
    if (restart) {
      
      for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
          document.getElementById(j + i * field_size).removeAttribute("style");
          field[i * field_size + j] = 0;
          itemsCondition[i * field_size + j] = 0;
        }
      }
      return;
    }
  });

  function createField(field_size) {
    const Field = new Array(field_size ** 2).fill(0);
    return Field;
  }

  function generateField(Field, xcord, ycord) {
    function updateCountMines(x, y) {
      if (x >= 0 && x < field_size && y >= 0 && y < field_size) {
        if (Field[y * field_size + x] === mine) return;
        Field[y * field_size + x] += 1;
      }
    }

    for (let i = 0; i < 40; ) {
      const x = Math.floor(Math.random() * field_size);
      const y = Math.floor(Math.random() * field_size);
      if (Field[y * field_size + x] === mine || (x === xcord && y === ycord))
        continue;
      Field[y * field_size + x] = mine;
      i += 1;
      updateCountMines(x - 1, y - 1);
      updateCountMines(x - 1, y);
      updateCountMines(x - 1, y + 1);
      updateCountMines(x, y - 1);
      updateCountMines(x, y + 1);
      updateCountMines(x + 1, y - 1);
      updateCountMines(x + 1, y);
      updateCountMines(x + 1, y + 1);
    }
    return Field;
  }

  function openItemBg(zeroItems, x, y) {
    if (x >= 0 && x < field_size && y >= 0 && y < field_size) {
      zeroItems.push(x);
      zeroItems.push(y);
    }
    return;
  }

  function Lose(x, y) {
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        if (
          field[i * field_size + j] === mine &&
          itemsCondition[i * field_size + j] !== 2 &&
          !isLose
        ) {
          document
            .getElementById(i * field_size + j)
            .setAttribute("style", "background-position: -85px -50px");
        }
        if (
          (itemsCondition[i * field_size + j] === 2 ||
            itemsCondition[i * field_size + j] === 3) &&
          field[i * field_size + j] !== mine
        ) {
          document
            .getElementById(i * field_size + j)
            .setAttribute("style", "background-position: -119px -50px");
        }
      }
    }
    if (!isLose) {
      document
        .getElementById(y * field_size + x)
        .setAttribute("style", "background-position: -102px -50px");
    }
    setIsLose(true);
  }

  function Win(countOpen) {
    if (countOpen >= field_size ** 2 - 41) {
      setIsWon(true);
      setCountOpen((countOpen) => 0);
    }
  }

  function isOpen(x, y) {
    let isOpenValue = false;
    if (
      itemsCondition[y * field_size + x] === 1 ||
      itemsCondition[y * field_size + x] === 2 ||
      itemsCondition[y * field_size + x] === 3 ||
      isWon ||
      isLose
    ) {
      isOpenValue = true;
    }
    return isOpenValue;
  }

  function updateBGAndCondition(x, y) {
    if (field[y * field_size + x] === mine) {
      Lose(x, y);
      return;
    }
    let zeroItems = [];
    openItemBg(zeroItems, x, y);

    while (zeroItems.length) {
      const y = zeroItems.pop();
      const x = zeroItems.pop();
      if (isOpen(x, y)) continue;
      if (field[y * field_size + x] === 0) {
        document
          .getElementById(x + y * field_size)
          .setAttribute("style", "background-position: -17px -50px");
        openItemBg(zeroItems, x - 1, y);
        openItemBg(zeroItems, x, y - 1);
        openItemBg(zeroItems, x + 1, y);
        openItemBg(zeroItems, x, y + 1);
      } else {
        document
          .getElementById(x + y * field_size)
          .setAttribute(
            "style",
            "background-position:" +
              -17 * (field[y * field_size + x] - 1) +
              "px -67px"
          );
      }
      itemsCondition[y * field_size + x] = 1;
      setCountOpen((countOpen) => countOpen + 1);
    }
    Win(countOpen);
    return;
  }

  function setFlagOrQuestion(x, y) {
    if (itemsCondition[y * field_size + x] === 1 || isWon || isLose) return;
    if (itemsCondition[y * field_size + x] === 0) {
      document
        .getElementById(x + y * field_size)
        .setAttribute("style", "background-position: -34px -50px");
      itemsCondition[y * field_size + x] = 2;
    } else if (itemsCondition[y * field_size + x] === 2) {
      document
        .getElementById(x + y * field_size)
        .setAttribute("style", "background-position: -51px -50px");
      itemsCondition[y * field_size + x] = 3;
    } else if (itemsCondition[y * field_size + x] === 3) {
      document
        .getElementById(x + y * field_size)
        .setAttribute("style", "background-position: 0px -50px");
      itemsCondition[y * field_size + x] = 0;
    }
  }

  let [field] = useState(() => createField(field_size, 0));

  return (
    <div className="field">
      {cellArray.map((_, y) => {
        return (
          <div key={y}>
            {cellArray.map((_, x) => {
              return (
                <div
                  key={x}
                  id={x + y * field_size}
                  className="field__cell"
                  onMouseDown={(e) => {
                    if (e.button === 0) {
                      setOnMousePush(true);
                    } else if (
                      e.button === 2 &&
                      itemsCondition[y * field_size + x] === 3
                    ) {
                      document
                        .getElementById(x + y * field_size)
                        .setAttribute(
                          "style",
                          "background-position: -68px -50px"
                        );
                    }
                  }}
                  onClick={() => {
                    setOnMousePush(false);
                    if (isStarted() === false) {
                      field = generateField(field, x, y);
                      setOnMouseClick(true);
                    }
                    updateBGAndCondition(x, y);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFlagOrQuestion(x, y);
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Field;
