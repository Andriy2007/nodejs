import axios from "axios";

import { configs } from "@typescript-eslint/eslint-plugin";
import { IExchangeRate } from "../interfaces/exchangeRate";

class PrivateBankService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = configs.PRIVATE_BANK_API;
    }
    public async getExchangeRates(): Promise<IExchangeRate[]> {
        try {
            const response = await axios.get(this.apiUrl);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const privateBankService = new PrivateBankService();