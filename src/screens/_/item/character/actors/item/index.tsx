/*
 * @Author: czy0729
 * @Date: 2026-09-04 03:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 03:45:00
 *
 * 单个声优条目: 头像 + 名称, 点击名称弹出 Popover 菜单
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Cover, Flex, Link, Text } from '@components'
import { _ } from '@stores'
import { cnjp, getMonoCoverSmall, stl } from '@utils'
import { useNavigation } from '@utils/hooks'
import { EVENT, HOST, IMG_INFO_ONLY } from '@constants'
import {
  CHARACTERS_ACTORS_DATA,
  TEXT_COLLABS,
  TEXT_COLLECTIONS,
  TEXT_TOPIC,
  TEXT_WORKS,
  TEXT_WORKS_VOICE
} from '../../ds'
import { InView, Popover } from '../../../../base'
import { styles } from './styles'

import type { PersonId, TopicId } from '@types'
import type { Props } from './types'

function ActorItem({ item, y, event = EVENT, single }: Props) {
  const navigation = useNavigation()

  const monoId = (String(item.id).includes('person') ? item.id : `person/${item.id}`).replace(
    /^\//g,
    ''
  ) as PersonId
  const name = cnjp(item.nameCn, item.name)

  const handleSelect = useCallback(
    (label: string) => {
      const actions: Record<string, () => void> = {
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
      }

      if (typeof actions[label] === 'function') {
        actions[label]()
        return
      }

      navigation.push('Mono', { monoId })
    },
    [monoId, name, navigation]
  )

  return (
    <Flex style={stl(styles.touch, single && styles.touchLg)}>
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
          <Cover
            src={getMonoCoverSmall(item.cover) || IMG_INFO_ONLY}
            size={styles.inView.minWidth}
            radius={_.radiusXs}
          />
        </InView>
      </Link>

      <Flex.Item style={_.ml.sm}>
        <Popover data={[name, ...CHARACTERS_ACTORS_DATA]} onSelect={handleSelect}>
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
        </Popover>
      </Flex.Item>
    </Flex>
  )
}

export default observer(ActorItem)
