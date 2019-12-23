/*
 * @Author: czy0729
 * @Date: 2019-12-23 13:55:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-23 15:05:59
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { inject, withHeader } from '@utils/decorators'
import { headerStyle } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import ItemTemple from '../_/item-temple'
import Store from './store'

const title = '最新圣殿'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/temples', 'TinygrailTemples'],
  ...headerStyle
})
@observer
class TinygrailTemples extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.fetchTempleLast()
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.templeLast
    const event = {
      id: '最近圣殿.跳转'
    }
    return (
      <View
        style={[
          _.container.flex,
          {
            backgroundColor: _.colorTinygrailContainer
          }
        ]}
      >
        <StatusBarEvents />
        {_loaded ? (
          <ListView
            style={_.container.flex}
            keyExtractor={item => `${item.id}|${item.userId}`}
            numColumns={3}
            data={$.templeLast}
            renderItem={({ item, index }) => (
              <ItemTemple index={index} type='view' event={event} {...item} />
            )}
            onHeaderRefresh={() => $.fetchTempleLast()}
          />
        ) : (
          <Loading />
        )}
      </View>
    )
  }
}
