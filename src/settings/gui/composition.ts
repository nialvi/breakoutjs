import { container } from "../../composition";
import { GUI } from "./types";
import { GUISettings } from "./implements";

container.registerSingleton<GUI, GUISettings>();
