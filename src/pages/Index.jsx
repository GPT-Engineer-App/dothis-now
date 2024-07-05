import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = () => {
    if (taskName.trim()) {
      setTasks([...tasks, { name: taskName, completed: false }]);
      setTaskName("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
      </header>
      <div className="mb-4 flex items-center space-x-2">
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add a new task"
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <Card key={index} className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(index)}
              />
              <span className={task.completed ? "line-through" : ""}>{task.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedTask(task)}>
                    Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Task Details</DialogTitle>
                  </DialogHeader>
                  <div>
                    <p><strong>Name:</strong> {selectedTask?.name}</p>
                    <p><strong>Description:</strong> {selectedTask?.description || "No description"}</p>
                    <p><strong>Due Date:</strong> {selectedTask?.dueDate || "No due date"}</p>
                    <p><strong>Priority:</strong> {selectedTask?.priority || "No priority"}</p>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="icon" onClick={() => deleteTask(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;