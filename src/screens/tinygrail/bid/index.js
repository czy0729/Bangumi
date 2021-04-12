/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-12 17:36:48
 */
import React from 'react'
import { Alert, View } from 'react-native'
import { Flex, Text } from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { withHeaderParams } from '@tinygrail/styles'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Tabs from '@tinygrail/_/tabs-v2'
import ToolBar from '@tinygrail/_/tool-bar'
import List from './list'
import Store from './store'
import { tabs, sortDS } from './ds'

const title = '我的委托'

export default
@inject(Store)
@withHeader({
  screen: title,
  withHeaderParams
})
@obc
class TinygrailBid extends React.Component {
  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    const { type = 'bid' } = $.params
    navigation.setParams({
      extra: (
        <IconTouchable
          style={_.mr._right}
          name='md-cancel-presentation'
          color={_.colorTinygrailPlain}
          onPress={() =>
            Alert.alert(
              '小圣杯助手',
              `确定取消 (${$.canCancelCount}) 个 (${$.currentTitle})?`,
              [
                {
                  text: '取消',
                  style: 'cancel'
                },
                {
                  text: '确定',
                  onPress: () => $.onBatchCancel()
                }
              ]
            )
          }
        />
      )
    })

    hm(`tinygrail/${type}`, 'TinygrailBid')
  }

  getCount = route => {
    const { $ } = this.context
    switch (route.key) {
      case 'bid':
      case 'asks':
        return $.list(route.key)?.list?.length || 0

      case 'auction':
        return (
          $.list(route.key)?.list.filter(item => item.state === 0).length || 0
        )

      default:
        return 0
    }
  }

  renderContentHeaderComponent() {
    const { $ } = this.context
    const { level, sort, direction } = $.state
    return (
      <ToolBar
        data={sortDS}
        level={level}
        levelMap={$.levelMap}
        sort={sort}
        direction={direction}
        onLevelSelect={$.onLevelSelect}
        onSortPress={$.onSortPress}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.tinygrail}>
        <StatusBarEvents />
        {!!_loaded && (
          <Tabs
            routes={tabs}
            renderContentHeaderComponent={this.renderContentHeaderComponent()}
            renderItem={item => <List key={item.key} id={item.key} />}
            renderLabel={({ route, focused }) => (
              <Flex style={styles.labelText} justify='center'>
                <Text type='tinygrailPlain' size={13} bold={focused}>
                  {route.title}
                </Text>
                {!!this.getCount(route) && (
                  <Text type='tinygrailText' size={11} bold lineHeight={13}>
                    {' '}
                    {this.getCount(route)}{' '}
                  </Text>
                )}
              </Flex>
            )}
          />
        )}
      </View>
    )
  }
}

const styles = _.create({
  labelText: {
    width: '100%'
  }
})
