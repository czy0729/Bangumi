/*
 * @Author: czy0729
 * @Date: 2019-03-31 10:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 20:45:21
 */
import React from 'react'
import { View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { observer } from 'mobx-react'
import { StatusBarEvents, Button, Mesume, UM } from '@components'
import { IconTabsHeader, IconTinygrail, IconTabBar } from '@screens/_'
import { _, userStore } from '@stores'
import { hm } from '@utils/fetch'

const title = '预登陆'

export default
@observer
class Auth extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => <IconTabBar name='star' color={tintColor} />,
    tabBarLabel: '进度'
  }

  componentDidMount() {
    hm('auth', 'Auth')
  }

  render() {
    const { navigation } = this.props
    return (
      <View
        style={[
          _.container.column,
          {
            backgroundColor: _.colorBg
          }
        ]}
      >
        <UM screen={title} />
        <StatusBarEvents backgroundColor='transparent' />
        <IconTabsHeader
          style={_.header.left}
          name='setting'
          color={_.colorDesc}
          onPress={() => navigation.push('Setting')}
        />
        <IconTabsHeader
          style={_.header.right}
          name='search'
          color={_.colorDesc}
          onPress={() => navigation.push('Search')}
        />
        <IconTinygrail
          style={[
            _.header.right,
            {
              right: 44
            }
          ]}
          color={_.colorDesc}
          navigation={navigation}
        />
        <NavigationEvents
          onWillFocus={() => {
            if (userStore.isLogin) {
              navigation.navigate('Home')
            }
          }}
        />
        <Mesume />
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
          登陆管理进度
        </Button>
      </View>
    )
  }
}
