import common from "./common.json";
import home from "./home.json";
import schedule from "./schedule.json";
import about from "./about.json";
import coaching from "./coaching.json";
import training from "./training.json";
import trainingHr from "./training-hr.json";
import trainingFinansy from "./training-finansy.json";
import trainingPravo from "./training-pravo.json";
import trainingLiderstvo from "./training-liderstvo.json";
import trainingNeftegaz from "./training-neftegaz.json";
import trainingAi from "./training-ai.json";

const messages = { common, home, schedule, about, coaching, training: { ...training, hr: trainingHr, finansy: trainingFinansy, pravo: trainingPravo, liderstvo: trainingLiderstvo, neftegaz: trainingNeftegaz, ai: trainingAi } };

export default messages;
