/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:50:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-09-12 18:50:11
 */
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  holdItem: { zIndex: 10, position: 'absolute' },
  portalOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 15
  }
})

export default styles
