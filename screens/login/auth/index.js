/*
 * @Author: czy0729
 * @Date: 2019-03-31 10:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 22:18:54
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
      <View style={[_.container.column, _.container.plain]}>
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
          style={this.styles.icon}
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
          style={this.styles.btn}
          shadow
          onPress={() => navigation.push('LoginV2')}
        >
          登陆管理进度
        </Button>
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  icon: {
    ..._.header.right,
    right: 44
  },
  btn: {
    width: 160,
    marginTop: _.md,
    marginBottom: _.lg
  }
}))
