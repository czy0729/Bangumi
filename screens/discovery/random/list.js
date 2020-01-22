/*
 * @Author: czy0729
 * @Date: 2019-06-23 02:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-22 02:56:04
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { _ } from '@stores'
import Item from './item'

export default
@observer
class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

  renderItem = ({ item }) => <Item {...item} />

  render() {
    const { $ } = this.context
    return (
      <ListView
        style={_.container.screen}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.random}
        ListHeaderComponent={
          <StatusBarPlaceholder
            style={{
              backgroundColor: _.colorBg
            }}
          />
        }
        renderItem={renderItem}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchRandom}
      />
    )
  }
}

function keyExtractor(item) {
  return String(item.id)
}

function renderItem({ item }) {
  return <Item {...item} />
}
