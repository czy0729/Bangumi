/*
 * @Author: czy0729
 * @Date: 2022-07-10 03:36:28
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-07-10 03:36:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.md,
    paddingHorizontal: _.wind
  },
  sectionTitle: {
    height: 28
  },
  btn: {
    marginTop: _.md,
    backgroundColor: _.colorPlain,
    borderRadius: _.radiusSm,
    shadowColor: _.colorShadow,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    elevation: 2,
    overflow: _.ios(undefined, 'hidden')
  },
  left: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  right: {
    marginLeft: -_.hairlineWidth,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  hide: {
    position: 'absolute',
    zIndex: 1,
    top: -10,
    right: -_.sm
  }
}))
