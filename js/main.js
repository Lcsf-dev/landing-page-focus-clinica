import { initializeMenu } from "./menu.js";
import { initializeDemoTabs } from "./demo-tabs.js";
import { initializeImageViewer } from "./image-viewer.js";
import { initializeRevealAnimations } from "./reveal-animations.js";
import { initializeTeamProfiles } from "./team/team-profiles.js";

document.documentElement.classList.add("js");

initializeMenu();
initializeDemoTabs();
initializeImageViewer();
initializeRevealAnimations();
initializeTeamProfiles();
