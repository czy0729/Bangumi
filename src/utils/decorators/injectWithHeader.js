/*
 * @Author: czy0729
 * @Date: 2021-12-01 05:37:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 08:02:01
 */
import { contextTypes } from '@constants/constants'
import inject from './inject'
import withHeader from './withHeader'

function injectWithHeader(Store, Component, withHeaderParams) {
  Component.contextTypes = contextTypes
  return inject(Store)(withHeader(withHeaderParams)(Component))
}

export default injectWithHeader
