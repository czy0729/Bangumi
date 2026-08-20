/*
 * @Author: czy0729
 * @Date: 2026-08-20 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 00:00:00
 */
import { View } from 'react-native'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { memoStyles } from './styles'

import type { ReactNode, ViewStyle } from '@types'
import type { Props } from './types'

/** 计算分割样式（标题左侧色条 / 下划线） */
export function getSplitStyles(splitStyles: Props['splitStyles']) {
  if (!splitStyles) {
    return {
      /** 标题左侧色条 */
      splitStylesTitle: null,

      /** 标题下划线 */
      splitStylesUnderline: null
    } as const
  }

  const styles = memoStyles()

  let splitStylesTitle: ReactNode = null
  let splitStylesUnderline: ReactNode = null

  const { subjectSplitStyles } = systemStore.setting
  const value = String(subjectSplitStyles || '')

  if (value.startsWith('title-')) {
    const styleMap: Record<string, ViewStyle> = {
      main: styles.titleMain,
      warning: styles.titleWarning,
      primary: styles.titlePrimary,
      success: styles.titleSuccess
    }
    const styleKey = value.split('-')[1] || 'main'
    const selectedStyle = styleMap[styleKey] || styles.titleMain
    splitStylesTitle = <View style={stl(styles.title, selectedStyle)} />
  } else if (value.startsWith('underline-')) {
    const styleMap: Record<string, ViewStyle> = {
      main: styles.underlineMain,
      warning: styles.underlineWarning,
      primary: styles.underlinePrimary,
      success: styles.underlineSuccess
    }
    const styleKey = value.split('-')[1] || 'main'
    const selectedStyle = styleMap[styleKey] || styles.underlineMain
    splitStylesUnderline = <View style={stl(styles.underline, selectedStyle)} />
  }

  return {
    /** 标题左侧色条 */
    splitStylesTitle,

    /** 标题下划线 */
    splitStylesUnderline
  } as const
}
