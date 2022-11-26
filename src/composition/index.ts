import { container } from "./core";

import "../settings/composition";
import "../app/composition";
import "../dom/composition";
import "../graphics/context/composition";
import "../graphics/drawer/composition";
import "../ball/composition";
import "../collision/composition";
import "../paddle/composition";
import "../input/composition";
import "../eventListener/composition";

container.registerSingleton<Window>(() => window);

export { container };
