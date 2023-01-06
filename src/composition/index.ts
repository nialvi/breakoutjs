import { container } from "./core";

import "../settings/composition";
import "../settings/storage/composition";
import "../settings/gui/composition";
import "../app/composition";
import "../dom/composition";
import "../graphics/context/composition";
import "../graphics/drawer/composition";
import "../ball/composition";
import "../collision/composition";
import "../paddle/composition";
import "../input/composition";
import "../input/keyboard/composition";
import "../input/gamepad/composition";
import "../input/touch/composition";
import "../eventListener/composition";
import "../bricks/composition";
import "../rooms/start/composition";
import "../rooms/inProgress/composition";
import "../rooms/end/composition";
import "../rooms/composition";
import "../walls/composition";

container.registerSingleton<Window>(() => window);

export { container };
