/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:07:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
import { rc } from '@utils/dev'
import { MODEL_SETTING_TRANSITION, SETTING_TRANSITION } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'UI')

export const TEXTS = {
  ui: {
    hd: '界面'
    // information: '溢出遮罩、震动、看板娘吐槽、切页动画'
  },
  cnFirst: {
    title: '优先中文',
    information: '客户端会智能匹配本地历史番剧数据，尽可能使用中文条目名称'
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
    title: '看板娘吐槽',
    information: '通常在列表尾部出现，表示已到底'
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
