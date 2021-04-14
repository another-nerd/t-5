import React from "react";
import * as classes from "./TextField.module.css";

interface props {
  labelText: string;
  placeholder?: string;
  setTask(task: { title: string; hasDeleted: boolean; addedOn: Date }): void;
}

export function TextField(props: props) {
  const [text, setText] = React.useState<string>("");

  return (
    <>
      <label className={classes.label}>
        <span>{props.labelText}</span>

        <div>
          <input
            type="text"
            value={text}
            placeholder={props.placeholder}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          {text && (
            <button
              onClick={() => {
                props.setTask({
                  title: text,
                  hasDeleted: false,
                  addedOn: new Date(),
                });

                setText("");
              }}
            >
              Add
            </button>
          )}
        </div>
      </label>
    </>
  );
}
