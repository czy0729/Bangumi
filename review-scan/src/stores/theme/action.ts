/*
 * @Author: czy0729
 * @Date: 2023-04-23 14:27:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 22:04:25
 */
import { Appearance, StyleSheet } from 'react-native'
import { androidDayNightToggle, feedback, info, runAfter } from '@utils'
import { IOS, WEB, WSA } from '@constants'
import _, { IS_IOS_5_6_7_8 } from '@styles'
import { AnyObject, SelectFn, SettingFontsizeadjust } from '@types'
import systemStore from '../system'
import Computed from './computed'
import { STYLES_DARK, STYLES_LIGHT } from './init'
import { getMemoStyles, getMemoStylesHash } from './utils'
import { Mode, Orientation, Styles, TinygrailMode } from './types'

export default class Action extends Computed {
  /** 设备选择, 平板设备使用第二个值 */
  device: SelectFn = (mobileValue, padValue) => {
    return this.isPad ? padValue : mobileValue
  }

  /** 平台选择, 安卓平台使用第二个值 */
  ios: SelectFn = (iosValue, androidValue) => {
    return IOS ? iosValue : androidValue
  }

  /** 平台选择, 网页平台使用第一个值 */
  web: SelectFn = (webValue, otherValue) => {
    return WEB ? webValue : otherValue
  }

  /** 主题选择, 黑暗模式使用第二个值 */
  select: SelectFn = (lightValue, darkValue) => {
    return this.isDark ? darkValue : lightValue
  }

  /** 目前支持的所有平台选择 */
  platforms = (ios: any, ios_5678: any, android: any, wsa: any, web?: any) => {
    if (WEB && web !== undefined) return web

    if (IOS) {
      if (IS_IOS_5_6_7_8) return ios_5678

      return ios
    }

    if (WSA) return wsa

    return android
  }

  /** 方向选择, 水平方向使用第二个值 */
  portrait: SelectFn = (portaitValue, landscapeValue) => {
    return this.isLandscape ? landscapeValue : portaitValue
  }

  /** 自适应计数, 只支持 number, 手机垂直布局使用原始值, 横屏 +1, 平板再 +1 */
  num = (num = 0) => {
    if (this.isLandscape) num += 1
    if (this.isPad) num += 1
    return num
  }

  /** 手机 * 1, 平板 * ratio */
  r = (px: number = 0) => {
    // @ts-expect-error
    return Math.floor(this.ratio * px)
  }

  /** 黑暗模式下, 深黑使用第一个值, 非深黑模式使用第二个值 */
  deep: SelectFn = (deepDarkValue, darkValue) => {
    return this.deepDark ? deepDarkValue : darkValue
  }

  /** @deprecated 小圣杯主题选择, 白天模式使用第二个值 */
  tSelect = this.select
  // tSelect: SelectFn = (lightValue, darkValue) => {
  //   return this.isTinygrailDark ? lightValue : darkValue
  // }

  /** 切换主题模式 */
  toggleMode = async (mode?: Mode) => {
    // web 端暂不开放白天模式
    if (WEB && mode === 'light') return false

    const key = 'mode'
    if (mode === 'light') {
      this.setState({
        [key]: 'light',
        ...STYLES_LIGHT
      })
    } else if (mode === 'dark') {
      this.setState(
        // @ts-expect-error
        this.deepDark
          ? {
              [key]: 'dark',
              ...STYLES_DARK,
              ..._._colorThemeDeepDark
            }
          : {
              [key]: 'dark',
              ...STYLES_DARK
            }
      )
    } else {
      // @ts-expect-error
      this.setState({
        [key]: this.select('dark', 'light'),
        ...this.select(
          this.deepDark
            ? {
                ...STYLES_DARK,
                ..._._colorThemeDeepDark
              }
            : STYLES_DARK,
          STYLES_LIGHT
        )
      })
    }

    this.save(key)
    this.changeNavigationBarColor()
    androidDayNightToggle(this.isDark)

    // 若用户启用了主题跟随系统, 而切换后与系统主题不一致, 需要提醒
    if (systemStore.setting.autoColorScheme) {
      const colorScheme = Appearance.getColorScheme()
      if (colorScheme && this.mode && colorScheme !== this.mode) {
        info('请注意: 当前设置了跟随系统主题')
        feedback(true)
      }
    }
  }

