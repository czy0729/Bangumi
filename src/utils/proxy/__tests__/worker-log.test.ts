/*
 * @Author: czy0729
 * @Date: 2026-08-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 21:07:56
 */
import { addWorkerLog, clearWorkerLogs, getWorkerLogs } from '../worker-log'

jest.mock('@utils/kv/worker', () => ({
  getSupporterConfig: () => ({
    host: 'https://supporter.example.com',
    secret: 'supporter-secret',
    lainHost: 'https://supporter-lain.example.com',
    lainSecret: 'supporter-lain-secret'
  })
}))

beforeEach(() => {
  clearWorkerLogs()
})

describe('addWorkerLog', () => {
  it('记录时间戳、级别、类型与消息', () => {
    addWorkerLog('info', '消息一', 'api')

    const logs = getWorkerLogs()
    expect(logs).toHaveLength(1)
    expect(typeof logs[0].time).toBe('number')
    expect(logs[0]).toMatchObject({
      level: 'info',
      type: 'api',
      message: '消息一'
    })
  })

  it('type 默认为 host', () => {
    addWorkerLog('success', 'ok')

    expect(getWorkerLogs()[0].type).toBe('host')
  })

  it('超过 50 条时丢弃最旧日志', () => {
    for (let i = 0; i < 60; i++) {
      addWorkerLog('info', `msg-${i}`)
    }

    const logs = getWorkerLogs()
    expect(logs).toHaveLength(50)
    expect(logs[0].message).toBe('msg-10')
    expect(logs[49].message).toBe('msg-59')
  })
})

describe('getWorkerLogs', () => {
  it('返回副本, 外部修改不影响内部状态', () => {
    addWorkerLog('info', '原始')

    const logs = getWorkerLogs()
    logs.push({ time: 0, level: 'warn', type: 'lain', message: '污染' })

    expect(getWorkerLogs()).toHaveLength(1)
  })
})

describe('clearWorkerLogs', () => {
  it('清空全部日志', () => {
    addWorkerLog('info', 'a')
    addWorkerLog('info', 'b')

    clearWorkerLogs()

    expect(getWorkerLogs()).toHaveLength(0)
  })
})

describe('addWorkerLog - 内置支持者节点打码', () => {
  it('主节点域名被隐藏为 ***', () => {
    addWorkerLog('info', 'https://bgm.tv/x → https://supporter.example.com/x', 'host')

    expect(getWorkerLogs()[0].message).toBe('https://bgm.tv/x → https://***/x')
  })

  it('图片节点域名同样被打码', () => {
    addWorkerLog('info', 'https://supporter-lain.example.com/pic/a.jpg', 'lain')

    expect(getWorkerLogs()[0].message).toBe('https://***/pic/a.jpg')
  })

  it('带端口与裸域名形式一并覆盖, 端口保留', () => {
    addWorkerLog('info', 'https://supporter.example.com:8080/x supporter.example.com/y')

    expect(getWorkerLogs()[0].message).toBe('https://***:8080/x ***/y')
  })

  it('用户自填地址与社区节点不受影响', () => {
    addWorkerLog('info', 'https://my-worker.example.com/x')

    expect(getWorkerLogs()[0].message).toBe('https://my-worker.example.com/x')
  })
})
