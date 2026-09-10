/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:26:05
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 07:26:05
 */
import { _ } from '@stores'

/**
 * 只用 flex, 不写底色
 * 这层包住整个导航栈 (仅 iOS), 底色由外层 App.tsx 的 SafeAreaProvider (container.plain) 兜底
 * 且 _.create 是静态的 StyleSheet.create, 写主题色不会跟随主题变化
 */
export const styles = _.create({
  flex: {
    flex: 1
  }
})
