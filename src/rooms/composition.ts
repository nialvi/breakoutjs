import { container } from "../composition";
import { RoomsController } from "./types";
import { Rooms } from "./implementation";

container.registerSingleton<RoomsController, Rooms>();
