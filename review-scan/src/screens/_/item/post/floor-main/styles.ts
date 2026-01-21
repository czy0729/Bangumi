/*
 * @Author: czy0729
 * @Date: 2024-01-23 18:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 15:06:51
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  content: {
    paddingLeft: _.sm
  },
  html: {
    paddingRight: _.sm,
    marginTop: _.sm
  },
  translate: {
    padding: _.sm,
    marginTop: _.sm,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  likes: {
    marginBottom: -12
  },
  name: {
    maxWidth: '90%'
  },
  userAge: {
    marginTop: 3
  }
}))
