/*
 * @Author: czy0729
 * @Date: 2019-03-31 10:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-06 16:25:48
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { observer } from 'mobx-react'
import { Flex, StatusBarEvents, Button, UM } from '@components'
import { SafeAreaView, IconTouchable, IconTabBar } from '@screens/_'
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
        <SafeAreaView forceInset={null}>
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
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  toolbar: {
    paddingHorizontal: _.sm
  },
  btn: {
    width: 160,
    marginTop: _.md,
    marginBottom: _.lg
  }
})
