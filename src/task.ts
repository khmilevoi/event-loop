import { Callback, Func } from "callback";
import { nextTick } from "utils/next-tick";

export interface TaskEntity {
  readonly callback: Callback<any>;

  start(callback: Func): void;
}

export class Task implements TaskEntity {
  constructor(
    public readonly callback: Callback<any>,
    private readonly rule: TaskRule
  ) {}

  start(callback: Func) {
    this.rule.start();

    const loop = () => {
      nextTick(() => {
        if (this.rule.isDone()) {
          callback();
        } else {
          loop();
        }
      });
    };

    loop();
  }
}

export interface TaskRule {
  isDone(): boolean;

  start(): void;
}

export class TimeoutTaskRule implements TaskRule {
  private startTime: number = 0;

  constructor(private readonly duration: number) {}

  start() {
    this.startTime = Date.now();
  }

  isDone(): boolean {
    const diff = Date.now() - this.startTime;

    return diff > this.duration;
  }
}
