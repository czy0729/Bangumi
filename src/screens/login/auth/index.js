/*
 * @Author: czy0729
 * @Date: 2019-03-31 10:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:58:39
 */
import React from 'react'
import { View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Flex, StatusBarEvents, Button, UM } from '@components'
import { StatusBarPlaceholder, IconTouchable, IconTabBar } from '@screens/_'
import { _, userStore } from '@stores'
import { ob } from '@utils/decorators'
import { hm } from '@utils/fetch'

const title = '预登陆'

export default
@ob
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
      <>
        <UM screen={title} />
        <StatusBarEvents backgroundColor='transparent' />
        <NavigationEvents
          onWillFocus={() => {
            if (userStore.isLogin) {
              navigation.navigate('Home')
            }
          }}
        />
        <View style={_.container.plain}>
          <StatusBarPlaceholder />
          <Flex style={styles.toolbar}>
            <Flex.Item>
              <IconTouchable
                name='setting'
                size={20}
                color={_.colorDesc}
                onPress={() => navigation.push('Setting')}
              />
            </Flex.Item>
            <IconTouchable
              name='search'
              size={20}
              color={_.colorDesc}
              onPress={() => navigation.push('Search')}
            />
          </Flex>
          <Flex
            style={{
              height: _.window.height - 120
            }}
            direction='column'
            justify='center'
          >
            <Button
              style={styles.btn}
              shadow
              onPress={() => navigation.push('LoginV2')}
            >
              登陆管理进度
            </Button>
          </Flex>
        </View>
      </>
    )
  }
}

const styles = _.create({
  toolbar: {
    padding: _.sm
  },
  btn: {
    width: 160,
    marginTop: _.md,
    marginBottom: 96
  }
})
