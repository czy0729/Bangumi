/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-20 17:38:21
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Filter from './filter'
import Item from './item'
import { tabs } from './store'

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
    const { page } = $.state
    const list = $.list(id)
    const numColumns = _.num(4)
    return (
      <>
        <Filter />
        {list._loaded ? (
          <ListView
            key={`${_.orientation}${numColumns}`}
            keyExtractor={keyExtractor}
            contentContainerStyle={_.container.bottom}
            data={list}
            lazy={32}
            numColumns={numColumns}
            scrollToTop={tabs[page].key === id}
            keyboardDismissMode='on-drag'
            renderItem={this.renderItem}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={this.onFooterRefresh}
          />
        ) : (
          <Loading />
        )}
      </>
    )
  }
}

export default obc(List)

function keyExtractor(item) {
  return `${item.title}|${item.nums}`
}
