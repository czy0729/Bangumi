import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Text')

export const TEXTS = {
  text: {
    hd: '文本处理'
    // information: '中文优先、繁体、盘古之白'
  },
  cnFirst: {
    title: '优先中文',
    information: '客户端会智能匹配本地历史番剧数据，尽可能使用中文条目名称'
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
