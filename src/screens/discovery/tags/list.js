/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-18 16:41:05
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
    if (!list._loaded) {
      return <Loading />
    }

    const { page } = $.state
    return (
      <ListView
        contentContainerStyle={this.styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        data={list}
        numColumns={4}
        scrollToTop={tabs[page].key === id}
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
