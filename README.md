# vuex-notifications-module

Modern type-safe notifications module for vuex 3

## Usage

**1. Install**

```bash
$ npm install --save vuex-notifications-module
```

**2. Define store types: `Store.ts`**

```typescript
import { NotificationsModule } from "vuex-notifications-module";

export interface Store {
    state: Store.State;
    dispatch: Dispatch;
    commit: Commit;
    getters: any;
}

export namespace Store {
    export interface Modules {
        // ...
        [NotificationsModule.modulePathName]: Module<NotificationsModule.State, RootStore.State>;
    }

    export type State = {
        // ...
        [NotificationsModule.modulePathName]: NotificationsModule.State;
    } & RootStore.State;
}
```

**3. Create store implementation: `StoreImpl.ts`**

```typescript
import { NotificationsModuleImpl } from "vuex-notifications-module";
import { Store } from "./Store";

export namespace StoreImpl {
    const modules: Store.Modules & ModuleTree<RootStore.State> = {
        // ...
        [NotificationsModule.modulePathName]: NotificationsModuleImpl.module,
    };

    export const store = new Vuex.Store<RootStore.State>({
        ...RootStoreImpl.store,
        modules,
    });
}
```

**4. Import vuex store in main: `main.ts`**

```typescript
export default () =>
    new Vue({
        // ...
        store: StoreImpl.store,
    });
```

**5. Somewhere in your app: send notification**

```typescript
export function showNotification(
    vue: CombinedVueInstance<any, any, any, any, any>,
    notification: NotificationsModule.Notification,
) {
    NotificationsModule.Actions.ShowNotification.dispatch(vue.$store.dispatch, notification);
}
```

**6. Sample utilizing component: `NotificationsSnackbar.vue` using vuetify v-snackbar**

```html
<template>
    <div>
        <v-snackbar v-model="opened" :color="this.color">{{ message }}</v-snackbar>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { NotificationsModule } from "vuex-notifications-module";

    export default Vue.extend({
        computed: {
            opened(): boolean {
                return NotificationsModule.stateOf(this).notifications.length > 0;
            },
            message(): string {
                const message = this.opened ? NotificationsModule.stateOf(this).notifications[0].message : "";
                return message;
            },
            params(): any {
                return this.opened ? NotificationsModule.stateOf(this).notifications[0].params : {};
            },
            color(): string | undefined {
                return this.params.color || undefined;
            },
        },
    });
</script>
```
