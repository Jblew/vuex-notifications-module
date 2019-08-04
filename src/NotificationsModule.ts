// tslint:disable:max-classes-per-file

import ow from "ow";
import { CombinedVueInstance } from "vue/types/vue";
import { Action as VuexAction, ActionContext as VuexActionContext, Dispatch } from "vuex";

import { ow_catch } from "./util";

type ActionFn = VuexAction<NotificationsModule.State, NotificationsModule.State>;
type ActionContext = VuexActionContext<NotificationsModule.State, NotificationsModule.State>;

export namespace NotificationsModule {
    export const modulePathName = "notifications";
    export function localName(name: string) {
        return modulePathName + "_" + name;
    }

    /**
     * State
     */
    export interface State {
        notifications: CommitedNotification[];
    }

    export namespace State {
        export function validate(state: State) {
            ow(
                state.notifications,
                "state.notifications",
                ow.array.ofType(
                    ow.object.is(v => ow_catch(() => CommitedNotification.validate(v as CommitedNotification))),
                ),
            );
        }
    }

    /**
     * Actions
     */
    export namespace Actions {
        export namespace Initialize {
            export const name = localName("initialize");
            export type Declaration = ActionFn & ((c: ActionContext) => void);

            export function dispatch(dispatchFn: Dispatch) {
                return dispatchFn(name);
            }
        }

        export namespace ShowNotification {
            export const name = localName("showNotification");
            export type Payload = Notification;
            export type Declaration = ActionFn & ((c: ActionContext, payload: Payload) => void);

            export function dispatch(dispatchFn: Dispatch, payload: Payload) {
                return dispatchFn(name, payload);
            }
        }
    }

    /**
     * Getters
     */
    export class Getters {}

    /**
     * Notification
     */
    export interface Notification {
        message: string;
        timeoutMs: number;
        params: any;
    }

    export namespace Notification {
        export function validate(n: Notification) {
            ow(n.message, "Notification.message", ow.string.nonEmpty);
            ow(n.timeoutMs, "Notification.timeoutMs", ow.number.integer.finite.positive);
        }
    }

    /**
     * CommitedNotification
     */
    export interface CommitedNotification {
        message: string;
        timestampGoneMs: number;
        params: any;
    }

    export namespace CommitedNotification {
        export function validate(n: CommitedNotification) {
            ow(n.message, "CommitedNotification.message", ow.string.nonEmpty);
            ow(n.timestampGoneMs, "CommitedNotification.timestampGoneMs", ow.number.integer.finite.positive);
        }
    }

    /**
     * State tye guard
     */
    export function stateOf(vueInstance: CombinedVueInstance<any, any, any, any, any>): State {
        return vueInstance.$store.state[modulePathName];
    }
}
