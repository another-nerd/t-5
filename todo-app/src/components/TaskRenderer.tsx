import React from "react";
import * as classes from "./TaskRenderer.module.css";

interface IProps {
  title: string;
  addedOn: string;
  hasDeleted: boolean;
  onDelete(): void;
}

export function TaskRenderer(props: IProps) {
  return (
    <>
      <div className={classes.item_wrapper}>
        <div>
          <small>{props.addedOn}</small>
          <span
            style={
              props.hasDeleted
                ? { textDecoration: "line-through", color: "red" }
                : {}
            }
          >
            {props.title}
          </span>
        </div>
        <span onClick={props.onDelete} className={classes.btn}>
          ×
        </span>
      </div>
    </>
  );
}
