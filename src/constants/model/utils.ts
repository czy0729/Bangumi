/*
 * @Author: czy0729
 * @Date: 2023-03-14 15:44:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-14 15:48:02
 */
type ModelItem = {
  /** 键值名称 */
  label: string

  /** 键值值 */
  value: string

  /** 额外键值名称 */
  title?: string
}

const CACHE = {}

class Model {
  constructor(data: readonly ModelItem[], key: string) {
    this.data = data
    if (key) this.key = key
  }

  /** 用于区分唯一 */
  private key: string

  /** 指向源数组 */
  data: readonly ModelItem[] = []

  /**
   * 优先通过 value 找 label
   * @param {*} value
   * @returns label
   */
  getLabel<T = string | false>(value: any): T {
    const key = this.key ? `getLabel|${this.key}|${value}` : ''
    if (key && key in CACHE) return CACHE[key]

    const find = this.data.find(
      (item: { value: any; title?: any }) => item.value == value || item.title == value
    )
    const result = (find ? find.label : false) as T
    if (!key) return result

    CACHE[key] = result
    return result
  }

  /**
   * 优先通过 label 找 value
   * @param {*} label
   * @returns value
   */
  getValue<T = string | false>(label: any): T {
    const key = this.key ? `getValue|${this.key}|${label}` : ''
    if (key && key in CACHE) return CACHE[key]

    const find = this.data.find(
      (item: { label: any; title?: any }) => item.label == label || item.title == label
    )
    const result = (find ? find.value : false) as T
    if (!key) return result

    CACHE[key] = result
    return result
  }

  /**
   * 优先通过 label 找 title
   * @param {*} label
   * @returns title | value
   */
  getTitle<T = string | false>(label: any): T {
    const key = this.key ? `getTitle|${this.key}|${label}` : ''
    if (key && key in CACHE) return CACHE[key]

    const find = this.data.find(
      (item: { label: any; value: any }) => item.label == label || item.value == label
    )
    const result = (find ? find.title : false) as T
    if (!key) return result

    CACHE[key] = result
    return result
  }
}

export { Model }
