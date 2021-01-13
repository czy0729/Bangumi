/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-13 22:55:54
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { ScrollView, Heatmap } from '@components'
import { Pagination, ItemCatalog } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
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
@observer
class Catalog extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
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
        {this.renderPaganation(_.mt.md)}
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

const styles = StyleSheet.create({
  list: {
    paddingVertical: _.sm,
    minHeight: _.window.height * 0.68
  }
})
