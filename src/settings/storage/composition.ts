import { container } from "../../composition";
import { Storage } from "./types";
import { GameStorage } from "./implementation";

container.registerSingleton<Storage, GameStorage>();
