import Header from "./components/Header";
import Task from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  //fetch dats from taskjs
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:8080/tasks");
    const data = await res.json();

    return data;
  };


    //fetch dats from taskjs
    const fetchTasksb = async (id) => {
      const res = await fetch(`http://localhost:8080/tasks/${id}`);
      const data = await res.json();
  
      return data;
    };


  const [tasks, setTasks] = useState([]);

  //delete tasks
  const deleteTaskOld = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    console.log("porran ", id);
  };

  //toggle reminder
  const toggleReminder = async (id) => {
    const taksToTofggle = await fetchTasksb(id) 

    const updatedTask ={...taksToTofggle, reminder : !taksToTofggle.reminder}

    const res = await fetch(`http://localhost:8080/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    const datsa = await res.json();
    

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  //Add task
  const addTask = async (task) => {

  
    const res = await fetch("http://localhost:8080/tasks", {
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data =await  res.json()

    //update tasks with the existennts plus the new 
    setTasks([...tasks, data])

    // console.log(task);
    // const id = Math.floor(Math.random() * 10000) + 1;

    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      {showAddTask && <AddTask onAdd={addTask} />}

      {tasks.length > 0 ? (
        <Task tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No tasks "
      )}
    </div>
  );
}

export default App;
