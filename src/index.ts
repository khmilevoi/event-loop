import { Engine } from "engine";

const main = () => {
  const engine = new Engine();
  engine.run();

  let index = 0;

  const log = engine.createFunction((text: string) => {
    console.log(`${index++}: ${text}`);
  });

  const root = engine.createFunction(() => {
    engine.callFunction(log, "1");

    engine.callFunction(log, "2");

    engine.setTimeout(() => {
      engine.callFunction(log, "3");

      engine.setTimeout(() => {
        engine.callFunction(log, "4");

        engine.callFunction(log, "-------------");
      }, 2000);
    }, 3000);

    engine.callFunction(log, "5");
  });

  engine.callFunction(root);

  engine.setTimeout(() => {
    engine.callFunction(root);
  }, 10000);

  setTimeout(() => {
    engine.callFunction(log, "6");
  }, 20000);
};

main();
