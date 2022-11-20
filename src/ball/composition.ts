import { container } from "../composition";
import { BallShape } from "./types";
import { Ball } from "./implementation";

container.registerSingleton<BallShape, Ball>();
