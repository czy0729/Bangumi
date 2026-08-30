/*
 * @Author: czy0729
 * @Date: 2026-08-31 03:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 05:25:25
 *
 * @utils/bucket 分桶工具测试: 桶下标计算 / 桶对象生成 / 容量淘汰
 */
import { getBucketId, trimBucket } from '../index'

describe('getBucketId', () => {
  it('取 id 末 3 位数字', () => {
    expect(getBucketId('group/3845234')).toBe(234)
    expect(getBucketId(37460)).toBe(460)
    expect(getBucketId('subject/1007914', 3)).toBe(914)
  })

  it('digits 参数控制位数', () => {
    expect(getBucketId('37460', 2)).toBe(60)
    expect(getBucketId('37460', 1)).toBe(0)
  })

  it('非数字结尾兜底 0', () => {
    expect(getBucketId('group/abc')).toBe(0)
    expect(getBucketId('', 3)).toBe(0)
  })
})

describe('trimBucket', () => {
  it('按 getTime 保留最新 limit 条, 原地删除其余并返回被淘汰 key', () => {
    const bucket = {
      '1': { time: 100 },
      '2': { time: 300 },
      '3': { time: 200 }
    }

    const evicted = trimBucket(bucket, 2, item => item.time)

    expect(evicted).toEqual(['1'])
    expect(Object.keys(bucket).sort()).toEqual(['2', '3'])
  })

  it('未超上限不删除', () => {
    const bucket = { '1': { time: 100 } }

    expect(trimBucket(bucket, 10, item => item.time)).toEqual([])
    expect(Object.keys(bucket)).toEqual(['1'])
  })

  it('getTime 缺失视作最旧优先淘汰', () => {
    const bucket: Record<string, { time?: number }> = {
      '1': {},
      '2': { time: 200 }
    }

    const evicted = trimBucket(bucket, 1, item => item.time || 0)

    expect(evicted).toEqual(['1'])
  })
})
