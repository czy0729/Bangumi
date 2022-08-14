/*
 * @Author: czy0729
 * @Date: 2022-06-14 22:57:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 15:53:14
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  itemNew: {
    backgroundColor: _.colorMainLight
  },
  itemJump: {
    borderBottomWidth: 2,
    borderColor: _.colorSuccess
  },
  image: {
    marginTop: _.md,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.md,
    paddingRight: _.wind,
    marginLeft: _.sm
  },
  sub: {
    marginTop: _.md,
    marginBottom: -20
  },
  expand: {
    paddingTop: _.sm,
    paddingBottom: _.md,
    marginLeft: 44
  },
  translate: {
    padding: _.sm,
    marginTop: _.sm,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
