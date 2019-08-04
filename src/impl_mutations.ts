import ow from "ow";
import { MutationTree } from "vuex";

import { Mutations } from "./Mutations";
import { NotificationsModule as Me } from "./NotificationsModule";

const setNotifications: Mutations.SetNotifications.Declaration = (
    state: Me.State,
    payload: { notifications: Me.CommitedNotification[] },
) => {
    ow(payload.notifications, "payload.notifications", ow.array);

    state.notifications = [...payload.notifications];

    Me.State.validate(state);
};

export const mutations: MutationTree<Me.State> = {
    [Mutations.SetNotifications.name]: setNotifications,
};
