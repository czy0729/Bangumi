/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-24 23:34:32
 */
import React from 'react'
import { ScrollView, AsyncStorage } from 'react-native'
import { CacheManager } from 'react-native-expo-image-cache'
import { Modal, Switch } from '@ant-design/react-native'
import { Text } from '@components'
import { systemStore, userStore } from '@stores'
import { withHeader, observer } from '@utils/decorators'
import { info } from '@utils/ui'
import { MODEL_SETTING_QUALITY } from '@constants/model'
import _ from '@styles'
import Item from './item'

export default
@withHeader()
@observer
class Setting extends React.Component {
  static navigationOptions = {
    title: '设置'
  }

  setQuality = () => {
    const data = MODEL_SETTING_QUALITY.data.map(({ label }) => ({
      text: label,
      onPress: () => systemStore.setQuality(label)
    }))
    Modal.operation(data)
  }

  clearStorage = () => {
    Modal.alert(
      '确定清除缓存?',
      <Text style={_.mt.xs} type='sub' size={14}>
        包括图片缓存和页面接口的数据缓存
      </Text>,
      [
        {
          text: '取消',
          style: {
            color: _.colorSub
          }
        },
        {
          text: '确定',
          style: {
            color: _.colorDanger
          },
          onPress: async () => {
            await AsyncStorage.clear()
            await CacheManager.clearCache()
            systemStore.setStorage('setting')
            userStore.setStorage('accessToken')
            userStore.setStorage('userInfo')
            info('已清除')
          }
        }
      ]
    )
  }

  logout = () => {
    Modal.alert('确定退出登录?', <Text style={{ marginTop: -_.xs }} />, [
      {
        text: '取消',
        style: {
          color: _.colorSub
        }
      },
      {
        text: '确定',
        style: {
          color: _.colorDanger
        },
        onPress: async () => {
          await userStore.logout()
          info('已登出')
        }
      }
    ])
  }

  render() {
    const { quality, cnFirst, autoFetch } = systemStore.setting
    return (
      <ScrollView style={_.container.screen}>
        <Item
          style={_.mt.md}
          hd='图片质量'
          ft={MODEL_SETTING_QUALITY.getLabel(quality)}
          arrow
          highlight
          onPress={this.setQuality}
        />
        <Item
          border
          hd='优先使用中文'
          ft={<Switch checked={cnFirst} onChange={systemStore.switchCnFirst} />}
          withoutFeedback
        />
        <Item
          border
          hd='切换页面时自动请求'
          ft={
            <Switch
              checked={autoFetch}
              onChange={systemStore.switchAutoFetch}
            />
          }
          withoutFeedback
        />
        <Item
          style={_.mt.md}
          hd='清除缓存'
          arrow
          highlight
          onPress={this.clearStorage}
        />
        <Item
          style={_.mt.md}
          hd='退出登录'
          arrow
          highlight
          onPress={this.logout}
        />
      </ScrollView>
    )
  }
}
