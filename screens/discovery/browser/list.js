/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:03:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-01 21:03:06
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { ItemSearch } from '@screens/_'
import { _ } from '@stores'

function List({ airtime }, { $, navigation }) {
  const { hide } = $.state
  if (hide) {
    return null
  }

  const data = $.browser(airtime)
  const { _loaded } = data
  if (!_loaded) {
    return <Loading />
  }

  const event = {
    id: '索引.跳转'
  }
  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      keyExtractor={item => item.id}
      data={data}
      renderItem={({ item, index }) => (
        <ItemSearch
          navigation={navigation}
          index={index}
          event={{
            ...event,
            data: {
              type: 'list'
            }
          }}
          {...item}
        />
      )}
      onHeaderRefresh={() => $.fetchBrowser(true)}
      onFooterRefresh={$.fetchBrowser}
    />
  )
}

List.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(List)
