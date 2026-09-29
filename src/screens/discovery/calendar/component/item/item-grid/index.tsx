/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 16:51:29
 */
import { observer } from 'mobx-react'
import { collectionStore, systemStore } from '@stores'
import { useNavigation } from '@utils/hooks'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ItemView } from '../types'

function ItemGridWrap({ subjectId, name, images, score, time }: ItemView) {
  const navigation = useNavigation(COMPONENT)

  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      hideScore={systemStore.setting.hideScore}
      subjectId={subjectId}
      name={name}
      image={images?.medium}
      score={score}
      collection={collectionStore.collect(subjectId)}
      time={time}
    />
  )
}

export default observer(ItemGridWrap)
