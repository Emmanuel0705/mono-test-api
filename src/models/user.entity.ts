import { Schema, model } from "mongoose";

export interface UserType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new Schema<UserType>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const User = model<UserType>("user", userSchema);
