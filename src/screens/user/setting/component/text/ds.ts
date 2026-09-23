import { rc } from '@utils/dev'
import { SETTING_FONTSIZE_ADJUST, SETTING_LETTER_SPACING } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Text')

export const TEXTS = {
  text: {
    hd: '文本处理'
    // information: '字体、字号、字间距、繁体、盘古之白'
  },
  font: {
    title: '字体',
    information: '开启后，系统将强制使用「思源幼圆」字体，以确保不同设备上的 UI 设计统一'
  },
  fontSize: {
    title: '字号',
    search: SETTING_FONTSIZE_ADJUST.map(item => item.label).join()
  },
  letterSpacing: {
    title: '字间距',
    search: SETTING_LETTER_SPACING.map(item => item.label).join()
  },
  s2t: {
    hd: '繁体',
    information: '已于 24 年 4 月使用 OpenCC 替换原来的暴力转换'
  },
  spacing: {
    title: '自动文字排版',
    information: '自动为客户端内的中文和半形的英文、数字、符号之间插入空白，排版强迫症福音'
  }
} as const
