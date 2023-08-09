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
  },
  androidBlur: {
    hd: '[实验性] 毛玻璃布局',
    information:
      '在首页顶部和底部 UI，启用仿 iOS 毛玻璃效果\n因在安卓里，毛玻璃的实现需要消耗大量资源，很有可能出现明显掉帧情况，仅建议最新型号的手机尝试开启'
  }
} as const
