/*
 * @Author: czy0729
 * @Date: 2023-02-13 04:48:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:33:42
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Discovery')

export const TEXTS = {
  discoveryMenuNum: {
    hd: '菜单每行个数'
  },
  discoveryTodayOnair: {
    hd: '今日放送'
  },
  live2D: {
    hd: '看板娘 Live2D'
  },
  live2DVoice: {
    hd: '看板娘 Live2D 声音'
  }
} as const
