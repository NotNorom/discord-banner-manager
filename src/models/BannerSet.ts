import Image from "./Image";

type CycleMethod =
    | "forward"
    | "reverse"
    | "static"
    | "random-with-duplicates"
    | "random-without-duplicates";

export default class BannerSet {
    name: string;
    images: Image[];
    activeImage: Image;
    cycleMethod: CycleMethod;
    cycleDuration: Number;

    constructor(name: string, cycleMethod: CycleMethod, cycleDurationMinutes: Number) {
        this.name = name;
        this.images = [];
        this.cycleMethod = cycleMethod;
        this.cycleDuration = cycleDurationMinutes;
    }
}