/*
 * @Author: czy0729
 * @Date: 2022-09-07 03:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 13:51:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  filter: {
    paddingVertical: 12
  },
  container: {
    flex: 1,
    backgroundColor: _.colorPlain
  },
  refresh: {
    marginRight: -24
  },
  touch: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginHorizontal: 2
  },
  block: {
    width: '80%',
    marginTop: _.sm
  },
  l: {
    width: 18,
    height: 18,
    marginRight: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: _.colorBorder,
    overflow: 'hidden'
  },
  l1: {
    backgroundColor: _.select('rgb(210, 210, 210)', 'rgb(12, 12, 12)')
  },
  l2: {
    backgroundColor: _.select('rgb(222, 222, 222)', 'rgb(20, 20, 20)')
  },
  l3: {
    backgroundColor: _.select('rgb(238, 238, 238)', 'rgb(36, 36, 36)')
  },
  l4: {
    backgroundColor: _.select('rgb(255, 255, 255)', 'rgb(52, 52, 52)')
  }
}))
