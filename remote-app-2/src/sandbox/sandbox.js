import { mount } from "../bootstrap";

const mountInIsolation = (isolationMountPoint) => {
  mount(isolationMountPoint);
};

const isolationMountPoint = document.getElementById(`_dev-vue-versiontest-v2`);
if (isolationMountPoint) {
  mountInIsolation(isolationMountPoint);
}
