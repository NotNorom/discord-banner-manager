enum CycleMethod {
    Static = 1,
    Random,
    Forward,
    Reverse,
}

export default class BannerSet {
    images: [String];
    cycleMethod: CycleMethod;
    cycleDuration: Number;
    cycleStart: Date;
    activeImage: Number;

    constructor(imageURLs: [String], cycleMethod: CycleMethod, cycleDuration: Number, cycleStart: Date) {
        this.images = imageURLs;
        this.cycleMethod = cycleMethod;
        this.cycleDuration = cycleDuration;
        this.cycleStart = cycleStart;
    }
}