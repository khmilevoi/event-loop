export const nextTick = (callback: Function) => {
  return setImmediate(() => callback());
};
