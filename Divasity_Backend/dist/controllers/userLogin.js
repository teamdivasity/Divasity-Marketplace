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
exports.userLogin = void 0;
const User_1 = __importDefault(require("../models//User"));
const password_1 = require("../services/password");
const token_1 = require("../services/token");
const userLogin = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        //Validate user exists by email 
        const user = yield User_1.default.findOne({ where: { email } });
        //Handle Invalid email
        if (!user) {
            response.status(400).json({ error: true, message: "Invalid email" });
            return;
        }
        //Validate provided password with the stored hashed password
        const validatepassword = yield (0, password_1.verifyPassword)(password, user.password);
        //Handle Incorrect password
        if (!validatepassword) {
            response.status(400).json({
                error: true,
                message: "Incorrect Password"
            });
            return;
        }
        const userInfo = {
            id: user.id,
            email: user.email,
            telephone: user.telephone,
            role: user.role
        };
        const token = (0, token_1.generateToken)(userInfo);
        response.status(200).json({
            error: false,
            message: "User login Successfully",
            token
        });
    }
    catch (error) {
        response.status(500).json({
            error: false,
            message: "Internal Server error",
            errorMessage: error.message
        });
    }
});
exports.userLogin = userLogin;
