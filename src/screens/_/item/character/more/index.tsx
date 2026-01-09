/*
 * @Author: czy0729
 * @Date: 2026-01-09 08:01:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-09 09:18:23
 */
import React, { useCallback, useMemo } from 'react'
import { Flex, Iconfont } from '@components'
import { useNavigation, useObserver } from '@utils/hooks'
import { HOST } from '@constants'
import { PERSONS_ACTORS_DATA, TEXT_COLLABS, TEXT_COLLECTIONS, TEXT_TOPIC, TEXT_WORKS } from '../ds'
import { Popover } from '../../../base'
import { styles } from './styles'

import type { PersonId, TopicId } from '@types'
import type { Props } from './types'

function More({ monoId, name }: Props) {
  const navigation = useNavigation()

  const personId = monoId.replace(/^\//g, '') as PersonId

  const memoData = useMemo(() => [name, ...PERSONS_ACTORS_DATA], [name])
  const memoAction = useMemo(
    () => ({
      [TEXT_WORKS]: () =>
        navigation.push('Works', {
          monoId: personId,
          name
        }),
      [TEXT_COLLABS]: () =>
        navigation.push('WebBrowser', {
          url: `${HOST}/${personId}/collabs`,
          title: `${name}的合作`
        }),
      [TEXT_COLLECTIONS]: () =>
        navigation.push('WebBrowser', {
          url: `${HOST}/${personId}/collections`,
          title: `谁收藏了${name}`
        }),
      [TEXT_TOPIC]: () =>
        navigation.push('Topic', {
          topicId: personId.replace('person', 'prsn') as TopicId
        })
    }),
    [name, navigation, personId]
  )

  const elContent = useMemo(
    () => (
      <Flex style={styles.more} justify='center'>
        <Iconfont name='md-more-vert' size={20} />
      </Flex>
    ),
    []
  )

  const handleSelect = useCallback(
    (label: string) => {
      if (typeof memoAction[label] === 'function') {
        memoAction[label]()
        return
      }

      navigation.push('Mono', {
        monoId
      })
    },
    [memoAction, monoId, navigation]
  )

  return useObserver(() => (
    <Popover style={styles.navigate} data={memoData} onSelect={handleSelect}>
      {elContent}
    </Popover>
  ))
}

export default More
