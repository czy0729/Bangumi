/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-25 01:43:53
 */
import React from 'react'
import { Component, Cover, Flex, Touchable } from '@components'
import { _ } from '@stores'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import { InView } from '../../base'
import Actors from './actors'
import Content from './content'
import { COMPONENT, IMG_WIDTH, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemCharacterProps } from './types'

export { ItemCharacterProps }

export const ItemCharacter = obc(
  (
    {
      event = EVENT,
      index,
      type = 'character',
      id,
      cover,
      name,
      nameCn,
      replies,
      info,
      actors = [],
      positions = [],
      position,
      children
    }: ItemCharacterProps,
    { navigation }
  ) => {
    const styles = memoStyles()
    const cn = cnjp(nameCn, name).trim()
    const jp = cnjp(name, nameCn).trim()
    const y = ITEM_HEIGHT * index + 1
    const handlePress = () => {
      const monoId = String(id).includes(type) ? id : `${type}/${id}`
      navigation.push('Mono', {
        monoId,
        _name: cn,
        _jp: jp,
        _image: cover
      })

      t(event.id, {
        to: 'Mono',
        monoId
      })
    }

    return (
      <Component id='item-character' data-key={id} style={styles.container}>
        <Flex style={styles.wrap} align='start'>
          <InView style={styles.inView} y={y}>
            {!!cover && (
              <Touchable animate scale={0.9} onPress={handlePress}>
                <Cover src={cover} width={IMG_WIDTH} height={IMG_WIDTH} radius />
              </Touchable>
            )}
          </InView>
          <Flex.Item style={_.ml.wind}>
            <Content
              cn={cn}
              jp={jp}
              replies={replies}
              info={info}
              position={positions.length ? positions : [position]}
              onPress={handlePress}
            />
            <Actors navigation={navigation} actors={actors} y={y} event={event} />
          </Flex.Item>
        </Flex>
        {children}
      </Component>
    )
  },
  COMPONENT
)

export default ItemCharacter
