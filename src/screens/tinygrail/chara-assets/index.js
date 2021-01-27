/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:10:04
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import ToolBar from '../_/tool-bar'
import Tabs from '../_/tabs-v2'
import Right from './right'
import List from './list'
import Store, { tabs, sortDS } from './store'

const title = '我的持仓'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/chara/assets', 'TinygrailCharaAssets'],
  withHeaderParams
})
@obc
class TinygrailCharaAssets extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const { userName } = params
    if (userName) {
      return {
        title: `${userName}的持仓`
      }
    }
    return {
      title
    }
  }

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
          <Flex style={this.styles.check}>
            <Iconfont
              name='check-simple'
              size={13}
              color={_.colorTinygrailText}
            />
            <Text style={_.ml.xs} size={13} type='tinygrailText'>
              多选
            </Text>
          </Flex>
        </Touchable>
      )
    )
  }

  renderContentHeaderComponent() {
    const { $ } = this.context
    const { page, level, sort, direction } = $.state
    if (page !== 0) {
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
      <View style={this.styles.container}>
        <StatusBarEvents />
        {!!_loaded && (
          <Tabs
            routes={tabs}
            renderContentHeaderComponent={this.renderContentHeaderComponent()}
            renderItem={item => <List key={item.key} id={item.key} />}
            renderLabel={({ route, focused }) => (
              <Flex style={this.styles.labelText} justify='center'>
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

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  },
  check: {
    paddingHorizontal: 8,
    height: 44,
    marginTop: -3
  },
  labelText: {
    width: '100%'
  }
}))
