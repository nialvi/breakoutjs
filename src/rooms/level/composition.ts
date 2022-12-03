import { container } from "../../composition";
import { LevelRoom } from "./types";
import { LevelDefault } from "./implementation";

container.registerSingleton<LevelRoom, LevelDefault>();
