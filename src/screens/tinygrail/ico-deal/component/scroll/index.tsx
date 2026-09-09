/*
 * @Author: czy0729
 * @Date: 2024-03-01 23:27:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:30:24
 */
import { observer } from 'mobx-react'
import { _, useStore } from '@stores'
import TinygrailScrollView from '@tinygrail/_/scroll-view'
import Info from '../info'
import Initial from '../initial'
import Slider from '../slider'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Scroll() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <TinygrailScrollView contentContainerStyle={_.container.bottom} onRefresh={$.refresh}>
      <Info />
      <Slider />
      <Initial />
    </TinygrailScrollView>
  )
}

export default observer(Scroll)
