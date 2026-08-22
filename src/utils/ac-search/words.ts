/*
 * @Author: czy0729
 * @Date: 2026-08-22 09:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 09:20:00
 */
import { loadJSON } from '@assets/json'
import { IGNORE_ITEMS, REG_SPEC } from './ds'

import type { Substrings } from './types'

/**
 * 合并三张词表为 中文 => 条目 id 映射
 * - 优先级: 自定义 addon > 动画别名 alias > 动画 anime, 与原 `addon[cn] || alias[cn] || anime[cn]` 一致
 */
export function mergeWordMaps(addon: Substrings, alias: Substrings, anime: Substrings): Substrings {
  const cnMap: Substrings = {}

  // 从高优先级到低优先级写入, 先写入的占位不被覆盖
  ;[addon, alias, anime].forEach(map => {
    Object.keys(map).forEach(cn => {
      if (!(cn in cnMap)) cnMap[cn] = map[cn]
    })
  })

  return cnMap
}

/** 过滤不适合自动匹配的词条 (过长 / 单字 / 忽略名单 / 特殊符号) */
export function filterWords(words: string[]): string[] {
  return words.filter(word => {
    // 过滤掉比较长的条目名字, 命中率很低
    if (word.length > 8 || word.length <= 1) return false

    if ((IGNORE_ITEMS as readonly string[]).includes(word)) return false

    // 带特殊符号的通常用户很少手动输入, 命中率很低
    if (REG_SPEC.test(word)) return false

    return true
  })
}

/** 加载词库, 返回去重后的中文 => 条目 id 映射 */
export async function loadWords(): Promise<Substrings> {
  const addon = await loadJSON('substrings/addon')
  const alias = await loadJSON('substrings/alias')
  const anime = await loadJSON('substrings/anime')

  return mergeWordMaps(addon, alias, anime)
}
