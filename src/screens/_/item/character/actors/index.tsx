/*
 * @Author: czy0729
 * @Date: 2024-08-24 13:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-09 09:18:37
 */
import React, { useCallback, useMemo } from 'react'
import { Cover, Flex, Link, Text } from '@components'
import { _ } from '@stores'
import { cnjp, stl } from '@utils'
import { useNavigation, useObserver } from '@utils/hooks'
import { HOST } from '@constants'
import {
  CHARACTERS_ACTORS_DATA,
  TEXT_COLLABS,
  TEXT_COLLECTIONS,
  TEXT_TOPIC,
  TEXT_WORKS,
  TEXT_WORKS_VOICE
} from '../ds'
import { InView, Popover } from '../../../base'
import { styles } from './styles'

import type { PersonId, TopicId } from '@types'
import type { Props } from './types'

function Actors({ actors, y, event }: Props) {
  const navigation = useNavigation()

  return useObserver(() => (
    <Flex style={_.mt.sm} wrap='wrap'>
      {actors.map(item => {
        const monoId = (String(item.id).includes('person') ? item.id : `person/${item.id}`).replace(
          /^\//g,
          ''
        ) as PersonId
        const name = cnjp(item.nameCn, item.name)

        const memoData = useMemo(() => [name, ...CHARACTERS_ACTORS_DATA], [name])
        const memoAction = useMemo(
          () => ({
            [TEXT_WORKS_VOICE]: () => navigation.push('Voices', { monoId, name }),
            [TEXT_WORKS]: () => navigation.push('Works', { monoId, name }),
            [TEXT_COLLABS]: () =>
              navigation.push('WebBrowser', {
                url: `${HOST}/${monoId}/collabs`,
                title: `${name}的合作`
              }),
            [TEXT_COLLECTIONS]: () =>
              navigation.push('WebBrowser', {
                url: `${HOST}/${monoId}/collections`,
                title: `谁收藏了${name}`
              }),
            [TEXT_TOPIC]: () =>
              navigation.push('Topic', {
                topicId: monoId.replace('person', 'prsn') as TopicId
              })
          }),
          [monoId, name]
        )

        const elContent = useMemo(
          () => (
            <>
              <Text size={11} bold numberOfLines={1}>
                {name}
              </Text>

              {!!item.job && (
                <Text type='sub' size={9} lineHeight={11} bold numberOfLines={1}>
                  {item.job}
                </Text>
              )}
            </>
          ),
          [item.job, name]
        )

        const handleSelect = useCallback(
          (label: string) => {
            if (typeof memoAction[label] === 'function') {
              memoAction[label]()
              return
            }

            navigation.push('Mono', { monoId })
          },
          [memoAction, monoId]
        )

        return (
          <Flex key={item.id} style={stl(styles.touch, actors.length <= 1 && styles.touchLg)}>
            <Link
              path='Mono'
              getParams={() => ({ monoId })}
              eventId={event.id}
              getEventData={() => ({
                to: 'Mono',
                monoId
              })}
            >
              <InView style={styles.inView} y={y}>
                <Cover src={item.cover} size={styles.inView.minWidth} radius={_.radiusXs} />
              </InView>
            </Link>

            <Flex.Item style={_.ml.sm}>
              <Popover data={memoData} onSelect={handleSelect}>
                {elContent}
              </Popover>
            </Flex.Item>
          </Flex>
        )
      })}
    </Flex>
  ))
}

export default Actors
