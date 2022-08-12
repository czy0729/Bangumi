/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:07:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 08:17:35
 */
import {
  IMG_HEIGHT_SM,
  IMG_WIDTH_SM,
  SETTING_FONTSIZEADJUST,
  SETTING_TRANSITION
} from '@constants'

export const URL_BOOK = 'https://lain.bgm.tv/pic/cover/c/6b/5d/360454_CQqJt.jpg'
export const URL_MUSIC = 'https://lain.bgm.tv/pic/cover/c/68/f3/363071_LfafL.jpg'
export const URL_GAME = 'https://lain.bgm.tv/pic/cover/c/ac/2f/368785_ukWkl.jpg'

export const width = Math.floor(IMG_WIDTH_SM / 1.8)
export const height = Math.floor(IMG_HEIGHT_SM / 1.8)

export const TEXTS = {
  font: {
    title: '字体',
    information:
      '开启后会强制使用 Resource Han Rounded (思源幼圆) 字体，以便在各设备达到设计上面的 UI 统一'
  },
  coverThings: {
    title: '封面拟物',
    information: '能确定类型的条目封面拟物化，增加区分度'
  },
  coverRadius: {
    setting: {
      title: '图片圆角'
    },
    sm: {
      title: '小'
    },
    md: {
      title: '中'
    },
    lg: {
      title: '大'
    }
  },
  speech: {
    title: '看板娘吐槽'
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
  fontSize: {
    title: '字号',
    search: SETTING_FONTSIZEADJUST.map(item => item.label).join()
  },
  ripple: {
    hd: '点击水纹效果',
    information: '按钮被按下时产生涟漪效果，关闭可提升性能'
  },
  transition: {
    hd: '切页动画',
    information: '切换可能需要重新启动才能正确生效',
    search: SETTING_TRANSITION.map(item => item.label).join()
  },
  vibration: {
    hd: '震动',
    information: '提交操作完成后追加轻震动反馈'
  }
} as const
