import { Task } from "task";
import { TaskQueue } from "task-queue";

export class Heap {
  constructor(private readonly queue: TaskQueue) {}

  add(task: Task) {
    task.start(() => {
      this.queue.push(task);
    });
  }
}
