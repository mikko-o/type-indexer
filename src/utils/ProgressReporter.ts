
export class ProgressReporter {
  private start: number
  private end: number
  private current: number
  private reportInterval: number
  private lastReported = 0

  constructor(start: number, end: number, reportInterval: number) {
    this.start = start
    this.current = start
    this.end = end
    this.reportInterval = reportInterval
    this.report()
  }

  update(current: number, end?: number) {
    if (end) this.end = end
    this.current = current
    if (this.current > this.lastReported + this.reportInterval || this.current >= this.end) {
      this.report()
      this.lastReported = current
    }
  }

  private report() {
    const p = Math.round((this.current / this.end) * 10000) / 100
    console.log(`${p} % (${this.current} / ${this.end})`)
  }
}