/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-04 16:05:08
 */
import React from 'react'
import { ScrollView, View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { Pagination, IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
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
        <IconHeader
          name='information'
          onPress={() =>
            Alert.alert(
              '提示',
              '因部分条目信息受登陆状态影响, 若条目不显示, 可以尝试重新登陆',
              [
                {
                  text: '知道了'
                }
              ]
            )
          }
        />
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
      return <View style={_.container.screen} />
    }

    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.bottom}
      >
        {this.renderPaganation()}
        {show && (
          <>
            <View
              style={{
                minHeight: _.window.height
              }}
            >
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
