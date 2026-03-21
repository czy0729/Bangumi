/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 03:42:58
 */
import React from 'react'
import { observer } from 'mobx-react'
import { collectionStore, systemStore } from '@stores'
import { useNavigation } from '@utils/hooks'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemGridWrap({ subjectId, name, images, score, time }) {
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
