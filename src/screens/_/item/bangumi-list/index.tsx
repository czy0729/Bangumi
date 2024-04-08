/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:12:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-08 10:20:17
 */
import React from 'react'
import { Component, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _ } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import { Cover } from '../../base'
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
          <Cover size={width} src={image} radius />
          <Text style={_.mt.sm} size={11} numberOfLines={2} bold>
            {HTMLDecode(name)}
          </Text>
        </Touchable>
      </Component>
    )
  },
  COMPONENT
)
