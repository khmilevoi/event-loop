import { Engine } from "engine";

const main = () => {
  const engine = new Engine();
  engine.run();

  const log = engine.createFunction((...args) => {
    console.log(...args);
  });

  const root = engine.createFunction(() => {
    engine.callFunction(log, 1);

    engine.callFunction(log, 2);

    engine.setTimeout(() => {
      engine.callFunction(log, 3);

      engine.setTimeout(() => {
        engine.callFunction(log, 4);

        engine.callFunction(log, "-------------");
      }, 2000);
    }, 3000);

    engine.callFunction(log, 5);
  });

  engine.callFunction(root);

  engine.setTimeout(() => {
    engine.callFunction(root);
  }, 10000);
};

main();
