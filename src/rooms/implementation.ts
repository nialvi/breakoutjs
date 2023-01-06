import { EventListener } from "eventListener";
import { EndRoom } from "./end";
import { InProgressRoom } from "./inProgress";
import { StartRoom } from "./start";
import { RoomsController } from "./types";

export class Rooms implements RoomsController {
  private state: {
    type: "start" | "inProgress" | "end";
    isNeedInited: boolean;
  };

  constructor(
    private startRoom: StartRoom,
    private inProgressRoom: InProgressRoom,
    private endRoom: EndRoom,
    private eventListener: EventListener
  ) {
    this.state = {
      type: "start",
      isNeedInited: true,
    };

    this.eventListener.on("startGame", () => {
      this.state = {
        type: "inProgress",
        isNeedInited: true,
      };
    });

    this.eventListener.on("endGame", () => {
      this.state = {
        type: "end",
        isNeedInited: true,
      };
    });

    this.eventListener.on("start", () => {
      this.state = {
        type: "inProgress",
        isNeedInited: true,
      };
    });
  }

  draw() {
    switch (this.state.type) {
      case "start": {
        if (this.state.isNeedInited) {
          this.startRoom.init();
          this.state.isNeedInited = false;
        }

        this.startRoom.draw();
        break;
      }

      case "inProgress": {
        if (this.state.isNeedInited) {
          this.startRoom.destroy();
          this.inProgressRoom.init();
          this.state.isNeedInited = false;
        }

        this.inProgressRoom.draw();
        break;
      }

      case "end": {
        if (this.state.isNeedInited) {
          this.inProgressRoom.destroy();
          this.endRoom.init();
          this.state.isNeedInited = false;
        }

        this.endRoom.draw();
        break;
      }

      default:
        break;
    }
  }
}
