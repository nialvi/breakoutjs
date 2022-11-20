import { container } from "./composition/core";

container.registerSingleton<Window>(() => window);

console.log(container);
