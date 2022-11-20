import { container } from "../composition";
import { Application } from "./types";
import { App } from "./implementation";

container.registerSingleton<Application, App>();
