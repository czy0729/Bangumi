/*
 * @Author: czy0729
 * @Date: 2019-09-11 16:59:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 04:55:43
 */
import { _ } from '@stores'
import { keyExtractor } from '@utils'

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

export const TINYGRAIL_LIST_PROPS = {
  keyExtractor,
  style: _.container.flex,
  contentContainerStyle: _.container.bottom,
  refreshControlProps,
  footerTextType: 'tinygrailText'
} as const
