import { EventListener } from "eventListener";
import { EndRoom } from "./end";
import { InProgressRoom } from "./inProgress";
import { StartRoom } from "./start";
import { RoomsController } from "./types";

export class Rooms implements RoomsController {
  private state: "start" | "inProgress" | "end" = "start";

  constructor(
    private startRoom: StartRoom,
    private inProgressRoom: InProgressRoom,
    private endRoom: EndRoom,
    private eventListener: EventListener
  ) {
    this.eventListener.on("startGame", () => {
      this.state = "inProgress";
    });

    this.eventListener.on("endGame", () => {
      this.state = "end";
    });
  }

  draw() {
    switch (this.state) {
      case "start": {
        this.startRoom.draw();
        break;
      }

      case "inProgress": {
        this.inProgressRoom.draw();
        break;
      }

      case "end": {
        this.endRoom.draw();
        break;
      }

      default:
        break;
    }
  }
}
