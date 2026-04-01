/*
 * @Author: czy0729
 * @Date: 2026-04-02 00:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-02 00:18:11
 */
import { useRef } from 'react'

/**
 * 稳定随机获取集合中的一项
 * @param collection - 输入的对象或数组
 * @returns [key, value] 数组。如果是数组，key 为 number；如果是对象，key 为 string。
 */
export default function useStableRandomItem<T extends object>(
  collection: T
): [keyof T | null, T[keyof T] | null] {
  // 定义存储结构的类型
  type ResultType = [keyof T, T[keyof T]]

  const resultRef = useRef<ResultType | null>(null)

  // 只有在 ref 为空且 collection 有值时初始化
  if (!resultRef.current && collection) {
    const keys = Object.keys(collection) as Array<keyof T>

    if (keys.length > 0) {
      const isArray = Array.isArray(collection)
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      const item = collection[randomKey]

      // 针对数组索引做类型转换，确保返回 number 类型的 key
      const finalKey = isArray ? (Number(randomKey) as keyof T) : randomKey

      resultRef.current = [finalKey, item]
    }
  }

  // 返回存储的结果，若无则返回空对
  return resultRef.current || [null, null]
}
