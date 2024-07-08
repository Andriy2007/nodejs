import {IPost} from "../interfaces/post.interface";
import {privateBankService} from "../services/privatBank.service";
import {CurrencyEnum} from "../enums/currency.enum";


class PostPresenter {
    public async present(data: IPost): Promise<Partial<IPost>> {

        const exchangeRates = await privateBankService.getExchangeRates();

        const currencyRates = exchangeRates.find(
            ({ ccy }) => ccy === data.currency,
        );
        const buy = currencyRates?.buy ? +currencyRates.buy : 1;
        return {
            currency: CurrencyEnum.UAH,
            price: data.price * buy,
            year: data.year,
            _id: data._id,
            _userId: data._userId,
            model: data.model,
            city: data.city,
        };
    }

    public presents(data: IPost[]): Partial<IPost[]> {
        const posts = data.map((item) => ({
            currency: item.currency,
            _id: item._id,
            _userId: item._userId,
            model: item.model,
            city: item.city,
            price: item.price,
            year: item.year,
        }));

        return posts as Partial<IPost[]>;
    }
}
export const postPresenter = new PostPresenter();
