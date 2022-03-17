/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 23:25:20
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { ItemCatalog } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'

export default
@obc
class List extends React.Component {
  renderItem = ({ item }) => (
    <ItemCatalog {...item} name='优莉雅' isUser event={this.event} />
  )

  get event() {
    const { $ } = this.context
    return {
      id: '新番.跳转',
      data: {
        userId: $.userId
      }
    }
  }

  render() {
    const { $ } = this.context
    const { id } = this.props
    const catalogs = $.catalogs(id)
    const { _loaded } = catalogs
    if (!_loaded) return <Loading style={_.container.plain} />

    return (
      <ListView
        style={_.container.plain}
        keyExtractor={keyExtractor}
        data={catalogs}
        lazy={6}
        scrollToTop
        renderItem={this.renderItem}
        onHeaderRefresh={() => $.fetchCatalogs(id, true)}
        onFooterRefresh={() => $.fetchCatalogs(id)}
      />
    )
  }
}
