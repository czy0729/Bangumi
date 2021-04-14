/*
 * @Author: czy0729
 * @Date: 2019-05-15 15:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:48:27
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemSearch } from '@screens/_'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { _ } from '@stores'

const event = {
  id: '搜索.跳转'
}

export default
@obc
class List extends React.Component {
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
      >
        {!index && <Heatmap id='搜索.跳转' />}
      </ItemSearch>
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
