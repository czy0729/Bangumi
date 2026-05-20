/*
 * @Author: czy0729
 * @Date: 2026-05-21 01:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-21 01:30:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Touchable } from '@components'
import { Popover } from '@_'
import Content from '../content'

import type { Props } from './types'

function Main({ userId, avatar, name, filter, menuData, onPress, onSelect }: Props) {
  const elContent = <Content userId={userId} avatar={avatar} name={name} filter={filter} />

  if (menuData) {
    return (
      <Popover data={menuData} activateOn='hold' onSelect={onSelect}>
        <Touchable withoutFeedback onPress={onPress}>
          {elContent}
        </Touchable>
      </Popover>
    )
  }

  return (
    <Touchable animate scale={0.9} onPress={onPress}>
      {elContent}
    </Touchable>
  )
}

export default observer(Main)
