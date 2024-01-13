/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:12:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 23:04:35
 */
import React from 'react'
import { Component, Text, Touchable } from '@components'
import { _ } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import { Images } from '@types'
import { Cover } from '../../base'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemBangumiListProps } from './types'

export { ItemBangumiListProps }

export const ItemBangumiList = ob(
  ({
    navigation,
    style,
    subjectId,
    images = {} as Images,
    name,
    event = EVENT
  }: ItemBangumiListProps) => {
    const styles = memoStyles()
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
              _image: images.small
            })
          }}
        >
          <Cover size={styles.item.width} src={images.small} radius shadow />
          <Text style={_.mt.sm} size={11} numberOfLines={2} bold>
            {HTMLDecode(name)}
          </Text>
        </Touchable>
      </Component>
    )
  },
  COMPONENT
)
