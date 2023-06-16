import { Appointment } from "./model.js";
export const createAppointment = async (data, token) => {
    if (!data || !data.start || !data.end || !data.doctor || !data.client)
        throw new Error('MISSING_DATA');
    if (data.doctor !== token.id && data.client !== token.id && token.role !== 'ADMIN')
        throw new Error('NOT_AUTHORIZED');
    const overlap = await listAppointments(data.start, data.end, data.doctor);
    if (overlap.length)
        throw new Error("DUPLICATED_DATE");
    return Appointment.create(data);
};
export const listAppointments = async (start, end, id) => {
    const filter = { $and: [{ active: true }] };
    if (id)
        filter.$and.push({ $or: [{ client: id }, { doctor: id }] });
    if (start && !end)
        filter.$and.push({ end: { $gte: start } });
    if (end && !start)
        filter.$and.push(({ start: [{ $lte: end }] }));
    if (start && end)
        filter.$and.push({ end: { $gte: start } }, { start: { $lte: end } });
    return Appointment.find(filter);
};
export const updateAppointment = async (appID, data, token) => {
    const appointment = await Appointment.findOne({ _id: appID });
    if (!appointment)
        throw new Error('NOT_FOUND');
    if ((token.id !== appointment.client || token.id !== appointment.doctor) && token.role !== 'ADMIN')
        throw new Error('NOT_AUTHORIZED');
    const updatedValues = (({ start, end, doctor }) => ({ start, end, doctor }))(data);
    const overlap = await listAppointments(data.start, data.end, data.doctor);
    if (overlap.length)
        throw new Error('DUPLICATED_DATE');
    return Appointment.findOneAndUpdate({ appID }, updatedValues, { new: true });
};
export const deleteAppointment = async (appID, token) => {
    const appointment = await Appointment.findOne({ _id: appID });
    if (!appointment)
        throw new Error('NOT_FOUND');
    if (token.id !== appointment.client && token.role !== 'ADMIN')
        throw new Error('NOT_AUTHORIZED');
    return Appointment.updateOne(appID, { active: false });
};
//# sourceMappingURL=controller.js.map