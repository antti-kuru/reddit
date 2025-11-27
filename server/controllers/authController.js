import { hash, verify } from "scrypt";
import * as authRepository from "../repositories/authRepository.js";
import * as jwt from "@hono/hono/jwt";

const JWT_SECRET = "jwt_secret";


const register = async (c) => {
    const user = await c.req.json();

    const message = `Confirmation email sent to address ${user.email}.`;
    try {
        user.password_hash = hash(user.password);
        await authRepository.create(user);
    } catch (err) {
    }

    return c.json({ message });
};


// ...

const login = async (c) => {
    const user = await c.req.json();

    const foundUser = await authRepository.findByEmail(user.email);
    if (!foundUser) {
        return c.json({ message: "Invalid email or password" });
    }

    const isValid = verify(user.password, foundUser.password_hash);
    if (!isValid) {
        return c.json({ message: "Invalid email or password" });
    }

    //const roles = await authRepository.getUserRoles(foundUser.id);
    const payload = { email: foundUser.email, id: foundUser.id };
    const token = await jwt.sign(payload, JWT_SECRET);

    return c.json({
        message: "Login successful",
        user: payload,
        token: token
    });
};

export { login, register };