/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:12:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:41:04
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Cover, Link, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _, systemStore } from '@stores'
import { HTMLDecode, stl, x18 } from '@utils'
import { r } from '@utils/dev'
import { EVENT } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as ItemBangumiListProps } from './types'
export type { ItemBangumiListProps }

export const ItemBangumiList = observer(
  ({ style, subjectId, image, name, event = EVENT }: ItemBangumiListProps) => {
    r(COMPONENT)

    const styles = memoStyles()

    const { width } = styles.item
    const text = HTMLDecode(name)

    return (
      <Component id='item-bangumi-list' data-key={subjectId} style={stl(styles.item, style)}>
        <Link
          path='Subject'
          getParams={() => ({
            subjectId,
            _cn: name,
            _image: getCoverSrc(image, width)
          })}
          eventId={event.id}
          getEventData={() => ({
            to: 'Subject',
            subjectId,
            ...event?.data
          })}
        >
          <Cover size={width} src={image} radius cdn={!x18(subjectId)} />
          <Text
            style={_.mt.sm}
            size={text.length > 14 ? 10 : 11}
            bold
            align={systemStore.setting.zoneAlignCenter ? 'center' : 'left'}
            numberOfLines={3}
          >
            {text}
          </Text>
        </Link>
      </Component>
    )
  }
)

export default ItemBangumiList
