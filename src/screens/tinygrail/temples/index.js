/*
 * @Author: czy0729
 * @Date: 2019-12-23 13:55:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:22:31
 */
import React from 'react'
import { View } from 'react-native'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import ItemTemple from '../_/item-temple'
import Store from './store'

const title = '最新圣殿'
const event = {
  id: '最近圣殿.跳转'
}

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/temples', 'TinygrailTemples'],
  withHeaderParams
})
@obc
class TinygrailTemples extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $ } = this.context
    $.onHeaderRefresh()
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.templeLast
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        {_loaded ? (
          <ListView
            style={_.container.flex}
            contentContainerStyle={this.styles.contentContainerStyle}
            keyExtractor={keyExtractor}
            refreshControlProps={{
              color: _.colorTinygrailText
            }}
            footerTextType='tinygrailText'
            numColumns={3}
            data={$.templeLast}
            scrollToTop
            renderItem={renderItem}
            onHeaderRefresh={$.onHeaderRefresh}
            onFooterRefresh={$.fetchTempleLast}
          />
        ) : (
          <Loading color={_.colorTinygrailText} />
        )}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  },
  contentContainerStyle: {
    paddingHorizontal: _.wind - _._wind,
    paddingBottom: _.bottom
  }
}))

function keyExtractor(item) {
  return `${item.id}|${item.userId}`
}

function renderItem({ item, index }) {
  return <ItemTemple index={index} type='view' event={event} {...item} />
}
