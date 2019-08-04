import { NotificationsModule as Me } from "./NotificationsModule";

export const state: Me.State = {
    notifications: [],
};

Me.State.validate(state);
