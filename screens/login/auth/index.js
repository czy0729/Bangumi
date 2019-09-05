/*
 * @Author: czy0729
 * @Date: 2019-03-31 10:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-05 16:15:15
 */
import React from 'react'
import { View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { observer } from 'mobx-react'
import { StatusBarEvents, Text, Button } from '@components'
import { IconTabsHeader, IconTabBar } from '@screens/_'
import { hm } from '@utils/fetch'
import { userStore } from '@stores'
import _ from '@styles'

const title = '首页 (未登陆)'

export default
@observer
class Auth extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => <IconTabBar name='star' color={tintColor} />,
    tabBarLabel: '进度'
  }

  componentDidMount() {
    hm('auth', title)
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={[_.container.column, { backgroundColor: _.colorBg }]}>
        <StatusBarEvents backgroundColor={_.colorBg} />
        <IconTabsHeader
          style={_.header.left}
          name='setting'
          color={_.colorSub}
          onPress={() => navigation.push('Setting')}
        />
        <IconTabsHeader
          style={_.header.right}
          name='search'
          color={_.colorSub}
          onPress={() => navigation.push('Search')}
        />
        <IconTabsHeader
          style={[
            _.header.right,
            {
              right: 44
            }
          ]}
          name='trophy-full'
          color={_.colorYellow}
          onPress={() => navigation.push('TinygrailOverview')}
        />
        <NavigationEvents
          onWillFocus={() => {
            if (userStore.isLogin) {
              navigation.navigate('Home')
            }
          }}
        />
        <Text type='sub' size={16}>
          使用Bangumi管理观看进度
        </Text>
        <Button
          style={[
            {
              width: 160,
              marginBottom: _.lg
            },
            _.mt.md
          ]}
          shadow
          onPress={() => navigation.push('LoginV2')}
        >
          现在登陆
        </Button>
      </View>
    )
  }
}
