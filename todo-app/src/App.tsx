import React from "react";
import { TextField } from "./components/TextField";
import { TaskRenderer } from "./components/TaskRenderer";

interface ITasks {
  title: string;
  hasDeleted: boolean;
  addedOn: Date;
}

export function App() {
  const [allTasks, setAllTasks] = React.useState<ITasks[]>(
    getTasksFromLocalStorage()
  );

  function addTask(task: ITasks) {
    setAllTasks([task, ...(allTasks || [])]);
  }

  React.useEffect(() => {
    // save to localStorage
    const taskStr = JSON.stringify(allTasks || []);
    localStorage.setItem("tasks", taskStr);
  }, [allTasks]);

  return (
    <div style={{ padding: "1rem", maxWidth: "50rem", margin: "auto" }}>
      <h3 style={{ margin: '0.3rem 0 1.5rem 0' }}>Get Things Done</h3>

      <TextField
        labelText="Add Something"
        placeholder="start typing..."
        setTask={addTask}
      />

      <div style={{ marginTop: "2rem" }}>
        {allTasks &&
          Array.isArray(allTasks) &&
          allTasks.map((val, i) => (
            <TaskRenderer
              key={i}
              title={val.title}
              addedOn={`${new Date(val.addedOn).getHours()}:${new Date(
                val.addedOn
              ).getMinutes()}`}
              hasDeleted={val.hasDeleted}
              onDelete={() => {
                const tasks = [...(allTasks || [])];
                tasks[i] = { ...tasks[i], hasDeleted: true };

                setAllTasks(tasks);
              }}
            />
          ))}
      </div>
    </div>
  );
}

function getTasksFromLocalStorage(): ITasks[] {
  try {
    return JSON.parse(localStorage.getItem("tasks"));
  } catch (err) {
    console.log(`error parsing localStorage item`, err.message);
    return [];
  }
}
