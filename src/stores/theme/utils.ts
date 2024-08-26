/*
 * @Author: czy0729
 * @Date: 2022-08-31 13:08:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-25 08:49:32
 */
import hash from '@utils/thirdParty/hash'
import { MemoStylesItem } from './types'

const memo = new Map<string, string>()

let _memoStylesId = 0

/**
 * 包裹后实际使用没影响, 用于在 typescript 上区分是否 mobx 的 computed 值, 检查写法是否合规
 *  - 当使用 _.create() 生成样式, 若有一值的类型是带 ComputedValue<V>, 给与警告
 *  - 当使用 _.memoStyles() 生成样式, 若所有值均没有带 ComputedValue<V>, 给与警告
 * */
export function computedValue<V extends string | number | boolean>(value: V) {
  return value
}

/** 生成记忆 styles */
export function getMemoStyles(): MemoStylesItem {
  _memoStylesId += 1

  return {
    _id: _memoStylesId,
    _hash: '',
    _styles: ''
  }
}

/** 生成记忆 styles 的 hash 标识, 用于判断是否重新生成 styles */
export function getMemoStylesHash(configs: any[]): string {
  const id = configs.join()
  if (!memo.has(id)) memo.set(id, hash(id))

  return memo.get(id)
}
