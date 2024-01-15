/*
 * @Author: czy0729
 * @Date: 2022-08-31 13:08:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-16 06:31:03
 */
import hash from '@utils/thirdParty/hash'
import { MemoStylesItem } from './types'

const HASH_MAP = new Map<string, string>()

let _memoStylesId = 0

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
  if (!HASH_MAP.has(id)) HASH_MAP.set(id, hash(id))
  return HASH_MAP.get(id)
}
