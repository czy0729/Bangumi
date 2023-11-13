/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:12:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 22:06:30
 */
import React from 'react'
import { Touchable, Text, Component } from '@components'
import { _ } from '@stores'
import { stl, HTMLDecode } from '@utils'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { Images } from '@types'
import { Cover } from '../../base'
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
      <Component
        id='item-bangumi-list'
        data-key={subjectId}
        style={stl(styles.item, style)}
      >
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
  }
)
