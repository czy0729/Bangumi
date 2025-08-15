/*
 * @Author: czy0729
 * @Date: 2019-10-14 22:46:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 09:30:09
 */
import React from 'react'
import { Component } from '@components'
import { rakuenStore, userStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_RAKUEN_NEW_FLOOR_STYLE, MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants'
import { RakuenScrollDirection } from '@types'
import { Ctx } from '../../types'
import { TouchScroll } from './touch-scroll'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TouchScrollWrap({ onPress }) {
  const { $ } = useStore<Ctx>()
  const { scrollDirection } = rakuenStore.setting
  if (
    scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue<RakuenScrollDirection>('隐藏') ||
    !$.comments.list.length
  ) {
    return null
  }

  return (
    <Component id='screen-topic-touch-scroll'>
      <TouchScroll
        styles={memoStyles()}
        list={$.comments.list}
        readedTime={$.readed._time}
        scrollDirection={scrollDirection}
        directFloor={$.state.directFloor}
        isWebLogin={userStore.isWebLogin}
        newFloorStyle={MODEL_RAKUEN_NEW_FLOOR_STYLE.getLabel(rakuenStore.setting.newFloorStyle)}
        onPress={onPress}
      />
    </Component>
  )
}

export default ob(TouchScrollWrap, COMPONENT)
