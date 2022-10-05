import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import BaseError from "./components/base/BaseError.vue";

import "./assets/style.scss";

const app = createApp(App);

app.use(store);
app.component("BaseError", BaseError);

app.mount("#app");
