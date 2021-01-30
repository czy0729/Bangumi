/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 22:32:04
 */
import React from 'react'
import { View } from 'react-native'
import { ListView } from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { info } from '@utils/ui'
import MosaicTile from './mosaic-tile'
import List from './list'
import Store from './store'

const title = '时间线'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['user/timeline', 'UserTimeline']
})
@obc
class UserTimeline extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    const { userName } = $.params
    if (userName) {
      navigation.setParams({
        title: `${userName}的${title}`,
        extra: (
          <IconTouchable
            style={{
              marginRight: -_.sm
            }}
            name='information'
            size={20}
            onPress={this.onInformation}
          />
        )
      })
    } else {
      navigation.setParams({
        extra: (
          <IconTouchable
            style={{
              marginRight: -_.sm
            }}
            name='information'
            size={20}
            onPress={this.onInformation}
          />
        )
      })
    }
  }

  onInformation = () => info('进度瓷砖会有延迟, 若无数据可过段时间再来')

  renderItem = () => <View />

  render() {
    const { $ } = this.context
    return (
      <ListView
        style={_.container.plain}
        data={$.timeline}
        scrollToTop
        ListHeaderComponent={
          <>
            <MosaicTile />
            <List />
          </>
        }
        renderItem={this.renderItem}
        onHeaderRefresh={async () => {
          await $.fetchMosaicTile()
          return $.fetchTimeline(true)
        }}
        onFooterRefresh={$.fetchTimeline}
      />
    )
  }
}
