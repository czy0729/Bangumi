/*
 * @Author: czy0729
 * @Date: 2022-07-18 10:03:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-22 12:33:45
 */
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
      information: '规划中暂不可用'
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
  }
} as const
