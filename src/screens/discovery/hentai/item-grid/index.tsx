/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 11:48:28
 */
import React from 'react'
import { Flex, Loading } from '@components'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore, otaStore } from '@stores'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { IMG_DEFAULT, IMG_HEIGHT_LG } from '@constants'
import { memoStyles } from './styles'

const EVENT = {
  id: 'Hentai.跳转'
} as const

function ItemGrid({ pickIndex, index, num }) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const subjectId = otaStore.hentaiSubjectId(pickIndex)
  const { id, i: image, c: cn, a: air, s: score, r: rank } = otaStore.hentai(subjectId)
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
      cover={image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT}
      cdn={false}
      name={cn}
      score={score}
      rank={rank}
      airtime={air ? String(air).slice(0, 7) : ''}
      collection={collectionStore.collect(id)}
    />
  )
}

export default ob(ItemGrid)
