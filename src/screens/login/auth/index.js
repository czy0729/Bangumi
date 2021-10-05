/*
 * @Author: czy0729
 * @Date: 2019-03-31 10:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-04 15:32:20
 */
import React from 'react'
import { View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import {
  Touchable,
  Flex,
  StatusBarEvents,
  Button,
  Iconfont,
  Text,
  UM
} from '@components'
import { StatusBarPlaceholder, IconTouchable, IconTabBar } from '@screens/_'
import { _, userStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { hm } from '@utils/fetch'

const title = '预登陆'

export default
@ob
class Auth extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <IconTabBar name='md-star-outline' color={tintColor} />
    ),
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
              <Touchable
                style={_.ml.sm}
                onPress={() => open('https://www.yuque.com/chenzhenyu-k0epm/znygb4')}
              >
                <Flex>
                  <Iconfont
                    name='md-chrome-reader-mode'
                    color={_.colorDesc}
                    size={20}
                  />
                  <Text style={_.ml.xs} size={13}>
                    指南
                  </Text>
                </Flex>
              </Touchable>
            </Flex.Item>
            <IconTouchable
              style={{
                marginTop: -2
              }}
              name='setting'
              color={_.colorDesc}
              size={19}
              onPress={() => navigation.push('Setting')}
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
    width: 160 * _.ratio,
    marginTop: _.md,
    marginBottom: 96
  }
})
