import common from "./common.json";
import home from "./home.json";
import schedule from "./schedule.json";
import about from "./about.json";
import training from "./training.json";
import trainingHr from "./training-hr.json";

const messages = { common, home, schedule, about, training: { ...training, hr: trainingHr } };

export default messages;
