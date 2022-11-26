import { container } from "../composition";
import { Input } from "./types";
import { InputController } from "./implementation";

container.registerSingleton<Input, InputController>();
