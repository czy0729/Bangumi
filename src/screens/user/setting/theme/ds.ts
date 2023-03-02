/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 19:16:35
 */
export const TEXTS = {
  theme: {
    setting: {
      title: '主题',
      information: `点击顶部 Logo 亦可快速切换黑白模式，长按 Logo 则前往设置\n两种黑暗模式之间切换需要重新启动才能正确生效`
    },
    light: {
      title: '明亮'
    },
    deepDark: {
      title: '纯黑'
      // information: 'AMOLED 更省电'
    },
    dark: {
      title: '黑暗'
    }
  },
  autoColorScheme: {
    hd: '跟随系统',
    information: '启动 App 时黑白主题是否跟随系统'
  }
} as const
