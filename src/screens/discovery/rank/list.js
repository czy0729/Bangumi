/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-25 02:24:40
 */
import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from '@ant-design/react-native'
import { ScrollView, Flex, Empty, Heatmap } from '@components'
import {
  Pagination,
  ItemSearch,
  ItemCollectionsGrid,
  FilterText
} from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const eventList = {
  id: '排行榜.跳转',
  data: {
    type: 'list'
  }
}
const eventGrid = {
  id: '排行榜.跳转',
  data: {
    type: 'grid'
  }
}
const heatmaps = {
  prev: '排行榜.上一页',
  next: '排行榜.下一页',
  search: '排行榜.页码跳转'
}

export default
@obc
class List extends React.Component {
  renderPagination() {
    const { $ } = this.context
    const { type, ipt } = $.state
    return (
      <Pagination
        input={ipt[type]}
        heatmaps={heatmaps}
        onPrev={$.prev}
        onNext={$.next}
        onChange={$.onChange}
        onSearch={$.doSearch}
      />
    )
  }

  renderList() {
    const { $, navigation } = this.context
    const { type } = $.state
    const { list, _filter } = $.rank
    return (
      <>
        <View style={this.styles.list}>
          {list.length ? (
            list.map((item, index) => (
              <ItemSearch
                key={item.id}
                style={_.container.item}
                navigation={navigation}
                index={index}
                collection={
                  $.userCollectionsMap[String(item.id).replace('/subject/', '')]
                }
                event={eventList}
                typeCn={MODEL_SUBJECT_TYPE.getTitle(type)}
                {...item}
              >
                {index === 1 && <Heatmap id='排行榜.跳转' />}
              </ItemSearch>
            ))
          ) : (
            <Empty />
          )}
          {!!_filter && <FilterText value={_filter} />}
        </View>
        {this.renderPagination()}
      </>
    )
  }

  renderGrid() {
    const { $, navigation } = this.context
    const { list, _filter } = $.rank
    return (
      <>
        <Flex style={this.styles.grid} wrap='wrap' align='start'>
          {list.length ? (
            list.map((item, index) => {
              const id = String(item.id).replace('/subject/', '')
              return (
                <ItemCollectionsGrid
                  key={item.id}
                  navigation={navigation}
                  index={index}
                  collection={$.userCollectionsMap[id]}
                  event={eventGrid}
                  {...item}
                  id={id}
                />
              )
            })
          ) : (
            <Empty />
          )}
          {!!_filter && <FilterText value={_filter} />}
        </Flex>
        {this.renderPagination()}
      </>
    )
  }

  render() {
    const { $ } = this.context
    const { show, list: _list } = $.state
    const { _loaded } = $.rank
    return show && _loaded ? (
      <ScrollView contentContainerStyle={this.styles.container} scrollToTop>
        {_list ? this.renderList() : this.renderGrid()}
      </ScrollView>
    ) : (
      <Flex style={this.styles.loading} justify='center'>
        <ActivityIndicator />
      </Flex>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingBottom: _.bottom
  },
  grid: {
    paddingVertical: 12,
    paddingHorizontal: _.wind - _._wind
  },
  loading: {
    width: _.window.width,
    minHeight: 400,
    paddingTop: _.md,
    paddingVertical: _.wind
  }
}))
