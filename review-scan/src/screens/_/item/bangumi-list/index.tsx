/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:12:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 05:14:38
 */
import React from 'react'
import { Component, Cover, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _ } from '@stores'
import { HTMLDecode, stl, x18 } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemBangumiListProps } from './types'

export { ItemBangumiListProps }

export const ItemBangumiList = ob(
  ({ navigation, style, subjectId, image, name, event = EVENT }: ItemBangumiListProps) => {
    const styles = memoStyles()
    const { width } = styles.item
    return (
      <Component id='item-bangumi-list' data-key={subjectId} style={stl(styles.item, style)}>
        <Touchable
          animate
          scale={0.9}
          onPress={() => {
            const { id, data = {} } = event
            t(id, {
              to: 'Subject',
              subjectId,
              ...data
            })

            navigation.push('Subject', {
              subjectId,
              _cn: name,
              _image: getCoverSrc(image, width)
            })
          }}
        >
          <Cover size={width} src={image} radius cdn={!x18(subjectId)} />
          <Text style={_.mt.sm} size={11} bold numberOfLines={3}>
            {HTMLDecode(name)}
          </Text>
        </Touchable>
      </Component>
    )
  },
  COMPONENT
)

export default ItemBangumiList
