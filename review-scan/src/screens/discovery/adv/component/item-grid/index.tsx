/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:21:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 10:16:31
 */
import React from 'react'
import { Flex, Loading } from '@components'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore, otaStore } from '@stores'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { IMG_DEFAULT, IMG_HEIGHT_LG } from '@constants'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

function ItemGrid({ pickIndex, index, num }) {
  const navigation = useNavigation()
  const subjectId = otaStore.advSubjectId(pickIndex)
  const { id, title, cover, score, rank, date } = otaStore.adv(subjectId)
  if (!id) {
    const gridStyles = _.grid(num)
    return (
      <Flex
        style={{
          width: gridStyles.width,
          height: IMG_HEIGHT_LG,
          marginBottom: gridStyles.marginLeft + _.xs,
          marginLeft: gridStyles.marginLeft
        }}
        justify='center'
      >
        <Loading.Raw />
      </Flex>
    )
  }

  const styles = memoStyles()
  return (
    <ItemCollectionsGrid
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      navigation={navigation}
      num={num}
      id={id}
      cover={cover ? `https://lain.bgm.tv/pic/cover/m/${cover}.jpg` : IMG_DEFAULT}
      nameCn={title}
      score={score}
      rank={rank}
      airtime={date}
      collection={collectionStore.collect(id)}
      event={EVENT}
    />
  )
}

export default ob(ItemGrid, COMPONENT)
