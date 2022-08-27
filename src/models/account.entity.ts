import { Schema, model } from "mongoose";

export interface AccountType {
    user: Schema.Types.ObjectId;
    accountId: string;
    balance: number;
    bankName: string;
    bankLogo: string;
}

const accountSchema = new Schema<AccountType>({
    user: { type: Schema.Types.ObjectId, ref: "user" },
    accountId: String,
    balance: Number,
    bankName: String,
    bankLogo: String,
});

export const Account = model<AccountType>("account", accountSchema);
