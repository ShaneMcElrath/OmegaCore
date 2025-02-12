"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const XLSX = __importStar(require("xlsx"));
let file = null;
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("logButton");
    const fileInput = document.getElementById("fileInput");
    if (!button || !fileInput)
        return;
    button.addEventListener("click", () => {
        fileInput.click();
    });
    // When a file is selected, log its name
    fileInput.addEventListener("change", (event) => {
        var _a;
        const target = event.target;
        const file = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a;
            const result = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            if (!(result instanceof ArrayBuffer))
                return;
            const data = new Uint8Array(result);
            const workbook = XLSX.read(data, { type: "array" });
            // Assuming the first sheet is the one we need
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            // Convert sheet to an array of objects
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            console.log("Parsed Data:", jsonData); // Array of objects
        };
        reader.readAsArrayBuffer(file);
    });
});
