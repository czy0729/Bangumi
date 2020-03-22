/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-22 22:10:37
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import Item from './item'
import ItemRecents from './item-recents'

export default
@observer
class List extends React.Component {
  static defaultProps = {
    title: '全部'
  }

  static contextTypes = {
    $: PropTypes.object
  }

  renderItem = ({ item, index }) => {
    if (this.isRecents) {
      return <ItemRecents index={index} {...item} />
    }
    return <Item {...item} />
  }

  get isRecents() {
    const { $ } = this.context
    const { index } = this.props
    const { key } = $.tabs[index]
    return key === 'recents'
  }

  render() {
    const { $ } = this.context
    const { index } = this.props
    const { key } = $.tabs[index]
    const list = $.list(key)
    if (!list._loaded) {
      return <Loading style={_.container.screen} />
    }

    const numColumns = this.isRecents ? undefined : 5
    return (
      <ListView
        key={String(numColumns)}
        style={_.container.screen}
        keyExtractor={keyExtractor}
        data={list}
        numColumns={numColumns}
        renderItem={this.renderItem}
        onHeaderRefresh={() => $.fetchList(key, true)}
        onFooterRefresh={() => $.fetchList(key)}
      />
    )
  }
}
