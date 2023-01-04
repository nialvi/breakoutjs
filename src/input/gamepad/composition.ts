import { container } from "../../composition";
import { GamepadInput } from "./types";
import { Gamepad } from "./implementation";

container.registerSingleton<GamepadInput, Gamepad>();
