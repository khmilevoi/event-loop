import { Call } from "call";
import { CallStack } from "call-stack";
import { TaskQueue } from "task-queue";
import { nextTick } from "utils/next-tick";

export class EventLoop {
  constructor(
    private readonly stack: CallStack,
    private readonly queue: TaskQueue
  ) {}

  run() {
    const loop = () => {
      nextTick(() => {
        this.tick();
        loop();
      });
    };

    loop();
  }

  private tick() {
    const first = this.queue.pop();

    if (first?.value.callback) {
      this.stack.push(new Call(first.value.callback, []));
    }
  }
}
