import { Request, Response } from "express";
import Mono from "../../lib/mono";
import { AccountType, Account } from "../../models/account.entity";
import { getBankkLogo } from "../../utils";

const mono = new Mono();

class AccountController {
    public async linkAccount(req: Request, res: Response) {
        const { code } = req.body;
        const userId = (req as any).user._id;

        const id = await mono.exchangeToken(code);

        const { account } = await mono.getAccount(id);
        const { _id, institution, balance } = account;
        const logo = getBankkLogo(institution.bankCode);

        const data = await Account.create({
            user: userId,
            accountId: _id,
            balance,
            bankName: institution.name,
            bankLogo: logo,
        });

        res.status(200).json({
            status: "SUCCESS",
            data,
        });
    }

    public async unLinkAccount(req: Request, res: Response) {
        const { accountId } = req.body;

        const unlink = await mono.unlinkAccount(accountId);
        await Account.deleteOne({ accountId });

        res.status(200).json({
            status: "SUCCESS",
        });
    }

    public async getAccounts(req: Request, res: Response) {
        const userId = (req as any).user._id;

        const accounts = await Account.find({ user: userId });

        res.status(200).json({
            status: "SUCCESS",
            accounts,
        });
    }

    public async getTransactions(req: Request, res: Response) {
        const { id } = req.params;
        const trx = await mono.getTransactions(id);

        res.status(200).json({
            status: "SUCCESS",
            data: {
                trx,
            },
        });
    }
}

export default AccountController;

//task
//check if user already found
