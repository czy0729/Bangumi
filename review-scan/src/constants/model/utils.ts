/*
 * @Author: czy0729
 * @Date: 2023-03-14 15:44:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 05:21:20
 */
import { ModelItem } from './types'

/** 缓存结果 */
const CACHE_MAP = new Map()

/** 项目通用模型 */
export class Model<T extends readonly ModelItem[]> {
  constructor(data: T, key: string) {
    this.data = data
    if (key) this.key = key
  }

  /** 用于区分唯一 */
  private key: string | undefined

  /** 指向源数组 */
  data: T | undefined[] = []

  /** 优先通过 value 找 label */
  getLabel<R = T[number]['label']>(value: any): R {
    const key = this.key ? `getLabel|${this.key}|${value}` : ''
    if (key && CACHE_MAP.has(key)) return CACHE_MAP.get(key)

    const find = this.data.find(
      (item: { value: any; title?: any }) => item.value == value || item.title == value
    )
    const result = (find ? find.label : false) as R
    if (!key) return result

    CACHE_MAP.set(key, result)
    return result
  }

  /** 优先通过 label 找 value */
  getValue<R = T[number]['value']>(label: any): R {
    const key = this.key ? `getValue|${this.key}|${label}` : ''
    if (key && CACHE_MAP.has(key)) return CACHE_MAP.get(key)

    const find = this.data.find(
      (item: { label: any; title?: any }) => item.label == label || item.title == label
    )
    const result = (find ? find.value : false) as R
    if (!key) return result

    CACHE_MAP.set(key, result)
    return result
  }

  /** 优先通过 label 找 title, 其次 value */
  getTitle<R = T[number]['title'] | T[number]['value']>(label: any): R {
    const key = this.key ? `getTitle|${this.key}|${label}` : ''
    if (key && CACHE_MAP.has(key)) return CACHE_MAP.get(key)

    const find = this.data.find(
      (item: { label: any; value: any }) => item.label == label || item.value == label
    )
    const result = (find ? find.title : false) as R
    if (!key) return result

    CACHE_MAP.set(key, result)
    return result
  }
}
