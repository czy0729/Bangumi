/*
 * @Author: czy0729
 * @Date: 2021-12-01 05:37:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-01 05:48:13
 */
import { contextTypes } from '@constants'
import inject from './inject'
import withHeader from './withHeader'

function injectWithHeader(Store, Component, withHeaderParams) {
  Component.contextTypes = contextTypes
  return inject(Store)(withHeader(withHeaderParams)(Component))
}

export default injectWithHeader
