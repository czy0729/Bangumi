/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-13 22:55:07
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { withHeaderParams } from '@tinygrail/styles'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import ToolBar from '@tinygrail/_/tool-bar'
import Tabs from '@tinygrail/_/tabs-v2'
import Right from './right'
import List from './list'
import Store from './store'
import { tabs, sortDS } from './ds'

const title = '我的持仓'

export default
@inject(Store)
@withHeader({
  title: ({ userName } = {}) => (userName ? `${userName}的持仓` : title),
  screen: title,
  hm: ['tinygrail/chara/assets', 'TinygrailCharaAssets'],
  withHeaderParams
})
@obc
class TinygrailCharaAssets extends React.Component {
  async componentDidMount() {
    const { $, navigation } = this.context
    const { form } = $.params
    if (form === 'lottery') {
      $.initFormLottery()
    } else {
      $.init()
    }

    navigation.setParams({
      extra: <Right $={$} />
    })
  }

  getCount = route => {
    const { $ } = this.context
    switch (route.key) {
      case 'chara':
        return $.myCharaAssets?.chara?.list?.length || 0

      case 'temple':
        return $.temple?.list?.length === 2000
          ? '2000+'
          : $.temple?.list?.length || 0

      case 'ico':
        return $.myCharaAssets?.ico?.list?.length || 0

      default:
        return 0
    }
  }

  renderIncreaseBtn() {
    const { $ } = this.context
    const { editing } = $.state
    return (
      editing && (
        <Touchable onPress={$.increaseBatchSelect}>
          <Flex style={styles.check}>
            <Iconfont
              name='md-done-all'
              size={16}
              color={_.colorTinygrailText}
            />
          </Flex>
        </Touchable>
      )
    )
  }

  renderContentHeaderComponent() {
    const { $ } = this.context
    const { page, level, sort, direction } = $.state
    if (page > 1) {
      return undefined
    }

    return (
      <ToolBar
        data={sortDS}
        level={level}
        levelMap={$.levelMap}
        sort={sort}
        direction={direction}
        renderLeft={this.renderIncreaseBtn()}
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
  check: {
    paddingHorizontal: 8,
    height: 44,
    marginTop: -2
  },
  labelText: {
    width: '100%'
  }
})
