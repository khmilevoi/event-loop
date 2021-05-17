import { Callback } from "callback";

export class Call<Args extends any[]> {
  constructor(
    private readonly callback: Callback<Args>,
    private readonly args: Args
  ) {}

  call() {
    this.callback.call(...this.args);
  }
}
