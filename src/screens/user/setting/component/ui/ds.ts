/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:07:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-03 21:20:22
 */
import { rc } from '@utils/dev'
import {
  IMG_HEIGHT_SM,
  IMG_WIDTH_SM,
  MODEL_SETTING_TRANSITION,
  SETTING_FONTSIZEADJUST,
  SETTING_TRANSITION
} from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'UI')

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
  squircle: {
    title: '[实验性] 圆角过渡',
    information: '对图片使用另一种曲率渲染圆角（暂不建议使用）'
  },
  speech: {
    title: '看板娘吐槽',
    information: '通常在列表尾部出现，表示已到底'
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
    setting: {
      title: '切页动画',
      information: '切换可能需要重新启动才能正确生效（不建议更改）',
      search: SETTING_TRANSITION.map(item => item.label).join()
    },
    horizontal: {
      title: MODEL_SETTING_TRANSITION.getLabel('horizontal')
    },
    vertical: {
      title: MODEL_SETTING_TRANSITION.getLabel('vertical')
    },
    scale: {
      title: MODEL_SETTING_TRANSITION.getLabel('scale')
    }
  },
  vibration: {
    hd: '震动',
    information: '提交操作完成后追加中度震动反馈，部分切换操作后追加轻度震动反馈（若可以建议开启）'
  }
} as const
