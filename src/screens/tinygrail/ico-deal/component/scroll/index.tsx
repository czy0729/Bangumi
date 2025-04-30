/*
 * @Author: czy0729
 * @Date: 2024-03-01 23:27:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:47:31
 */
import React from 'react'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import TinygrailScrollView from '@tinygrail/_/scroll-view'
import { Ctx } from '../../types'
import Info from '../info'
import Initial from '../initial'
import Slider from '../slider'
import { COMPONENT } from './ds'

function Scroll() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <TinygrailScrollView contentContainerStyle={_.container.bottom} onRefresh={$.refresh}>
      <Info />
      <Slider />
      <Initial />
    </TinygrailScrollView>
  ))
}

export default Scroll
