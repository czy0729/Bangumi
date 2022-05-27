/*
 * @Author: czy0729
 * @Date: 2022-01-10 11:09:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 08:01:53
 */
import { contextTypes } from '@constants/constants'
import inject from './inject'

function injectWithBottomTab(Store, Component, navigationOptions) {
  Component.contextTypes = contextTypes
  Component.navigationOptions = {
    ...navigationOptions,
    header: null
  }
  return inject(Store)(Component)
}

export default injectWithBottomTab
