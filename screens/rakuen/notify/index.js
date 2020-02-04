/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:14:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-04 21:09:35
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { ListView } from '@components'
import { ItemNotify, ItemPM } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_NOTIFY } from '@constants/html'
import Store, { tabs } from './store'
import Tabs from './tabs'

const title = '电波提醒'
const event = {
  id: '电波提醒.跳转'
}

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['notify/all', 'Notify']
})
@observer
class Notify extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    navigation.setParams({
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('电波提醒.右上角菜单', {
            key
          })
          switch (key) {
            case '浏览器查看':
              open(HTML_NOTIFY())
              break
            default:
              break
          }
        }
      }
    })

    await $.init()
    $.doClearNotify()
  }

  onHeaderRefresh = key => {
    const { $ } = this.context
    return $.fetchPM(true, key)
  }

  onFooterRefresh = key => {
    const { $ } = this.context
    return $.fetchPM(undefined, key)
  }

  renderItem = ({ item, index }) => {
    const { navigation } = this.context
    return (
      <ItemNotify
        navigation={navigation}
        index={index}
        event={event}
        {...item}
      />
    )
  }

  renderPMItem = ({ item, index }) => {
    const { navigation } = this.context
    return (
      <ItemPM
        navigation={navigation}
        index={index}
        event={event}
        onRefresh={this.onHeaderRefresh}
        {...item}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.screen}>
        {_loaded && (
          <Tabs tabs={tabs}>
            <ListView
              key='notify'
              keyExtractor={keyExtractor}
              data={$.notify}
              renderItem={this.renderItem}
              onHeaderRefresh={$.fetchNotify}
            />
            <ListView
              key='pm'
              keyExtractor={keyExtractor}
              data={$.pmIn}
              renderItem={this.renderPMItem}
              onHeaderRefresh={() => this.onHeaderRefresh('pmIn')}
              onFooterRefresh={() => this.onFooterRefresh('pmIn')}
            />
            <ListView
              key='out'
              keyExtractor={keyExtractor}
              data={$.pmOut}
              renderItem={this.renderPMItem}
              onHeaderRefresh={() => this.onHeaderRefresh('pmOut')}
              onFooterRefresh={() => this.onFooterRefresh('pmOut')}
            />
          </Tabs>
        )}
      </View>
    )
  }
}

function keyExtractor(item, index) {
  return String(index)
}
