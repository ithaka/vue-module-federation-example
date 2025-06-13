import { mount } from "../bootstrap";

const mountInIsolation = (isolationMountPoint) => {
  mount(isolationMountPoint);
};

const isolationMountPoint = document.getElementById(`_dev-vue-versiontest-v1`);
if (isolationMountPoint) {
  mountInIsolation(isolationMountPoint);
}
