import { container } from "../../composition";
import { TouchInput } from "./types";
import { TouchScreen } from "./implementation";

container.registerSingleton<TouchInput, TouchScreen>();
