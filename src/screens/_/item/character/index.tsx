/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-14 21:05:04
 */
import React from 'react'
import { Component, Cover, CoverProps, Flex, Touchable } from '@components'
import { _ } from '@stores'
import { cnjp } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { EVENT } from '@constants'
import { MonoId } from '@types'
import { InView } from '../../base'
import Actors from './actors'
import Content from './content'
import { COMPONENT, IMG_WIDTH, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemCharacterProps } from './types'

export { ItemCharacterProps }

export const ItemCharacter = ob(
  ({
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
    positionDetails = [],
    position,
    children
  }: ItemCharacterProps) => {
    const navigation = useNavigation()
    const styles = memoStyles()
    const cn = cnjp(nameCn, name).trim()
    const jp = cnjp(name, nameCn).trim()
    const y = ITEM_HEIGHT * (index + 1)

    const coverProps: CoverProps = {
      src: cover
    }
    if (cover && typeof cover === 'string') {
      coverProps.autoSize = IMG_WIDTH
    } else {
      coverProps.width = IMG_WIDTH
      coverProps.height = IMG_WIDTH
    }

    const handlePress = () => {
      const monoId = (String(id).includes(type) ? id : `${type}/${id}`) as MonoId
      navigation.push('Mono', {
        monoId,
        _name: cn,
        _jp: jp,
        _image: cover,
        _count: String(replies || '').replace('+', '')
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
                <Cover {...coverProps} />
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
              positionDetails={positionDetails}
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
