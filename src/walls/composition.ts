import { container } from "../composition";
import { WallsShape } from "./types";
import { Walls } from "./implementation";

container.registerSingleton<WallsShape, Walls>();
