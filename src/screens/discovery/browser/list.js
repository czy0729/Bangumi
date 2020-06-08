/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:03:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-27 15:52:34
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { ItemSearch } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'

const event = {
  id: '索引.跳转',
  data: {
    type: 'list'
  }
}

export default
@observer
class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  renderItem = ({ item, index }) => {
    const { navigation } = this.context
    return (
      <ItemSearch
        style={_.container.item}
        navigation={navigation}
        index={index}
        event={event}
        {...item}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { show } = $.state
    if (!show) {
      return null
    }

    const { _loaded } = $.browser
    if (!_loaded) {
      return <Loading />
    }

    return (
      <ListView
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.browser}
        renderItem={this.renderItem}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchBrowser}
      />
    )
  }
}
