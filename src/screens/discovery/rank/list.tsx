/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-28 13:13:14
 */
import React from 'react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { ScrollView, Flex, Empty, Heatmap } from '@components'
import { Pagination, ItemSearch, ItemCollectionsGrid, FilterText } from '@_'
import { _, collectionStore } from '@stores'
import { runAfter } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import ToolBar from './tool-bar'

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
    const { list } = $.list
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
        {this.list.length ? (
          this.list.map((item, index) => {
            const id = String(item.id).replace('/subject/', '')
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
        {this.renderPagination()}
      </>
    )
  }

  renderGrid() {
    const { $, navigation } = this.context
    const { airtime } = $.state
    const { _filter } = $.rank
    const num = _.portrait(3, 5)
    return (
      <>
        <Flex style={this.styles.grid} wrap='wrap' align='start'>
          {this.list.length ? (
            this.list.map((item, index) => {
              const id = String(item.id).replace('/subject/', '')
              const collection = collectionStore.statusName(id)
              return (
                <ItemCollectionsGrid
                  key={item.id}
                  navigation={navigation}
                  style={!(index % num) && this.styles.left}
                  num={num}
                  index={index}
                  event={eventGrid}
                  airtime={airtime === '' && item.tip.match(/(\d{4})(年|-)/)?.[1]}
                  {...item}
                  id={id}
                  collection={collection}
                  isCollect={item.collected}
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
    const { show, list: _list, fixed } = $.state
    const { _loaded } = $.rank
    if (show && _loaded) {
      return (
        <ScrollView contentContainerStyle={this.styles.container} scrollToTop>
          {!fixed && <ToolBar />}
          {_list ? this.renderList() : this.renderGrid()}
        </ScrollView>
      )
    }

    return (
      <>
        {!fixed && <ToolBar />}
        <Flex style={this.styles.loading} justify='center'>
          <ActivityIndicator />
        </Flex>
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(List)

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingBottom: _.bottom
  },
  grid: {
    paddingHorizontal: _.wind,
    paddingVertical: _.md
  },
  loading: {
    width: '100%',
    minHeight: 400,
    paddingTop: _.md,
    paddingVertical: _.wind
  },
  left: {
    marginLeft: 0
  }
}))
