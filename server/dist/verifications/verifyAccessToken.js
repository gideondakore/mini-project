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
Object.defineProperty(exports, "__esModule", { value: true });
const GOOGLE_TOKEN_INFO_URL = process.env.GOOGLE_TOKEN_INFO_URL;
const verifyAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verify_access_token_response = yield fetch(`${GOOGLE_TOKEN_INFO_URL}?access_token=${token}`);
        const verify_access_token_data = yield verify_access_token_response.json();
        return { verify_access_token_data, verify_access_token_response };
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = verifyAccessToken;
