/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-29 20:16:53
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Theme')

export const BLUR_SETTINGS = ['blurBottomTabs', 'blurToast', 'blurModal'] as const

export const TEXTS = {
  theme: {
    setting: {
      title: '主题',
      information: `长按顶部 Logo 可快速前往设置，切换主题可能需要重新启动才能正确生效；若屏幕为 AMOLED 选用「纯黑」可能更省电`
    },
    light: {
      title: '明亮'
    },
    deepDark: {
      title: '纯黑'
    },
    dark: {
      title: '黑暗'
    }
  },
  autoColorScheme: {
    hd: '跟随系统',
    information: '冷启动客户端时，主题是否跟随系统'
  },
  logoToggleTheme: {
    hd: '快速切换主题',
    information: '是否允许点击顶部 Logo 快速切换主题'
  },
  androidBlur: {
    hd: '[实验性] 毛玻璃布局',
    information:
      '在首屏顶部底部、模态框、输入框等 UI 背景上，启用仿 iOS 的毛玻璃效果\n因在安卓里，毛玻璃的实现需要消耗大量资源，很有可能出现明显掉帧情况，仅建议最新型号的手机尝试'
  },
  blurBottomTabs: {
    hd: '首屏页面顶部和底部'
  },
  blurToast: {
    hd: '轻提示'
  },
  blurModal: {
    hd: '模态框'
  }
} as const
