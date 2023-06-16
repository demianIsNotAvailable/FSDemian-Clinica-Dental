import mongoose from "mongoose";
export const Appointment = mongoose.model("Appointment", new mongoose.Schema({
    client: {
        type: String,
        required: true,
        ref: "User",
    },
    doctor: {
        type: String,
        required: true,
        ref: "User",
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true
    }
}));
//# sourceMappingURL=model.js.map