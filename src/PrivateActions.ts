import { Action as VuexAction, ActionContext as VuexActionContext, Dispatch } from "vuex";

import { NotificationsModule as Me } from "./NotificationsModule";

type ActionFn = VuexAction<Me.State, Me.State>;
type ActionContext = VuexActionContext<Me.State, Me.State>;

export namespace PrivateActions {
    export namespace RemoveTimedOut {
        export const name = Me.localName("removeTimedOut");

        export type Declaration = ActionFn & ((c: ActionContext) => void);

        export function dispatch(dispatchFn: Dispatch) {
            return dispatchFn(name);
        }
    }
}
