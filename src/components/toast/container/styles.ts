/*
 * @Author: czy0729
 * @Date: 2024-07-09 08:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import { StyleSheet } from 'react-native'
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

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

export const memoStyles = _.memoStyles(() => ({
  innerContainer: {
    backgroundColor: 'transparent'
  },
  innerWrap: {
    alignItems: 'center',
    backgroundColor: _.select('rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.85)'),
    minWidth: 100
  },
  iconToast: {
    borderRadius: _.radiusLg,
    padding: _.lg
  },
  textToast: {
    borderRadius: _.radiusSm,
    paddingVertical: _.md,
    paddingHorizontal: _.lg
  },
  content: {
    color: 'white',
    fontSize: _.fontSize(15)
  },
  image: {
    marginBottom: _.xs
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: _.md
  }
}))