/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-04 09:25:21
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import Item from './item'
import ItemRecents from './item-recents'

export const num = _.device(5, 6)

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
    return <Item index={index} num={num} {...item} />
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
      return <Loading />
    }

    const { page } = $.state
    const numColumns = this.isRecents ? undefined : num
    return (
      <ListView
        key={String(numColumns)}
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
