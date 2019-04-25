/*
 * @Author: czy0729
 * @Date: 2019-04-23 21:04:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-25 13:22:01
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, DrawerItems } from 'react-navigation'
import { DrawerActions } from 'react-navigation-drawer'
import { observer } from 'mobx-react'
import { BlurView, Flex, Image, Text, Touchable } from '@components'
import { userStore } from '@stores'
import _, {
  colorMain,
  colorPlain,
  colorDesc,
  colorSub,
  colorBorder
} from '@styles'
import StatusBarPlaceholder from './status-bar-placeholder'

const contentOptions = {
  activeTintColor: colorMain,
  activeBackgroundColor: colorPlain,
  inactiveTintColor: colorDesc,
  inactiveBackgroundColor: colorPlain,
  labelStyle: {
    marginLeft: 0,
    fontWeight: 'normal'
  }
}

const Drawer = ({ navigation, ...otherProps }) => {
  const { avatar, nickname, id } = userStore.userInfo
  return (
    <SafeAreaView
      style={_.container.flex}
      forceInset={{ top: 'never', horizontal: 'always' }}
    >
      <View style={_.container.flex}>
        <BlurView style={_.container.outer} theme='xlight' src={avatar.large}>
          <StatusBarPlaceholder
            style={{
              backgroundColor: 'transparent'
            }}
          />
          <View style={{ width: 80 }}>
            <Image src={avatar.large} size={80} radius border={colorBorder} />
          </View>
          <Text style={_.mt.sm} size={16}>
            {nickname}
            <Text type='sub'> @{id}</Text>
          </Text>
        </BlurView>
        <DrawerItems
          navigation={navigation}
          {...otherProps}
          {...contentOptions}
        />
      </View>
      <Flex>
        <Flex.Item>
          <Touchable>
            <Flex style={styles.bottom}>
              <Image
                size={20}
                placeholder={false}
                src={require('@assets/images/icon/setting.png')}
              />
              <Text style={styles.bottomText}>设置</Text>
            </Flex>
          </Touchable>
        </Flex.Item>
        <Flex.Item>
          <Touchable
            onPress={async () => {
              await userStore.logout()
              navigation.dispatch(DrawerActions.toggleDrawer())
            }}
          >
            <Flex style={styles.bottom}>
              <Image
                size={20}
                placeholder={false}
                src={require('@assets/images/icon/logout.png')}
              />
              <Text style={styles.bottomText}>注销</Text>
            </Flex>
          </Touchable>
        </Flex.Item>
      </Flex>
    </SafeAreaView>
  )
}

export default observer(Drawer)

const styles = StyleSheet.create({
  bottom: {
    paddingVertical: 14,
    paddingLeft: 17,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colorBorder
  },
  bottomText: {
    marginLeft: 18
  }
})
