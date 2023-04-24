export declare class ProgressReporter {
    private start;
    private end;
    private current;
    private reportInterval;
    private lastReported;
    constructor(start: number, end: number, reportInterval: number);
    update(current: number, end?: number): void;
    private report;
}
