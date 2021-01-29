/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-28 01:25:24
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Heatmap } from '@components'
import { Pagination, ItemCatalog } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import Type from './type'
import Store from './store'

const title = '目录'
const event = {
  id: '目录.跳转'
}
const heatmaps = {
  prev: '目录.上一页',
  next: '目录.下一页',
  search: '目录.页码跳转'
}

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['discovery/catalog', 'Catalog']
})
@obc
class Catalog extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: <Type $={$} />
    })
  }

  renderPaganation(style) {
    const { $ } = this.context
    const { ipt } = $.state
    return (
      <Pagination
        style={style}
        input={ipt}
        heatmaps={heatmaps}
        onPrev={$.prev}
        onNext={$.next}
        onChange={$.onChange}
        onSearch={$.doSearch}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { show, _loaded } = $.state
    if (!_loaded) {
      return <View style={_.container.plain} />
    }

    return (
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
        showsVerticalScrollIndicator={false}
        scrollToTop
      >
        {show && (
          <>
            <View style={styles.list}>
              {$.catalog.list.map((item, index) => (
                <ItemCatalog key={item.id} event={event} {...item}>
                  {index === 1 && <Heatmap id='目录.跳转' />}
                </ItemCatalog>
              ))}
            </View>
            {this.renderPaganation(_.mt.lg)}
          </>
        )}
      </ScrollView>
    )
  }
}

const styles = _.create({
  list: {
    paddingVertical: _.sm,
    minHeight: _.window.height * 0.68
  }
})
