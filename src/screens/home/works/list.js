/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 01:26:33
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemSearch, ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const event = {
  id: '作品.跳转'
}

export default
@obc
class List extends React.Component {
  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    const { list } = $.state
    if (list) {
      return (
        <ItemSearch
          style={_.container.item}
          navigation={navigation}
          index={index}
          typeCn={MODEL_SUBJECT_TYPE.getTitle(item.type)}
          event={{
            ...event,
            data: {
              type: 'list'
            }
          }}
          {...item}
        >
          {!index && <Heatmap id='作品.跳转' />}
        </ItemSearch>
      )
    }
    return (
      <ItemCollectionsGrid
        navigation={navigation}
        index={index}
        event={{
          ...event,
          data: {
            type: 'grid'
          }
        }}
        typeCn={MODEL_SUBJECT_TYPE.getTitle(item.type)}
        {...item}
        id={item.id.replace('/subject/', '')}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.monoWorks
    if (!_loaded) {
      return <Loading />
    }

    const { list } = $.state
    const numColumns = list ? undefined : 3
    return (
      <ListView
        key={String(numColumns)}
        numColumns={numColumns}
        contentContainerStyle={list ? this.styles.list : this.styles.grid}
        keyExtractor={keyExtractor}
        data={$.monoWorks}
        scrollToTop
        renderItem={this.renderItem}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchMonoWorks}
      />
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  list: {
    paddingBottom: _.bottom
  },
  grid: {
    paddingHorizontal: _.wind - _._wind,
    paddingBottom: _.bottom
  }
}))
