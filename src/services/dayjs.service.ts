import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class DayjsService {
    public previousDay(day: number): Dayjs {
        return dayjs().utc().subtract(day, "day");
    }
    public currentTime(): Dayjs {
        return dayjs().utc();
    }
}

export const dayjsService = new DayjsService();