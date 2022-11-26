import { container } from "../composition";
import { EventListener } from "./types";
import { Listener } from "./implementation";

container.registerSingleton<EventListener, Listener>();
