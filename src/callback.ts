export type Func<Args extends any[] = never, Return = void> = (
  ...args: Args
) => Return;

export class Callback<Args extends any[]> {
  constructor(private readonly func: Func<Args>) {}

  call(...args: Args) {
    return this.func(...args);
  }
}
