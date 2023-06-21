import User from "./userModel.js";
import config from "../../core/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const createUser = async (data) => {
    let newUser = {};
    newUser = (({ name, lastname, email, phone, password }) => ({
        name,
        lastname,
        email,
        phone,
        password,
    }))(data);
    newUser.role = "USER";
    if (!data.password || data.password.length < 6 || data.password.length > 12)
        throw new Error("INVALID_PASSWORD");
    try {
        data.password = await bcrypt.hash(data.password, config.HASH_ROUNDS);
        const user = User.create(data);
        return user;
    }
    catch (err) {
        throw new Error("INVALID_CREDENTIALS");
    }
};
export const login = async (req) => {
    const user = await User.findOne({ email: req.body.email }).select("+password");
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
        throw new Error("INVALID_CREDENTIALS");
    const token = jwt.sign({ id: user?._id, role: user?.role, email: user.email, phone: user.phone }, config.SECRET);
    return { token };
};
export const findUser = async (id) => {
    return await User.findOne({ _id: id });
};
export const findUsers = async (username) => {
    const regex = new RegExp(username, 'i');
    return User.find({ name: regex });
};
export const findUserById = async (id, token) => {
    return token.role === "USER"
        ? User.findOne({ _id: token.id })
        : User.findOne({ _id: id });
};
export const findUsersByRole = async (role) => {
    const roleTag = role.toUpperCase();
    return User.find({ role: roleTag });
};
export const updateUser = async (data, token) => {
    if (data.password && (data.password.length < 6 || data.password.length > 12))
        throw new Error("INVALID_PASSWORD");
    if (data.password)
        data.password = await bcrypt.hash(data.password, config.HASH_ROUNDS);
    if (token.role !== "ADMIN") {
        return await User.findByIdAndUpdate({ _id: token.id }, {
            email: data.email,
            phone: data.phone,
            password: data.password,
        }, { new: true });
    }
    return await User.findOneAndUpdate({ email: data.email }, data, {
        new: true,
    });
};
//# sourceMappingURL=userControler.js.map