/*
 * @Author: czy0729
 * @Date: 2026-09-02 11:00:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 11:05:53
 */

/**
 * 并发限制器 (自研, 替代 p-limit)
 * - 信号量 + FIFO 队列, 同时最多运行 concurrency 个任务
 * - 任务失败时返回的 Promise 以相同错误 reject, 但槽位照常释放, 后续任务不挂起
 * @param concurrency 最大并发数, 须为 >= 1 的整数
 */
export default function pLimit(concurrency: number) {
  if (!(Number.isInteger(concurrency) && concurrency > 0)) {
    throw new TypeError('Expected `concurrency` to be a positive integer')
  }

  /** 等待槽位的任务队列 */
  const queue: (() => void)[] = []
  let activeCount = 0

  /** 释放槽位并调度队首任务 */
  const next = () => {
    activeCount -= 1
    if (queue.length > 0) queue.shift()()
  }

  /** 占用槽位执行任务, settle 后释放; resolve 收到任务 Promise, 结果与失败均透传给调用方 */
  const run = (fn: () => unknown, resolve: (value: any) => void) => {
    activeCount += 1
    const result = (async () => fn())()
    resolve(result)
    result.then(
      () => next(),
      () => next()
    )
  }

  return function limit<T>(fn: () => Promise<T> | T): Promise<T> {
    return new Promise<T>(resolve => {
      queue.push(() => run(fn, resolve))

      Promise.resolve().then(() => {
        if (activeCount < concurrency && queue.length > 0) queue.shift()()
      })
    })
  }
}
