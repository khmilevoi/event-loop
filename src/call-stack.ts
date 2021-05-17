import { Call } from "call";
import { Stack } from "stack";

export class CallStack {
  private readonly stack = new Stack<Call<any>>();

  push(call: Call<any>) {
    this.stack.push(call);

    call.call();

    this.stack.pop();

    return call;
  }
}
