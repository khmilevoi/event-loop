import { Call } from "call";
import { CallStack } from "call-stack";
import { Callback, Func } from "callback";
import { EventLoop } from "event-loop";
import { Heap } from "heap";
import { TimeoutTaskRule, Task } from "task";
import { TaskQueue } from "task-queue";

export class Engine {
  private readonly queue = new TaskQueue();
  private readonly heap = new Heap(this.queue);
  private readonly stack = new CallStack();
  private readonly loop = new EventLoop(this.stack, this.queue);

  createFunction<Args extends any[]>(func: Func<Args>) {
    return new Callback(func);
  }

  callFunction<Args extends any[]>(callback: Callback<Args>, ...args: Args) {
    this.stack.push(new Call(callback, args));
  }

  setTimeout(func: Func<any>, ms: number) {
    const callback = new Callback(func);

    const timeout = new Callback(() => {
      const task = new Task(callback, new TimeoutTaskRule(ms));

      this.heap.add(task);
    });

    this.callFunction(timeout);
  }

  run() {
    this.loop.run();
  }
}
