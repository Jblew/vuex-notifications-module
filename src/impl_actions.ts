import { ActionTree } from "vuex";

import { Mutations } from "./Mutations";
import { NotificationsModule as Me } from "./NotificationsModule";
import { PrivateActions } from "./PrivateActions";

/**
 *
 * Actions implementation
 */
const showNotification: Me.Actions.ShowNotification.Declaration = ({ commit, state }, payload: Me.Notification) => {
    Me.Notification.validate(payload);

    const commitedNotification: Me.CommitedNotification = {
        message: payload.message,
        timestampGoneMs: Date.now() + payload.timeoutMs,
        params: payload.params || {},
    };

    const newNotifications = [...state.notifications, commitedNotification];
    Mutations.SetNotifications.commit(commit, { notifications: newNotifications });
};

const initialize: Me.Actions.Initialize.Declaration = ({ dispatch }): void => {
    setInterval(() => {
        PrivateActions.RemoveTimedOut.dispatch(dispatch);
    }, 500);
};

const removeTimedOut: PrivateActions.RemoveTimedOut.Declaration = ({ commit, state }): void => {
    const filteredNotifications = state.notifications.filter(n => n.timestampGoneMs > Date.now());
    if (filteredNotifications.length !== state.notifications.length) {
        Mutations.SetNotifications.commit(commit, { notifications: filteredNotifications });
    }
};

/**
 *
 * Type safe definitions and export
 */
export const actions: ActionTree<Me.State, Me.State> = {
    [Me.Actions.ShowNotification.name]: showNotification,
    [Me.Actions.Initialize.name]: initialize,
    [PrivateActions.RemoveTimedOut.name]: removeTimedOut,
};
