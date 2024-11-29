/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 10:02:07
 */
import React from 'react'
import { collectionStore, systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemGridWrap({ subjectId, name, images, score, time }) {
  const navigation = useNavigation()
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

export default ob(ItemGridWrap, COMPONENT)
