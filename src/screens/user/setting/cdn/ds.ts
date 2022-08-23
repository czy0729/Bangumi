/*
 * @Author: czy0729
 * @Date: 2022-07-18 08:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-23 19:19:21
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

export const TEXTS = {
  cover: {
    setting: {
      title: '封面加速',
      information: '使用特定 CDN 域名加速访问，切换后可能需要重新启动才能生效'
    },
    lain: {
      title: 'lain.bgm.tv',
      information: '不使用加速\n稳定但没清晰加成'
    },
    magma: {
      title: 'Magma',
      information: '条件开放，支持试用中\n@magma 提供的高速付费域'
    }
  },
  test: {
    title: '测试',
    information: '有 ms 并不代表能顺利加载，只是 ping 后立马返回结果的时间'
  },
  deprecated: {
    setting: {
      title: '旧版本域'
    },
    jsDelivr: {
      title: 'jsDelivr',
      information: '免费开放\n目前可能已失效'
    },
    oneDrive: {
      title: 'OneDrive',
      information: '已失效\n请尽快设置到别的域'
    },
    fastly: {
      title: 'fastly',
      information: '免费开放\n目前可能已失效'
    }
  },
  cdnAvatar: {
    hd: '头像加速',
    information: '[已废弃] 不再生效'
  }
} as const
