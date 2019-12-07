/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:55:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-07 17:42:00
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { ItemSearch, ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'

function List(props, { $, navigation }) {
  const { hide } = $.state
  if (hide) {
    return null
  }

  const { _loaded } = $.tag
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
      data={$.tag}
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
      onHeaderRefresh={() => $.fetchTag(true)}
      onFooterRefresh={$.fetchTag}
    />
  )
}

List.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(List)
