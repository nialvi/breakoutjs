import { container } from "../../composition";
import { KeyboardInput } from "./types";
import { Keyboard } from "./implementation";

container.registerSingleton<KeyboardInput, Keyboard>();
