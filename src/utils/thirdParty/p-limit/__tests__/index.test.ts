/*
 * @Author: czy0729
 * @Date: 2026-09-02 11:00:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 11:05:50
 */
import pLimit from '../index'

/** 创建手动控制的 deferred, 用于确定性验证并发行为 */
function deferred() {
  let resolve!: () => void
  const promise = new Promise<void>(r => (resolve = r))
  return { promise, resolve }
}

describe('pLimit', () => {
  it('同时运行的任务数不超过限制', async () => {
    const limit = pLimit(2)
    let running = 0
    let peak = 0

    const task = async () => {
      running += 1
      peak = Math.max(peak, running)
      await new Promise(r => setTimeout(r, 10))
      running -= 1
    }

    await Promise.all(Array.from({ length: 10 }, () => limit(task)))
    expect(peak).toBe(2)
  })

  it('空闲槽位立即被队列中的任务填满', async () => {
    const limit = pLimit(3)
    const gates = Array.from({ length: 3 }, deferred)
    let running = 0
    let peak = 0

    const tasks = gates.map(({ promise }) => () => {
      running += 1
      peak = Math.max(peak, running)
      return promise
    })

    const all = Promise.all(tasks.map(task => limit(task)))
    gates.forEach(({ resolve }) => resolve())
    await all

    // 前一个任务完成释放槽位后, 后续任务应当立刻补上, 峰值始终为 3
    expect(peak).toBe(3)
  })

  it('按入队顺序执行 (FIFO)', async () => {
    const limit = pLimit(1)
    const order: number[] = []

    await Promise.all(
      [1, 2, 3, 4, 5].map(i =>
        limit(async () => {
          await new Promise(r => setTimeout(r, Math.random() * 5))
          order.push(i)
        })
      )
    )

    expect(order).toEqual([1, 2, 3, 4, 5])
  })

  it('返回值透传', async () => {
    const limit = pLimit(2)

    expect(await limit(async () => 'ok')).toBe('ok')
    expect(await limit(() => 1)).toBe(1)
  })

  it('任务失败时调用方 Promise 以相同错误拒绝', async () => {
    const limit = pLimit(2)

    await expect(
      limit(async () => {
        throw new Error('boom')
      })
    ).rejects.toThrow('boom')
  })

  it('任务失败后槽位释放, 队列中后续任务继续执行', async () => {
    const limit = pLimit(1)
    const results: string[] = []

    const task = (v: string) => async () => {
      await new Promise(r => setTimeout(r, 5))
      results.push(v)
    }

    const failing = limit(async () => {
      throw new Error('boom')
    }).catch(() => 'caught')

    await Promise.all([failing, limit(task('a')), limit(task('b'))])

    // 若槽位未释放, 队列将永久挂起, Promise.all 不会 resolve
    expect(results).toEqual(['a', 'b'])
  })

  it('并发组内部分任务失败, 其余任务的结果照常返回', async () => {
    const limit = pLimit(2)

    const results = await Promise.all([
      limit(async () => 'a'),
      limit(async () => {
        throw new Error('boom')
      }).catch(() => 'fallback'),
      limit(async () => 'b')
    ])

    expect(results).toEqual(['a', 'fallback', 'b'])
  })

  it('非法 concurrency 抛出 TypeError', () => {
    expect(() => pLimit(0)).toThrow(TypeError)
    expect(() => pLimit(-1)).toThrow(TypeError)
    expect(() => pLimit(1.5)).toThrow(TypeError)
    expect(() => pLimit(NaN)).toThrow(TypeError)
  })
})
