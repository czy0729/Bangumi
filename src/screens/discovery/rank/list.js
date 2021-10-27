/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-27 13:02:54
 */
import React from 'react'
import { View } from 'react-native'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { ScrollView, Flex, Empty, Heatmap } from '@components'
import { Pagination, ItemSearch, ItemCollectionsGrid, FilterText } from '@screens/_'
import { _, collectionStore } from '@stores'
import { runAfter } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const num = 3
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
  state = {
    rendered: false
  }

  componentDidMount() {
    runAfter(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.setState({
            rendered: true
          })
        }, 160)
      })
    })
  }

  get list() {
    const { $ } = this.context
    const { list } = $.rank
    const { rendered } = this.state
    if (!rendered) return list.slice(0, 9)
    return list
  }

  renderPagination() {
    const { $ } = this.context
    const { type, ipt } = $.state
    return (
      <Pagination
        style={_.mt.md}
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
    const { _filter } = $.rank
    return (
      <>
        <View style={this.styles.list}>
          {this.list.length ? (
            this.list.map((item, index) => {
              const id = String(item.id).replace('/subject/', '')
              // const collection = collectionStore.statusName(id) || $.userCollectionsMap[id]
              const collection = collectionStore.statusName(id)
              return (
                <ItemSearch
                  key={item.id}
                  style={_.container.item}
                  navigation={navigation}
                  index={index}
                  collection={collection}
                  event={eventList}
                  typeCn={MODEL_SUBJECT_TYPE.getTitle(type)}
                  {...item}
                >
                  {index === 1 && <Heatmap id='排行榜.跳转' />}
                </ItemSearch>
              )
            })
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
    const { _filter } = $.rank
    return (
      <>
        <Flex style={this.styles.grid} wrap='wrap' align='start'>
          {this.list.length ? (
            this.list.map((item, index) => {
              const id = String(item.id).replace('/subject/', '')
              return (
                <ItemCollectionsGrid
                  key={item.id}
                  navigation={navigation}
                  style={!(index % num) && this.styles.left}
                  num={num}
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
    if (show && _loaded) {
      return (
        <ScrollView contentContainerStyle={this.styles.container} scrollToTop>
          {_list ? this.renderList() : this.renderGrid()}
        </ScrollView>
      )
    }

    return (
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
    paddingHorizontal: _.wind,
    paddingVertical: 12
  },
  loading: {
    width: _.window.width,
    minHeight: 400,
    paddingTop: _.md,
    paddingVertical: _.wind
  },
  left: {
    marginLeft: 0
  }
}))
