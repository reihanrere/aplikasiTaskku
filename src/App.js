import React, { useState } from 'react';
import {Button,Card,TextField,Grid} from '@mui/material';
import './App.css';

const Header = () => {
  return <h1>Aplikasi TaskKu</h1>
}

const InfoBar = ({taskNumber}) => {
  return <div>Ada {taskNumber} yang perlu dikerjakan</div>
}

const TaskAdder = ({setTasks, tasks}) => {
  const [currentValue, setCurrentValue] = useState('');

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      message: currentValue
    }
    setTasks([...tasks,newTask]);
    setCurrentValue('');
  }

  return <div>
    <Grid container spacing={2} columns={12}>
      <Grid item xs={8}>
        <TextField size="100px" id="standard-basic" label="Task" variant="standard" value={currentValue} onChange={event => setCurrentValue(event.target.value)} sx={{ pr: 2 }} />
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" component="span" sx={{ mt:1 }} disabled={currentValue === ''} onClick={() => handleAddTask()}>Tambah</Button>
      </Grid>
    </Grid>
  </div>
}

const Task = ({message, id, setTasks, tasks}) => {

  const handleDelete = () => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  return <div>
    <Grid container spacing={2} columns={12} sx={{ mt: 2 }}>
      <Grid item xs={8}>
        <div className="message">{message}</div>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" component="span" color="error" onClick={() => handleDelete()}>Delete</Button>
      </Grid>
    </Grid>
  </div>
}

const TaskList = ({tasks, setTasks}) => {
  return tasks.map(task => {
    return <Task message={task.message} id={task.id} setTasks={setTasks} tasks={tasks}/>
  });
}

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  return <>
    <Card className="container" variant="outlined" sx={{ mx: "auto", width: 350, p: 3, mt: 5, boxShadow: 3, borderRadius: 1 }}>
      <Header />
      <InfoBar taskNumber={tasks.length} />
      <TaskAdder setTasks={setTasks} tasks={tasks} />
      <TaskList tasks={tasks} setTasks={setTasks}/>
    </Card>
  </>
}

const App = () => {
  return <div>
    <TaskApp />
  </div>
}

export default App;