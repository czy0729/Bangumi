/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-24 20:21:09
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { ItemCatalog } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'

export default
@observer
class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

  renderItem = ({ item }) => <ItemCatalog {...item} isUser event={this.event} />

  get event() {
    const { $ } = this.context
    return {
      eventId: '用户目录.跳转',
      eventData: {
        userId: $.userId
      }
    }
  }

  render() {
    const { $ } = this.context
    const { id } = this.props
    const catalogs = $.catalogs(id)
    const { _loaded } = catalogs
    if (!_loaded) {
      return <Loading style={_.container.screen} />
    }

    return (
      <ListView
        style={_.container.screen}
        keyExtractor={keyExtractor}
        data={catalogs}
        renderItem={this.renderItem}
        onHeaderRefresh={() => $.fetchCatalogs(id, true)}
        onFooterRefresh={() => $.fetchCatalogs(id)}
      />
    )
  }
}
