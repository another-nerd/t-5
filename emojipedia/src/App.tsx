import React from "react";
import emojiDict from "./emoji-data.json";
import * as classes from "./App.module.css";

export function App() {
  const [selectedEmoji, setSelectedEmoji] = React.useState<string>();

  return (
    <div style={{ padding: "1rem", maxWidth: "50rem", margin: "auto" }}>
      <h3 style={{ margin: "0.3rem 0 1.5rem 0" }}>EmojiPedia</h3>

      <div className={classes.emoji_desc}>{emojiDict[selectedEmoji]}</div>

      <div className={classes.container}>
        {Object.keys(emojiDict).map((val, i) => (
          <span
            key={i}
            onClick={() => setSelectedEmoji(val)}
            style={
              selectedEmoji === val
                ? { border: "2px solid lime", borderRadius: "0.4rem" }
                : {}
            }
          >
            {val.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}
