/*
 * @Author: czy0729
 * @Date: 2024-05-18 03:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:14:49
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import Location from '../location'
import MenuComponent from '../menu-component'
import MesumeChat from '../mesume-chat'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Menu({ onScrollTo }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const color = _.isDark || !$.state.fixed ? '#fff' : '#000'

  return (
    <Flex>
      <MesumeChat color={color} />
      <Location color={color} onScrollTo={onScrollTo} />
      <MenuComponent color={color} />
    </Flex>
  )
}

export default observer(Menu)
