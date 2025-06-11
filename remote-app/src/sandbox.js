import { mount } from "./main"

const isolationMountPoint = document.getElementById(`_dev-remote-app`);
if (isolationMountPoint) {
  await mount(isolationMountPoint);
}