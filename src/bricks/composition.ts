import { container } from "../composition";
import { BricksShape } from "./types";
import { Bricks } from "./implementation";

container.registerSingleton<BricksShape, Bricks>();
