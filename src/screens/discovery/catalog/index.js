/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-11 12:13:02
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { ScrollView } from '@components'
import { Pagination, ItemCatalog } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import Type from './type'
import Store from './store'

const title = '目录'
const event = {
  id: '目录.跳转'
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
      return <View style={_.container.bg} />
    }

    return (
      <ScrollView
        style={_.container.bg}
        contentContainerStyle={_.container.bottom}
        showsVerticalScrollIndicator={false}
        scrollToTop
      >
        {this.renderPaganation(_.mt.md)}
        {show && (
          <>
            <View style={styles.list}>
              {$.catalog.list.map(item => (
                <ItemCatalog key={item.id} event={event} {...item} />
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
