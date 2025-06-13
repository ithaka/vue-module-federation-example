import {createApp, h, provide} from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import {DefaultApolloClient} from "@vue/apollo-composable";
import {notificationsClient} from "./vue-apollo";

const mount = async (mountPoint) => {
  const vueApp = createApp({
    name: "MfeVueVersionTestV2",
    setup() {
      provide(DefaultApolloClient, notificationsClient);
    },

    render: () => h(HelloWorld),
  })

  vueApp.mount(mountPoint);
};

export {mount};
