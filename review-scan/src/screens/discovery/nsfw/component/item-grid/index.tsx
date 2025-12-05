/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 11:38:44
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
  const styles = memoStyles()
  const subjectId = otaStore.nsfwSubjectId(pickIndex)
  const { id, title, cover, score, rank, date } = otaStore.nsfw(subjectId)
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

  return (
    <ItemCollectionsGrid
      navigation={navigation}
      style={(_.isPad || _.isLandscape) && !(index % num) && styles.left}
      event={EVENT}
      num={num}
      id={id}
      cover={cover ? `https://lain.bgm.tv/pic/cover/m/${cover}.jpg` : IMG_DEFAULT}
      cdn={false}
      name={title}
      score={score}
      rank={rank}
      airtime={date ? String(date).slice(0, 7) : ''}
      collection={collectionStore.collect(id)}
    />
  )
}

export default ob(ItemGrid, COMPONENT)
