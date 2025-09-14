/*
 * @Author: czy0729
 * @Date: 2022-06-17 19:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 23:08:27
 */
import { _ } from '@stores'
import { AVATAR_SIZE } from './ds'

const MARGIN = 28

export const memoStyles = _.memoStyles(() => ({
  avatarWrap: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    minWidth: AVATAR_SIZE,
    minHeight: AVATAR_SIZE
  },
  avatarWrapLeft: {
    left: 0
  },
  avatarWrapRight: {
    right: 0
  },
  content: {
    maxWidth: '88%',
    marginBottom: MARGIN
  },
  contentLeft: {
    marginLeft: MARGIN
  },
  contentRight: {
    marginLeft: '12%',
    marginRight: MARGIN
  },
  text: {
    maxWidth: '100%',
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginRight: 24,
    backgroundColor: _.colorPlain,
    borderRadius: _.radiusSm
  },
  textActive: {
    marginRight: 0,
    marginLeft: 24,
    borderBottomWidth: 3,
    borderBottomColor: _.colorPrimary,
    borderTopLeftRadius: _.radiusSm
  },
  baseFontStyle: {
    fontSize: 14 + _.fontSizeAdjust,
    lineHeight: 22
  }
}))
