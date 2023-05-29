"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("./env");
const controllers_1 = require("./controllers");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const pwd = encodeURIComponent(process.env.DB_PASS);
const host = process.env.DB_HOST.replace('<password>', pwd);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.route('/schedule').get(controllers_1.getSchedules).post(controllers_1.addSchedule);
app.route('/schedule/:id').post(controllers_1.addRaid);
app.route('/schedule/:id/:raidId').delete(controllers_1.deleteSchedule).patch(controllers_1.updateRaid).post(controllers_1.addCrew);
app.route('/schedule/:id/:raidId/:crewId').delete(controllers_1.deleteCrew);
mongoose_1.default
    .connect(host, {
    serverSelectionTimeoutMS: 30000 // 30 seconds timeout
})
    .then(() => console.log('DB connection successful'));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map