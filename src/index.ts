import { container } from "./composition";
import { Application } from "app";

const app = container.get<Application>();

app.start();
