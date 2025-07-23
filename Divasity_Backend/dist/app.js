"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = require("body-parser");
const morgan_1 = __importDefault(require("morgan"));
const database_1 = require("./config/database");
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
// Load Swagger YAML file
const swaggerDocument = js_yaml_1.default.load(fs_1.default.readFileSync(path_1.default.join(__dirname, 'swagger.yaml'), 'utf8'));
// Swagger setup
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get("/", (req, res) => {
    res.send("Hello Divasity");
});
app.use("/api", indexRoutes_1.default);
database_1.database.sync({}).then(() => {
    console.log("Database is Connected Successfully");
}).catch((err) => {
    console.log(err);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
exports.default = app;
