/*
 * 样式
 * @Author: czy0729
 * @Date: 2019-11-30 10:30:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-23 14:53:21
 */
import { Appearance } from 'react-native'
import { STORYBOOK } from '@constants'
import Action from './action'
import { DEFAULT_MODE, DEFAULT_TINYGRAIL_MODE, NAMESPACE } from './init'

class ThemeStore extends Action {
  init = async () => {
    // 遗漏问题, 版本前有部分用户安卓 9 启用了跟随系统设置, 需要排除掉
    if (this.autoColorScheme) {
      this.toggleMode(Appearance.getColorScheme())
    } else {
      const mode = STORYBOOK
        ? DEFAULT_MODE
        : await this.getStorage('mode', NAMESPACE, DEFAULT_MODE)
      this.toggleMode(mode)
    }

    this.setState({
      tinygrailMode: await this.getStorage(
        'tinygrailMode',
        NAMESPACE,
        DEFAULT_TINYGRAIL_MODE
      ),
      tinygrailThemeMode: await this.getStorage(
        'tinygrailThemeMode',
        NAMESPACE,
        DEFAULT_TINYGRAIL_MODE
      ),
      fontSizeAdjust: await this.getStorage('fontSizeAdjust', NAMESPACE, 0)
    })

    return true
  }
}

const themeStore = new ThemeStore()

export type ThemeStoreType = typeof themeStore

export default themeStore
