/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:07:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-10 05:21:12
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

export const URL_BOOK = 'https://lain.bgm.tv/r/400/pic/cover/l/8a/92/546350_S1MzK.jpg'
export const URL_MUSIC = 'https://lain.bgm.tv/r/400/pic/cover/l/b8/d0/239082_Tg6XT.jpg'
export const URL_GAME = 'https://lain.bgm.tv/r/400/pic/cover/l/b2/72/200763_s2kSG.jpg'

export const width = Math.floor(IMG_WIDTH_SM / 1.7)
export const height = Math.floor(IMG_HEIGHT_SM / 1.7)

export const TEXTS = {
  font: {
    title: '字体',
    information: '开启后，系统将强制使用「思源幼圆」字体，以确保不同设备上的 UI 设计统一'
  },
  coverThings: {
    title: '封面拟物',
    information: '能识别到类型的条目，封面会自动采用拟物风格，提升视觉区分度'
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
    information: '在图片上采用特殊曲率算法统一安卓/iOS圆角效果（当前阶段不建议启用）'
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
    information:
      '提交操作后会提供中度震动反馈，部分切换操作也会触发轻度震动（建议开启以获得完整体验）'
  }
} as const
