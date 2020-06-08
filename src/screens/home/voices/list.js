/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 21:45:58
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { ItemVoice } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { observer } from '@utils/decorators'

const event = {
  id: '角色.跳转'
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
      <ItemVoice
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
    const { _loaded } = $.monoVoices
    if (!_loaded) {
      return <Loading />
    }

    return (
      <ListView
        contentContainerStyle={this.styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        data={$.monoVoices}
        renderItem={this.renderItem}
        onHeaderRefresh={$.onHeaderRefresh}
      />
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  contentContainerStyle: {
    paddingBottom: _.bottom
  }
}))
