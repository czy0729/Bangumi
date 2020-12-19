/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:03:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-18 16:11:06
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemSearch } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

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
    const { $, navigation } = this.context
    const { type } = $.state
    return (
      <ItemSearch
        style={_.container.item}
        navigation={navigation}
        index={index}
        event={event}
        collection={
          $.userCollectionsMap[String(item.id).replace('/subject/', '')]
        }
        typeCn={MODEL_SUBJECT_TYPE.getTitle(type)}
        {...item}
      >
        {index === 1 && <Heatmap id='索引.跳转' />}
      </ItemSearch>
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
        scrollToTop
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchBrowser}
      />
    )
  }
}
