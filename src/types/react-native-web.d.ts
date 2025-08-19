/*
 * @Author: czy0729
 * @Date: 2025-08-19 17:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-19 17:50:38
 */
import 'react-native'

declare module 'react-native' {
  interface TextStyle {
    whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap'
    userSelect?: 'auto' | 'text' | 'none' | 'contain' | 'all'
    cursor?: string
    fontVariationSettings?: string
  }
}
