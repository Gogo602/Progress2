import fs from 'fs';

const filePath = "./tasks.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
    const tasks = loadTasks();
    console.log("Tasks:", tasks);
  tasks.push({ task });
  saveTasks(tasks);
  console.log("task added", task);
};

const listTasks = () => {
  const tasks = loadTasks();
  tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));
};

const removeTask = (indexToRemove) => {
  const tasks = loadTasks();
  const filteredTasks = tasks.filter((task, index) => index !== indexToRemove);
  if (tasks.length === filteredTasks.length) {
    console.log("Task not found.");
    return;
  }
  saveTasks(filteredTasks);
  console.log(`Task at index ${indexToRemove} removed.`);
};

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("command not found!11");
}