/*
 * @Author: czy0729
 * @Date: 2025-03-22 21:27:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-23 22:56:06
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

function Extra() {
  r(COMPONENT)

  return useObserver(() => (
    <>
      <Heatmap id='登陆.登陆' right={_.wind} bottom={_.bottom + 120} transparent />
      <Heatmap id='登陆.成功' right={_.wind} bottom={_.bottom + 86} transparent />
      <Heatmap id='登陆.错误' right={_.wind} bottom={_.bottom + 52} transparent />
      <Heatmap id='登陆' screen='Login' />
    </>
  ))
}

export default Extra
