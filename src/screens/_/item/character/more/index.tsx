/*
 * @Author: czy0729
 * @Date: 2026-01-09 08:01:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:15:46
 *
 * 人物条目右上角更多操作 Popover
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont } from '@components'
import { useNavigation } from '@utils/hooks'
import { HOST } from '@constants'
import { PERSONS_ACTORS_DATA, TEXT_COLLABS, TEXT_COLLECTIONS, TEXT_TOPIC, TEXT_WORKS } from '../ds'
import { Popover } from '../../../base'
import { styles } from './styles'

import type { PersonId, TopicId } from '@types'
import type { Props } from './types'

function More({ monoId, name }: Props) {
  const navigation = useNavigation()

  const personId = monoId.replace(/^\//g, '') as PersonId

  const handleSelect = useCallback(
    (label: string) => {
      const actions: Record<string, () => void> = {
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
      }

      if (typeof actions[label] === 'function') {
        actions[label]()
        return
      }

      navigation.push('Mono', {
        monoId
      })
    },
    [monoId, name, navigation, personId]
  )

  return (
    <Popover style={styles.navigate} data={[name, ...PERSONS_ACTORS_DATA]} onSelect={handleSelect}>
      <Flex style={styles.more} justify='center'>
        <Iconfont name='md-more-vert' size={20} />
      </Flex>
    </Popover>
  )
}

export default observer(More)
