/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-28 16:47:13
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { ItemSearch, ItemCollectionsGrid } from '@screens/_'
import _ from '@styles'

const List = (props, { $, navigation }) => {
  const { hide } = $.state
  if (hide) {
    return null
  }

  const { _loaded } = $.rank
  if (!_loaded) {
    return <Loading />
  }

  const { list } = $.state
  const numColumns = list ? undefined : 4
  return (
    <ListView
      key={String(numColumns)}
      numColumns={numColumns}
      contentContainerStyle={_.container.bottom}
      keyExtractor={item => item.id}
      data={$.rank}
      renderItem={({ item, index }) => {
        if (list) {
          return <ItemSearch navigation={navigation} index={index} {...item} />
        }

        return (
          <ItemCollectionsGrid
            navigation={navigation}
            index={index}
            {...item}
          />
        )
      }}
      onHeaderRefresh={() => $.fetchRank(true)}
      onFooterRefresh={$.fetchRank}
    />
  )
}

List.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(List)
