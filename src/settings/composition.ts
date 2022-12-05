import { container } from "../composition";
import { Settings } from "./types";

import { getSettings } from "./implementation";
import { GameStorage } from "./storage/implementation";

const storage = new GameStorage(window);
const settings = getSettings(storage.getSettings());

container.registerSingleton<Settings>(() => settings);
