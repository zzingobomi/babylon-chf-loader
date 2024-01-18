import { Managers } from "./managers/Managers";
export * from "@src/core";

export class App {
  instance = Managers.Instance;
}

new App();
