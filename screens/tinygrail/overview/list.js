/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-21 11:48:23
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { observer } from '@utils/decorators'
import Item from '../_/item'
import { sortList } from '../_/utils'
import { tabs } from './store'

const event = {
  id: '热门榜单.跳转'
}

export default
@observer
class List extends React.Component {
  static defaultProps = {
    title: '全部'
  }

  static contextTypes = {
    $: PropTypes.object
  }

  renderItem = ({ item, index }) => (
    <Item index={index} event={event} {...item} />
  )

  render() {
    const { index } = this.props
    const { $ } = this.context
    const { key } = tabs[index]
    const list = $.list(key)
    if (!list._loaded) {
      return <Loading style={_.container.flex} />
    }

    const { sort, direction } = $.state
    let _list = list
    if (sort) {
      _list = {
        ..._list,
        list: sortList(sort, direction, list.list)
      }
    }
    return (
      <ListView
        style={_.container.flex}
        keyExtractor={keyExtractor}
        refreshControlProps={{
          color: _.colorTinygrailText
        }}
        footerTextType='tinygrailText'
        data={_list}
        renderItem={this.renderItem}
        onHeaderRefresh={() => $.fetchList(key)}
      />
    )
  }
}
