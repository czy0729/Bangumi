/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 20:09:53
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import Item from './item'
import { tabs } from './store'

export default
@observer
class List extends React.Component {
  static defaultProps = {
    title: '全部'
  }

  static contextTypes = {
    $: PropTypes.object
  }

  renderItem = ({ item }) => <Item type={this.key} {...item} />

  onHeaderRefresh = () => {
    const { $ } = this.context
    return $.fetchList(this.key, true)
  }

  onFooterRefresh = () => {
    const { $ } = this.context
    return $.fetchList(this.key)
  }

  get key() {
    const { index } = this.props
    const { key } = tabs[index]
    return key
  }

  render() {
    const { $ } = this.context
    const list = $.list(this.key)
    if (!list._loaded) {
      return <Loading />
    }

    return (
      <ListView
        contentContainerStyle={this.styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        data={list}
        numColumns={4}
        renderItem={this.renderItem}
        onHeaderRefresh={this.onHeaderRefresh}
        onFooterRefresh={this.onFooterRefresh}
      />
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  contentContainerStyle: {
    paddingHorizontal: _.wind - _._wind
  }
}))

function keyExtractor(item) {
  return `${item.title}|${item.nums}`
}
