import { Module } from "vuex";

import { actions } from "./impl_actions";
import { mutations } from "./impl_mutations";
import { state } from "./impl_state";
import { NotificationsModule as Me } from "./NotificationsModule";

export namespace NotificationsModuleImpl {
    export const module: Module<Me.State, any> = {
        state,
        mutations,
        actions,
    };
}
