/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-23 15:04:29
 */
import React from 'react'
import { ScrollView, Flex, Loading, Empty, Heatmap } from '@components'
import { ItemSearch, ItemCollectionsGrid, FilterText } from '@_'
import { _, collectionStore } from '@stores'
import { matchYear } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import ToolBar from '../tool-bar'
import Pagination from '../pagination'
import { Ctx } from '../types'
import { EVENT_LIST, EVENT_GRID } from './ds'
import { memoStyles } from './styles'

class List extends React.Component {
  get list() {
    const { $ }: Ctx = this.context
    const { list } = $.list
    return list
  }

  renderList() {
    const { $, navigation }: Ctx = this.context
    const { type } = $.state
    const { _filter } = $.rank
    return (
      <>
        {this.list.length ? (
          this.list.map((item, index) => {
            const id = String(item.id).replace('/subject/', '')
            const collection = collectionStore.collectionStatus(id)
            return (
              <>
                <ItemSearch
                  key={item.id}
                  style={_.container.item}
                  navigation={navigation}
                  collection={collection}
                  event={EVENT_LIST}
                  typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)}
                  {...item}
                  onManagePress={$.onShowManageModal}
                />
                {index === 1 && <Heatmap id='排行榜.跳转' />}
              </>
            )
          })
        ) : (
          <Empty />
        )}
        {!!_filter && <FilterText value={_filter} />}
      </>
    )
  }

  renderGrid() {
    const { $, navigation }: Ctx = this.context
    const { type, airtime } = $.state
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
                  event={EVENT_GRID}
                  airtime={airtime === '' && matchYear(item.tip)}
                  {...item}
                  id={id}
                  collection={collection}
                  isCollect={item.collected}
                  isRectangle={MODEL_SUBJECT_TYPE.getTitle(type) === '音乐'}
                />
              )
            })
          ) : (
            <Empty />
          )}
          {!!_filter && <FilterText value={_filter} />}
        </Flex>
      </>
    )
  }

  render() {
    const { $ }: Ctx = this.context
    const { show, list: _list, fixed, fixedPagination } = $.state
    const { _loaded } = $.rank
    if (show && _loaded) {
      return (
        <ScrollView contentContainerStyle={this.styles.scrollView} scrollToTop>
          {!fixed && <ToolBar />}
          {_list ? this.renderList() : this.renderGrid()}
          {!fixedPagination && <Pagination />}
        </ScrollView>
      )
    }

    return (
      <Flex.Item>
        {!fixed && <ToolBar />}
        <Loading />
      </Flex.Item>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(List)
