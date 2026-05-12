/*
 * @Author: czy0729
 * @Date: 2026-05-13
 */
import { TaskQueue } from '../task-queue'

describe('TaskQueue', () => {
  it('默认并发限制为 2', () => {
    const queue = new TaskQueue()
    expect((queue as any).limit).toBe(2)
  })

  it('可以自定义并发限制', () => {
    const queue = new TaskQueue(5)
    expect((queue as any).limit).toBe(5)
  })

  it('执行单个任务', async () => {
    const queue = new TaskQueue()
    const result = await queue.run(() => Promise.resolve(42))
    expect(result).toBe(42)
  })

  it('并发执行不超过限制的任务', async () => {
    const queue = new TaskQueue(2)
    let running = 0
    let maxRunning = 0

    const createTask = () =>
      queue.run(async () => {
        running++
        maxRunning = Math.max(maxRunning, running)
        await new Promise((r) => setTimeout(r, 50))
        running--
        return true
      })

    await Promise.all([createTask(), createTask(), createTask(), createTask()])

    expect(maxRunning).toBeLessThanOrEqual(2)
  })

  it('任务完成后自动执行队列中的下一个任务', async () => {
    const queue = new TaskQueue(1)
    const order: number[] = []

    const createTask = (id: number, delay: number) =>
      queue.run(async () => {
        order.push(id)
        await new Promise((r) => setTimeout(r, delay))
        order.push(-id)
        return id
      })

    await Promise.all([createTask(1, 30), createTask(2, 10), createTask(3, 10)])

    expect(order).toEqual([1, -1, 2, -2, 3, -3])
  })

  it('任务失败时正确传播错误', async () => {
    const queue = new TaskQueue()
    const error = new Error('测试错误')

    await expect(
      queue.run(() => Promise.reject(error))
    ).rejects.toThrow('测试错误')
  })

  it('任务失败后队列继续执行', async () => {
    const queue = new TaskQueue(1)
    const order: number[] = []

    await queue.run(async () => {
      order.push(1)
      throw new Error('失败')
    }).catch(() => {})

    await queue.run(async () => {
      order.push(2)
      return 2
    })

    expect(order).toEqual([1, 2])
  })
})
