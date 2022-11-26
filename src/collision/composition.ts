import { container } from "../composition";
import { Collision } from "./types";
import { GameCollision } from "./implementation";

container.registerSingleton<Collision, GameCollision>();
