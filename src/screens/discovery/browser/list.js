/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:03:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-08 06:54:43
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemSearch, ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const eventList = {
  id: '索引.跳转',
  data: {
    type: 'list'
  }
}
const eventGrid = {
  id: '索引.跳转',
  data: {
    type: 'grid'
  }
}

export default
@obc
class List extends React.Component {
  get num() {
    return _.portrait(3, 5)
  }

  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    const { type } = $.state
    if ($.isList) {
      return (
        <ItemSearch
          style={_.container.item}
          navigation={navigation}
          index={index}
          event={eventList}
          collection={$.userCollectionsMap[String(item.id).replace('/subject/', '')]}
          typeCn={MODEL_SUBJECT_TYPE.getTitle(type)}
          {...item}
        >
          {index === 1 && <Heatmap id='索引.跳转' />}
        </ItemSearch>
      )
    }

    return (
      <ItemCollectionsGrid
        style={(_.isPad || _.isLandscape) && !(index % this.num) && _.container.left}
        navigation={navigation}
        num={this.num}
        index={index}
        collection={$.userCollectionsMap[String(item.id).replace('/subject/', '')]}
        event={eventGrid}
        {...item}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { show, layout } = $.state
    if (!show) return null

    const { _loaded } = $.browser
    if (!_loaded) return <Loading />

    const numColumns = $.isList ? undefined : this.num
    return (
      <ListView
        key={`${layout}${numColumns}`}
        contentContainerStyle={styles.container}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        data={$.browser}
        lazy={9}
        renderItem={this.renderItem}
        scrollToTop
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchBrowser}
      />
    )
  }
}

const styles = _.create({
  container: {
    paddingTop: _.md,
    paddingBottom: _.bottom
  }
})
