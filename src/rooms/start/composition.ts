import { container } from "../../composition";
import { StartRoom } from "./types";
import { StartLevel } from "./implementation";

container.registerSingleton<StartRoom, StartLevel>();
