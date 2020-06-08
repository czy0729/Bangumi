/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 12:19:37
 */
import React from 'react'
import { StyleSheet, ScrollView, View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { Pagination, IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import Type from './type'
import Item from './item'
import Store from './store'

const title = '目录'

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
      extra: (
        <>
          <Type $={$} />
          <IconHeader
            style={_.ml.sm}
            name='information'
            onPress={() => {
              t('目录.提示')

              Alert.alert(
                '提示',
                '因部分条目信息受登陆状态影响, 若条目不显示, 可以尝试重新登陆',
                [
                  {
                    text: '知道了'
                  }
                ]
              )
            }}
          />
        </>
      )
    })
  }

  renderPaganation() {
    const { $ } = this.context
    const { ipt } = $.state
    return (
      <Pagination
        style={_.mt.lg}
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
      >
        {this.renderPaganation()}
        {show && (
          <>
            <View style={styles.list}>
              {$.catalog.list.map(item => (
                <Item key={item.id} {...item} />
              ))}
            </View>
            {this.renderPaganation()}
          </>
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    minHeight: _.window.height
  }
})
