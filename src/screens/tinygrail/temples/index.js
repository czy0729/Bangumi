/*
 * @Author: czy0729
 * @Date: 2019-12-23 13:55:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-12 17:39:29
 */
import React from 'react'
import { View } from 'react-native'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { withHeaderParams, refreshControlProps } from '@tinygrail/styles'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import ItemTemple from '@tinygrail/_/item-temple'
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
  componentDidMount() {
    const { $ } = this.context
    $.onHeaderRefresh()
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.templeLast
    return (
      <View style={_.container.tinygrail}>
        <StatusBarEvents />
        {_loaded ? (
          <ListView
            style={_.container.flex}
            contentContainerStyle={styles.contentContainerStyle}
            keyExtractor={keyExtractor}
            refreshControlProps={refreshControlProps}
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
}

const styles = _.create({
  contentContainerStyle: {
    paddingHorizontal: _.wind - _._wind,
    paddingBottom: _.bottom
  }
})

function keyExtractor(item) {
  return `${item.id}|${item.userId}`
}

function renderItem({ item, index }) {
  return <ItemTemple index={index} type='view' event={event} {...item} />
}
