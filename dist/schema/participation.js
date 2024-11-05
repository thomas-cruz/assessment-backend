"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParticipation = void 0;
const zod_1 = require("zod");
const validateParticipation = (data) => {
    const schema = zod_1.z.object({
        firstName: zod_1.z.string().min(2).max(50),
        lastName: zod_1.z.string().min(2).max(50),
        percentage: zod_1.z.number().min(0).max(100),
    });
    return schema.parseAsync(data);
};
exports.validateParticipation = validateParticipation;
