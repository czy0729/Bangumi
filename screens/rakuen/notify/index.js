/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:14:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-02 04:51:06
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

  onHeaderRefresh = () => {
    const { $ } = this.context
    return $.fetchPM(true)
  }

  onFooterRefresh = () => {
    const { $ } = this.context
    return $.fetchPM()
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
      <ItemPM navigation={navigation} index={index} event={event} {...item} />
    )
  }

  render() {
    const { $ } = this.context
    return (
      <View style={_.container.screen}>
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
            data={$.pm}
            renderItem={this.renderPMItem}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={this.onFooterRefresh}
          />
        </Tabs>
      </View>
    )
  }
}

function keyExtractor(item, index) {
  return String(index)
}
