/*
 * @Author: czy0729
 * @Date: 2024-09-27 02:45:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-06 09:02:21
 */
import type { WordCloudOptions } from './types'

/** 默认词云配置 */
export const DEFAULT_OPTIONS: WordCloudOptions = {
  words: [],
  verticalEnabled: true,
  minFont: 10,
  maxFont: 50,
  fontOffset: 1,
  width: 300,
  height: 200,
  fontFamily: ''
}
