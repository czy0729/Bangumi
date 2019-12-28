/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-21 14:39:41
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { Text, Switch } from '@components'
import { ItemSetting } from '@screens/_'
import { _, rakuenStore } from '@stores'
import { withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import History from './history'

const title = '超展开设置'

export default
@withHeader({
  screen: title,
  hm: ['rakuen/settings', 'RakuenSetting']
})
@observer
class RakuenSetting extends React.Component {
  static navigationOptions = {
    title
  }

  render() {
    const { quote, isBlockDefaultUser, isMarkOldTopic } = rakuenStore.setting
    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.bottom}
      >
        <Text style={[_.container.wind, _.mt.md]} type='sub'>
          基本
        </Text>
        <ItemSetting
          style={_.mt.sm}
          hd='帖子展开引用'
          ft={
            <Switch
              checked={quote}
              onChange={() => {
                t('超展开设置.切换', {
                  title: '展开引用',
                  checked: !quote
                })
                rakuenStore.switchQuote()
              }}
            />
          }
          withoutFeedback
        />
        <ItemSetting
          border
          hd='屏蔽疑似的广告姬'
          ft={
            <Switch
              checked={isBlockDefaultUser}
              onChange={() => {
                t('超展开设置.切换', {
                  title: '屏蔽广告',
                  checked: !isBlockDefaultUser
                })
                rakuenStore.switchIsBlockDefaultUser()
              }}
            />
          }
          withoutFeedback
        />
        <ItemSetting
          border
          hd='标记坟贴'
          ft={
            <Switch
              checked={isMarkOldTopic}
              onChange={() => {
                t('超展开设置.切换', {
                  title: '坟贴',
                  checked: !isMarkOldTopic
                })
                rakuenStore.switchIsMarkOldTopic()
              }}
            />
          }
          withoutFeedback
        />
        <Text style={[_.container.wind, _.mt.md]} type='sub'>
          屏蔽中的关键字
        </Text>
        <History
          style={_.mt.sm}
          data={rakuenStore.setting.blockGroups}
          onDelete={item => {
            t('超展开设置.取消关键字', {
              item
            })
            rakuenStore.deleteBlockGroup(item)
          }}
        />
        <Text style={[_.container.wind, _.mt.md]} type='sub'>
          屏蔽中的用户
        </Text>
        <History
          style={_.mt.sm}
          data={rakuenStore.setting.blockUserIds}
          onDelete={item => {
            t('超展开设置.取消用户', {
              item
            })
            rakuenStore.deleteBlockUser(item)
          }}
        />
      </ScrollView>
    )
  }
}
