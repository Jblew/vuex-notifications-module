import { Commit, Mutation as VuexMutation } from "vuex";

import { NotificationsModule as Me } from "./NotificationsModule";

type MutationFn = VuexMutation<Me.State>;

export namespace Mutations {
    export namespace SetNotifications {
        export const name = Me.localName("setNotifications");

        export interface Payload {
            notifications: Me.CommitedNotification[];
        }
        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }
}
