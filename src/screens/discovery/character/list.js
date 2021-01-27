/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:41:48
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import Item from './item'
import ItemRecents from './item-recents'

export default
@obc
class List extends React.Component {
  static defaultProps = {
    title: '全部'
  }

  renderItem = ({ item, index }) => {
    if (this.isRecents) {
      return <ItemRecents index={index} {...item} />
    }
    return <Item {...item} />
  }

  get isRecents() {
    const { id } = this.props
    return id === 'recents'
  }

  render() {
    const { $ } = this.context
    const { id } = this.props
    const list = $.list(id)
    if (!list._loaded) {
      return <Loading style={_.container.screen} />
    }

    const { page } = $.state
    const numColumns = this.isRecents ? undefined : 5
    return (
      <ListView
        key={String(numColumns)}
        style={_.container.screen}
        keyExtractor={keyExtractor}
        data={list}
        numColumns={numColumns}
        scrollToTop={$.tabs[page].key === id}
        renderItem={this.renderItem}
        onHeaderRefresh={() => $.fetchList(id, true)}
        onFooterRefresh={() => $.fetchList(id)}
      />
    )
  }
}
