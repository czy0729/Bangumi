/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:01:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-10 20:29:17
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ItemCollectionsGrid } from '@screens/_'
import { pick } from '@utils/manga'
import { IMG_DEFAULT } from '@constants'

const event = {
  id: 'Manga.跳转'
}

function ItemGrid({ pickIndex }, { $, navigation }) {
  const { id, mangaId, image, cn, jp, score } = pick(pickIndex)
  if (!id) {
    return null
  }

  const cover = image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const collection = $.userCollectionsMap[id]
  return (
    <ItemCollectionsGrid
      navigation={navigation}
      event={event}
      id={id}
      mid={mangaId}
      cover={cover}
      name={jp}
      nameCn={cn}
      score={score}
      isCollection={collection}
    />
  )
}

ItemGrid.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(ItemGrid)
