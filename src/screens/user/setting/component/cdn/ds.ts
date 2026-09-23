/*
 * @Author: czy0729
 * @Date: 2022-07-18 08:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
import { CDN_MAGMA } from '@utils/cdn'
import { rc } from '@utils/dev'
import { HOST_BGM_STATIC, IMG_HEIGHT_SM, IMG_WIDTH_SM } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'CDN')

export const URL_LAIN = `${HOST_BGM_STATIC}/pic/cover/c/fa/1d/25833_kZIjD.jpg`
export const URL_LAIN_NEW = `${HOST_BGM_STATIC}/pic/cover/c/ff/e5/327606_Q11Sq.jpg`
export const URL_JSDELIVR =
  'https://cdn.jsdelivr.net/gh/czy0729/Bangumi-OSS@master/data/subject/c/t/TfOdAB.jpg'
export const URL_FASTLY = URL_JSDELIVR.replace('cdn', 'fastly')
export const URL_ONEDRIVE = 'https://bangumi.stdcdn.com/subject/c/t/TfOdAB.jpg'

export const URL_BOOK = `${HOST_BGM_STATIC}/r/400/pic/cover/l/a7/d8/571438_JmBRt.jpg`
export const URL_MUSIC = `${HOST_BGM_STATIC}/r/400/pic/cover/l/0e/d1/620834_444lw.jpg`
export const URL_GAME = `${HOST_BGM_STATIC}/r/400/pic/cover/l/13/03/548128_13Vl9.jpg`

export const IMG_WIDTH = IMG_WIDTH_SM
export const IMG_HEIGHT = IMG_HEIGHT_SM

/** 封面拟物预览图的尺寸 */
export const width = Math.floor(IMG_WIDTH_SM / 1.7)
export const height = Math.floor(IMG_HEIGHT_SM / 1.7)

export const TEXTS = {
  cdn: {
    hd: '图片'
    // information: '图片加速、封面拟物、渐出动画'
  },
  coverThings: {
    title: '封面拟物',
    information: '能识别到类型的条目，封面会自动采用拟物风格，提升视觉区分度'
  },
  avatarRound: {
    setting: {
      title: '头像'
    },
    round: {
      title: '圆形'
    },
    square: {
      title: '方形'
    }
  },
  squircle: {
    title: '圆角过渡',
    information: '在图片上采用特殊曲率算法统一安卓/iOS圆角效果'
  },
  cover: {
    setting: {
      title: '封面加速',
      information: `使用特定 CDN 域名加速访问，切换后可能需要重新启动才能生效（仅支持国内流量，如有必要可对域名「${CDN_MAGMA}」进行分流策略）`
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
    title: '域名测试',
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
  cdnAvatarV2: {
    hd: '头像加速',
    information:
      '遇到头像加载问题？启用高速付费域名可解决加载失败问题（采用与封面加速相同的技术方案）'
  },
  imageSkeleton: {
    setting: {
      title: '图片加载动画',
      information: '部分手机显示骨架屏动画卡顿，可尝试关闭提升流畅度'
    }
  },
  imageFadeIn: {
    hd: '图片渐出动画'
  }
} as const