  /** 切换方向 */
  toggleOrientation = (orientation: Orientation) => {
    this.setState({
      orientation,
      ..._.getAppLayout()
    })
  }

  /** 主动更新 window layout */
  updateLayout() {
    const state: AnyObject = {
      ..._.getAppLayout()
    }
    if (WSA) state.wsaLayoutChanged = this.wsaLayoutChanged + 1
    this.setState(state)
  }

  /** 格子布局分拆工具函数 */
  grid = (num: number = 3) => {
    const marginLeft = this.device(14, 24)
    const width = Math.floor((this.window.contentWidth - (num - 1) * marginLeft) / num)
    return {
      width,
      height: Math.floor(width * 1.4),
      marginLeft
    }
  }

  /** @deprecated 切换小圣杯主题模式 */
  toggleTinygrailThemeMode = () => {
    // const key = 'tinygrailThemeMode'
    // this.setState({
    //   [key]: this.tSelect('light', 'dark')
    // })
    // this.save(key)
  }

  /** 切换小圣杯涨跌颜色 */
  toggleTinygrailMode = (type?: TinygrailMode) => {
    const { tinygrailMode } = this.state
    const key = 'tinygrailMode'
    this.setState({
      [key]: type === 'web' ? 'web' : tinygrailMode === 'green' ? 'red' : 'green'
    })
    this.save(key)
  }

  /** 改变整体字号 */
  changeFontSizeAdjust = (fontSizeAdjust: SettingFontsizeadjust = '0') => {
    const key = 'fontSizeAdjust'
    this.setState({
      [key]: Number(fontSizeAdjust)
    })
    this.save(key)
  }

  /** 安卓改变底部菜单颜色 */
  changeNavigationBarColor = () => {
    if (IOS) return

    runAfter(() => {
      try {
        androidDayNightToggle(this.isDark)
      } catch (error) {
        console.error('[ThemeStore] changeNavigationBarColor', error)
      }
    })
  }

  /** 小圣杯模块, 安卓改变底部菜单颜色 */
  changeNavigationBarColorTinygrail = () => {
    if (IOS) return

    runAfter(() => {
      try {
        androidDayNightToggle(this.isDark)
      } catch (error) {
        console.error('[ThemeStore] changeNavigationBarColorTinygrail', error)
      }
    })
  }

  /**
   * 生成 APP 内能动态切换主题的, 记忆 styles 的核心函数
   *  - 所有需要动态切换的样式都应通过此函数包裹样式后导出到组件里面使用
   */
  memoStyles = <T extends Styles<T>>(
    styles: (currentThemeStore?: any) => T,
    dev: boolean = false
  ) => {
    const item = getMemoStyles()
    return () => {
      /**
       * 通过闭包使每一个组件里面的 StyleSheet.create 都被缓存
       * 当会影响到全局样式的设置 (mode | tMode | deepDark | orientation | customFontFamily) 改变了
       * 会重新调用 StyleSheet.create, 配合 mobx -> observer 触发重新渲染
       * */
      const hash = getMemoStylesHash([
        this.mode,
        // this.tinygrailThemeMode,
        this.deepDark,
        this.orientation,
        this.customFontFamily,
        this.wsaLayoutChanged
      ])
      if (!item._styles || !item._hash || item._hash !== hash) {
        item._hash = hash

        const computedStyles: any = styles(this)

        /** @deprecated current 逻辑复杂用不上, 请勿再使用此特性 */
        if (computedStyles.current) {
          const { current, ...otherStyles } = computedStyles
          item._styles = StyleSheet.create(otherStyles)
          item._styles.current = current
        } else {
          item._styles = StyleSheet.create(computedStyles)
        }

        if (dev) console.info(item)
      }

      return item._styles as T
    }
  }
}
