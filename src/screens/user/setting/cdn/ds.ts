/*
 * @Author: czy0729
 * @Date: 2022-07-18 08:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 09:04:12
 */
import { _ } from '@stores'

export const URL_LAIN = 'https://lain.bgm.tv/pic/cover/c/fa/1d/25833_kZIjD.jpg'
export const URL_LAIN_NEW = 'https://lain.bgm.tv/pic/cover/c/ff/e5/327606_Q11Sq.jpg'
export const URL_JSDELIVR =
  'https://cdn.jsdelivr.net/gh/czy0729/Bangumi-OSS@master/data/subject/c/t/TfOdAB.jpg'
export const URL_FASTLY = URL_JSDELIVR.replace('cdn', 'fastly')
export const URL_ONEDRIVE = 'https://bangumi.stdcdn.com/subject/c/t/TfOdAB.jpg'

export const IMG_WIDTH = Math.floor((_.window.contentWidth - 2 * _.sm) / 3)
export const IMG_HEIGHT = Math.floor(IMG_WIDTH * 1.44)

export const ADVANCE_CDN = 10

export const TEXTS = {
  cover: {
    setting: {
      title: '封面加速',
      information: '使用特定CDN域名加速访问，切换后可能需要重新启动才能生效'
    },
    lain: {
      title: 'lain.bgm.tv',
      information: '不使用加速\n稳定但没清晰加成'
    },
    jsDelivr: {
      title: 'jsDelivr',
      information: '数据会出现滞后性\n免费开放'
    },
    magma: {
      title: 'Magma',
      information: '条件开放\n@magma 提供的高速付费域'
    }
  },
  test: {
    title: '测试',
    information: '有ms并不代表能顺利加载图片，只是ping后立马返回结果的时间'
  },
  deprecated: {
    setting: {
      title: '旧版本域'
    },
    oneDrive: {
      title: 'OneDrive',
      information: '网络服务故障，待修复\n作者私有付费'
    },
    fastly: {
      title: 'fastly',
      information: '免费开放\n理论上与 jsDelivr 一样'
    }
  },
  cdnAvatar: {
    hd: '头像加速',
    information: '[待废弃] 其他用户头像使用清晰快照，但不会实时更新'
  }
} as const
