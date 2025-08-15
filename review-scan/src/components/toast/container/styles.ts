/*
 * @Author: czy0729
 * @Date: 2024-07-09 08:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-09 08:54:12
 */
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1999,
    top: 80,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  body: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
