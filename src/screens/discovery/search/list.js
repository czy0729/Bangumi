/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-11 18:23:40
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { ItemSearch } from '@screens/_'
import { keyExtractor } from '@utils/app'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { _ } from '@stores'

const event = {
  id: '搜索.跳转'
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
    return (
      <ItemSearch
        style={_.container.item}
        navigation={navigation}
        index={index}
        event={event}
        collection={
          $.userCollectionsMap[String(item.id).replace('/subject/', '')]
        }
        typeCn={MODEL_SUBJECT_TYPE.getTitle(item.type)}
        {...item}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { searching } = $.state
    if (searching) {
      return <Loading style={_.container.flex} />
    }

    const search = $.search()
    if (!search._loaded) {
      return null
    }

    return (
      <ListView
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={search}
        scrollToTop
        renderItem={this.renderItem}
        onFooterRefresh={$.doSearch}
      />
    )
  }
}
