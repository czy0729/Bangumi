/*
 * @Author: czy0729
 * @Date: 2026-01-09 08:01:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 23:44:27
 *
 * 人物条目右上角更多操作 Popover
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { flexStyle, Iconfont } from '@components'
import { stl } from '@utils'
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
    <Popover
      style={stl(flexStyle({ justify: 'center' }), styles.navigate, styles.more)}
      data={[name, ...PERSONS_ACTORS_DATA]}
      onSelect={handleSelect}
    >
      <Iconfont name='md-more-vert' size={20} />
    </Popover>
  )
}

export default observer(More)
