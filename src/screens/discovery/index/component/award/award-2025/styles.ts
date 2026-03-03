/*
 * @Author: czy0729
 * @Date: 2026-02-13 15:08:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-03 23:08:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const height = _.device(128, 164)
  const width = _.device(128, 164) * 2 + 16

  return {
    container: {
      height,
      marginRight: _.md
    },
    item: {
      width,
      height,
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#743c45',
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.4,
      shadowRadius: 14,
      elevation: 6
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height
    },
    innerBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      borderWidth: 1,
      borderColor: '#743c45'
    },
    titlebar: {
      justifyContent: 'center',
      height: 35,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#743c45'
    },
    title: {
      fontFamily: 'monospace',
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.5,
      color: '#ffe5ec'
    },
    console: {
      flex: 1,
      paddingVertical: 8,
      paddingRight: 16,
      paddingLeft: 10
    },
    consoleBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height
    },
    line: {
      fontFamily: 'monospace',
      fontSize: 11,
      fontWeight: '400',
      lineHeight: 16,
      letterSpacing: -0.1,
      color: '#ffdbe6'
    },
    muted: {
      color: '#d99aa8'
    },
    success: {
      color: '#ffb5c7'
    },
    commandRow: {
      alignItems: 'center',
      marginTop: 4
    },
    prompt: {
      color: '#ff9fb6',
      fontFamily: 'monospace',
      fontSize: 11,
      fontWeight: '400',
      letterSpacing: -0.1
    },
    command: {
      marginLeft: 4,
      color: '#ffeef3',
      fontFamily: 'monospace',
      fontSize: 11,
      fontWeight: '400',
      letterSpacing: -0.1
    },
    cursor: {
      width: 7,
      height: 12,
      marginLeft: 2,
      backgroundColor: '#f09199',
      shadowColor: '#f09199',
      shadowOpacity: 0.7,
      shadowRadius: 6
    },
    fixed: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      right: 0
    },
    tba: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      marginTop: 8,
      marginRight: 8,
      marginBottom: 16,
      marginLeft: 16,
      color: 'rgba(255, 255, 255, 0.4)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: _.radiusXs
    }
  }
})
