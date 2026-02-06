/*
 * @Author: czy0729
 * @Date: 2026-02-06 07:38:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-06 07:47:47
 */

/** 限流器 */
export class TaskQueue {
  private running = 0
  private queue: (() => void)[] = []

  constructor(private limit = 2) {}

  run<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const exec = async () => {
        this.running++
        try {
          resolve(await task())
        } catch (e) {
          reject(e)
        } finally {
          this.running--
          const next = this.queue.shift()
          next?.()
        }
      }

      if (this.running < this.limit) exec()
      else this.queue.push(exec)
    })
  }
}
