import { container } from "../composition";
import { AppSettings } from "./types";
import { settings } from "./implementation";

container.registerSingleton<AppSettings>(() => settings);
