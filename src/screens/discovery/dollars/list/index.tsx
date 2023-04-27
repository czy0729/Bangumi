/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 17:04:47
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import Item from '../item'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  const { list } = $.dollars
  return (
    <ScrollView
      ref={$.forwardRef}
      style={_.container.wind}
      contentContainerStyle={_.container.bottom}
      {...SCROLL_VIEW_RESET_PROPS}
      keyboardDismissMode='on-drag'
      scrollEventThrottle={32}
      onScroll={$.onScroll}
    >
      {list.map((item, index) => (
        <Item key={item.id} index={index} {...item} />
      ))}
    </ScrollView>
  )
}

export default obc(List)
