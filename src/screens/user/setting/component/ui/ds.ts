/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:07:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 22:14:08
 */
import { rc } from '@utils/dev'
import {
  HOST_BGM_STATIC,
  IMG_HEIGHT_SM,
  IMG_WIDTH_SM,
  MODEL_SETTING_TRANSITION,
  SETTING_FONTSIZE_ADJUST,
  SETTING_LETTER_SPACING,
  SETTING_TRANSITION
} from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'UI')

export const URL_BOOK = `${HOST_BGM_STATIC}/r/400/pic/cover/l/a7/d8/571438_JmBRt.jpg`
export const URL_MUSIC = `${HOST_BGM_STATIC}/r/400/pic/cover/l/0e/d1/620834_444lw.jpg`
export const URL_GAME = `${HOST_BGM_STATIC}/r/400/pic/cover/l/13/03/548128_13Vl9.jpg`

export const width = Math.floor(IMG_WIDTH_SM / 1.7)
export const height = Math.floor(IMG_HEIGHT_SM / 1.7)

export const TEXTS = {
  ui: {
    hd: '画面'
    // information: '字体、字号、封面样式、震动'
  },
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
    search: SETTING_FONTSIZE_ADJUST.map(item => item.label).join()
  },
  letterSpacing: {
    title: '字间距',
    search: SETTING_LETTER_SPACING.map(item => item.label).join()
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
  },
  horizontalShowMask: {
    hd: '溢出遮罩',
    information: '在水平列表两侧的溢出内容上方，显示遮罩（平板设备默认开启）'
  }
} as const
