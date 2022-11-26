import { container } from "../composition";
import { PaddleShape } from "./types";
import { Paddle } from "./implementation";

container.registerSingleton<PaddleShape, Paddle>();
