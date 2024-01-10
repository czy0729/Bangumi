/*
 * @Author: czy0729
 * @Date: 2022-07-18 10:03:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:30:03
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Katakana')

export const TEXTS = {
  engine: {
    setting: {
      title: '翻译引擎'
    },
    baidu: {
      title: '百度翻译'
    },
    google: {
      title: '谷歌翻译',
      information: '因服务已退出国内\n故无限期搁置'
    }
  },
  katakana: {
    title: '[实验性] 片假名终结者',
    information:
      '匹配日语片假名延迟翻译，翻译成功后在上方标注英文原词\n开启后资源消耗增大，非必要请勿开启'
  },
  cnFirst: {
    title: '优先中文',
    information: '若开启片假名终结者，建议还需要日语优先效果才会好'
  },
  origin: {
    hd: '源头',
    information: '给不同类型的条目，自定义通用跳转'
  },
  webhook: {
    hd: 'Webhook',
    information: '影响用户时间线的操作，允许通知外部自定义接口'
  }
} as const
