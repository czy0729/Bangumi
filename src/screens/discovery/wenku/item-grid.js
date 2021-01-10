/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:34:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-10 20:29:44
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ItemCollectionsGrid } from '@screens/_'
import { pick } from '@utils/wenku'

const event = {
  id: '文库.跳转'
}

function ItemGrid({ pickIndex }, { $, navigation }) {
  const { id, wenkuId, image, cn, jp, score } = pick(pickIndex)
  if (!id) {
    return null
  }

  const cover = `//lain.bgm.tv/pic/cover/m/${image}.jpg`
  const collection = $.userCollectionsMap[id]
  return (
    <ItemCollectionsGrid
      navigation={navigation}
      event={event}
      id={id}
      wid={wenkuId}
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
