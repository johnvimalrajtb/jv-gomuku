"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const connectDB_1 = __importDefault(require("./connectDB"));
const user_model_1 = __importDefault(require("../model/user.model"));
const session_model_1 = __importDefault(require("../model/session.model"));
const user_json_1 = __importDefault(require("../data/user.json"));
const sessions_json_1 = __importDefault(require("../data/sessions.json"));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connectDB_1.default)();
        yield user_model_1.default.deleteMany();
        yield user_model_1.default.insertMany(user_json_1.default);
        yield session_model_1.default.deleteMany();
        yield session_model_1.default.insertMany(sessions_json_1.default);
        console.log('Done');
        process.exit(0);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
});
run();
