/*
 * @Author: czy0729
 * @Date: 2019-10-14 22:46:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 20:06:10
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { MODEL_RAKUEN_SCROLL_DIRECTION, STORYBOOK } from '@constants'
import { RakuenScrollDirection } from '@types'
import { Ctx } from '../types'
import { TouchScroll } from './touch-scroll'
import { memoStyles } from './styles'

export default obc(({ onPress, onDirect }, { $ }: Ctx) => {
  // global.rerender('Topic.TouchScroll')

  if (STORYBOOK) return null

  const { scrollDirection } = $.setting
  const { list } = $.comments
  if (
    scrollDirection ===
      MODEL_RAKUEN_SCROLL_DIRECTION.getValue<RakuenScrollDirection>('隐藏') ||
    !list.length
  ) {
    return null
  }

  return (
    <TouchScroll
      styles={memoStyles()}
      list={list}
      readedTime={$.readed._time}
      scrollDirection={scrollDirection}
      directFloor={$.state.directFloor}
      isWebLogin={$.isWebLogin}
      onPress={onPress}
      onDirect={onDirect}
    />
  )
})
