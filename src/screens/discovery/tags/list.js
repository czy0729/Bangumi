/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-09 18:53:53
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from './item'
import { tabs } from './store'

export default
@obc
class List extends React.Component {
  static defaultProps = {
    title: '全部'
  }

  renderItem = ({ item, index }) => {
    const { id } = this.props
    return <Item type={id} index={index} {...item} />
  }

  onHeaderRefresh = () => {
    const { $ } = this.context
    const { id } = this.props
    return $.fetchList(id, true)
  }

  onFooterRefresh = () => {
    const { $ } = this.context
    const { id } = this.props
    return $.fetchList(id)
  }

  render() {
    const { $ } = this.context
    const { id } = this.props
    const list = $.list(id)
    if (!list._loaded) return <Loading />

    const { page } = $.state
    const numColumns = _.num(4)
    return (
      <ListView
        key={`${_.orientation}${numColumns}`}
        keyExtractor={keyExtractor}
        data={list}
        lazy={32}
        numColumns={numColumns}
        scrollToTop={tabs[page].key === id}
        renderItem={this.renderItem}
        onHeaderRefresh={this.onHeaderRefresh}
        onFooterRefresh={this.onFooterRefresh}
      />
    )
  }
}

function keyExtractor(item) {
  return `${item.title}|${item.nums}`
}
