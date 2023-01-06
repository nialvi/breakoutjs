import { container } from "../../composition";
import { EndRoom } from "./types";
import { EndLevel } from "./implementation";

container.registerSingleton<EndRoom, EndLevel>();
