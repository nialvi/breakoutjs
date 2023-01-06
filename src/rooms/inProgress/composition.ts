import { container } from "../../composition";
import { InProgressRoom } from "./types";
import { InProgressLevel } from "./implementation";

container.registerSingleton<InProgressRoom, InProgressLevel>();
