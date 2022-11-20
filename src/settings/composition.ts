import { container } from "../composition";
import { Settings } from "./types";
import { settings } from "./implementation";

container.registerSingleton<Settings>(() => settings);
