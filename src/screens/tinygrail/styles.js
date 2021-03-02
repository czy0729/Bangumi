/*
 * @Author: czy0729
 * @Date: 2019-09-11 16:59:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-01 18:18:43
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

export const refreshControlProps = {
  titleColor: _.colorTinygrailText,
  tintColor: _.colorTinygrailText
}
