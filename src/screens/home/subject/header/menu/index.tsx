/*
 * @Author: czy0729
 * @Date: 2024-05-18 03:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-29 06:26:39
 */
import React from 'react'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import Location from '../location'
import MenuComponent from '../menu-component'
import MesumeChat from '../mesume-chat'
import { Props } from './types'

function Menu({ onScrollTo }: Props) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const color = _.isDark || !$.state.fixed ? '#fff' : '#000'
    return (
      <Flex>
        <MesumeChat color={color} />
        <Location color={color} onScrollTo={onScrollTo} />
        <MenuComponent color={color} />
      </Flex>
    )
  })
}

export default Menu
