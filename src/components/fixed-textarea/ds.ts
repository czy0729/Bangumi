/*
 * @Author: czy0729
 * @Date: 2022-05-06 20:34:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-06 20:37:15
 */
import { IOS } from '@constants'

export const NAMESPACE = 'c-fixed-textarea'

/** 最大常用bgm表情数量 */
export const MAX_HISTORY_COUNT = 7

export const SOURCE_FLAG = '来自Bangumi for'

export const SOURCE_TEXT = `\n[color=grey][size=10][${SOURCE_FLAG} ${
  IOS ? 'iOS' : 'android'
}] [url=https://bgm.tv/group/topic/350677][color=grey]获取[/color][/url][/size][/color]`
