/*
 * @Author: czy0729
 * @Date: 2022-06-17 19:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 22:29:03
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  avatarWrapLeft: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    bottom: 0,
    width: 40,
    height: 40
  },
  avatarWrapRight: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    width: 40,
    height: 40
  },
  contentLeft: {
    maxWidth: '88%',
    marginBottom: 24,
    marginLeft: 24
  },
  contentRight: {
    maxWidth: '88%',
    marginLeft: '12%',
    marginBottom: 24,
    marginRight: 24
  },
  text: {
    maxWidth: '100%',
    padding: 12,
    marginRight: 24,
    backgroundColor: _.colorPlain,
    borderRadius: 16
  },
  textActive: {
    marginRight: 0,
    marginLeft: 24,
    backgroundColor: _.colorPrimary,
    borderTopLeftRadius: 16
  },
  baseFontStyle: {
    fontSize: 14 + _.fontSizeAdjust,
    lineHeight: 22
  },
  baseFontStyleRight: {
    fontSize: 14 + _.fontSizeAdjust,
    lineHeight: 22,
    color: _.__colorPlain__
  },
  linkStyleRight: {
    color: _.__colorPlain__,
    textDecorationColor: _.__colorPlain__
  }
}))
