/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-09 08:59:50
 */
import React, { useMemo } from 'react'
import { Component, Cover, Flex, Link } from '@components'
import { _ } from '@stores'
import { cnjp } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { EVENT } from '@constants'
import { InView } from '../../base'
import Actors from './actors'
import Content from './content'
import More from './more'
import { COMPONENT, IMG_WIDTH, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'

import type { CoverProps } from '@components'
import type { MonoId } from '@types'
import type { Props as ItemCharacterProps } from './types'

export type { ItemCharacterProps }

export const ItemCharacter = ({
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
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    const monoId = (String(id).includes(type) ? id : `${type}/${id}`) as MonoId
    const cn = cnjp(nameCn, name).trim()
    const jp = cnjp(name, nameCn).trim()
    const linkProps = useMemo(
      () =>
        ({
          path: 'Mono',
          getParams: () => ({
            monoId,
            _name: cn,
            _jp: jp,
            _image: cover,
            _count: String(replies || '').replace('+', '')
          }),
          eventId: event.id,
          getEventData: () => ({
            to: 'Mono',
            monoId
          })
        } as const),
      [cn, jp, monoId]
    )

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

    return (
      <Component id='item-character' data-key={id} style={styles.container}>
        <Flex style={styles.wrap} align='start'>
          <InView style={styles.inView} y={y}>
            {!!cover && (
              <Link {...linkProps}>
                <Cover {...coverProps} />
              </Link>
            )}
          </InView>

          <Flex.Item style={_.ml.md}>
            <Content
              type={type}
              cn={cn}
              jp={jp}
              replies={replies}
              info={info}
              position={positions.length ? positions : [position]}
              positionDetails={positionDetails}
              linkProps={linkProps}
            />
            <Actors actors={actors} y={y} event={event} />
          </Flex.Item>

          {type === 'person' && <More monoId={monoId} name={cn} />}
        </Flex>

        {children}
      </Component>
    )
  })
}

export default ItemCharacter
