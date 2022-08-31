/*
 * @Author: czy0729
 * @Date: 2022-08-31 13:08:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 13:14:37
 */
import hash from '@utils/thirdParty/hash'
import { MemoStylesItem } from './types'

const HASH_CACHE = {}

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
  const str = configs.join()
  if (!HASH_CACHE[str]) HASH_CACHE[str] = hash(str)
  return HASH_CACHE[str]
}
