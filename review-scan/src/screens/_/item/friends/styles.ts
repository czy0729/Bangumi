/*
 * @Author: czy0729
 * @Date: 2022-06-17 13:07:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-10 03:29:51
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingBottom: _.md,
    backgroundColor: _.colorPlain
  },
  avatar: {
    marginTop: 2,
    marginLeft: _.wind
  },
  item: {
    paddingTop: _.md - 2,
    paddingRight: _.wind,
    paddingBottom: _.sm + 2,
    marginLeft: _.md - 2
  },
  progress: {
    position: 'absolute',
    right: '32%',
    bottom: 0,
    left: 0,
    borderRadius: 8,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    overflow: 'hidden'
  },
  bar: {
    backgroundColor: 'transparent',
    borderBottomColor: _.colorPrimary,
    borderBottomWidth: 4,
    borderRadius: 4
  },
  hobby: {
    position: 'absolute',
    right: _.wind - _.sm,
    bottom: 0,
    paddingHorizontal: _.sm,
    marginBottom: -4,
    backgroundColor: _.colorPlain
  },
  count: {
    marginTop: _.sm,
    marginBottom: _.xs
  }
}))
