/*
 * @Author: czy0729
 * @Date: 2019-09-11 16:59:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-21 01:32:17
 */
import { _ } from '@stores'

export const withHeaderParams = () => ({
  headerStyle: {
    backgroundColor: _.colorTinygrailContainer,
    borderBottomColor: _.colorTinygrailContainer
  },
  headerTitleStyle: {
    color: _.colorTinygrailPlain
  },
  iconBackColor: _.colorTinygrailPlain,
  statusBarEvents: false
})
