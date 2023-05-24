import React from "react";
import "./Square.css";
import type { SquareValue } from "./App";
import { FaTimes } from "react-icons/fa";
import { CgShapeCircle } from "react-icons/cg";

type SquareProps = {
  value: SquareValue;
  dimension: number;
  click: () => void;
  inLine: boolean;
};

function Square(props: SquareProps) {
  return (
    <div
      className="Square"
      onClick={props.click}
      style={{
        background: props.inLine
          ? props.value === "X"
            ? "rgb(240, 186, 186)"
            : "rgb(187, 187, 230)"
          : "",
        width: "calc(25vh / " + props.dimension + ")",
        height: "calc(25vh / " + props.dimension + ")",
      }}
    >
      {props.value === "X" ? (
        <FaTimes
          className="X"
          style={{ fontSize: "calc(20vh / " + props.dimension + ")" }}
        />
      ) : props.value === "O" ? (
        <CgShapeCircle
          className="O"
          style={{ fontSize: "calc(20vh / " + props.dimension + ")" }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Square;
