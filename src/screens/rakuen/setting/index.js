/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-15 14:27:19
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { Text, Switch } from '@components'
import { ItemSetting, Popover } from '@screens/_'
import { _, rakuenStore } from '@stores'
import { withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants/model'
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

  renderTopic() {
    const { quote, scrollDirection } = rakuenStore.setting
    return (
      <>
        <Text style={[_.container.wind, _.mt.md]} type='sub'>
          帖子
        </Text>
        <ItemSetting
          style={_.mt.sm}
          hd='是否展开引用'
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
          hd='楼层导航条方向'
          ft={
            <Popover
              data={MODEL_RAKUEN_SCROLL_DIRECTION.data.map(
                ({ label }) => label
              )}
              onSelect={title => {
                t('超展开设置.切换', {
                  title: '楼层导航条方向',
                  value: title
                })
                rakuenStore.setScrollDirection(
                  MODEL_RAKUEN_SCROLL_DIRECTION.getValue(title)
                )
              }}
            >
              <Text size={16} type='sub'>
                {MODEL_RAKUEN_SCROLL_DIRECTION.getLabel(scrollDirection)}
              </Text>
            </Popover>
          }
          arrow
          highlight
        />
      </>
    )
  }

  renderList() {
    const { isBlockDefaultUser, isMarkOldTopic } = rakuenStore.setting
    return (
      <>
        <Text style={[_.container.wind, _.mt.md]} type='sub'>
          列表
        </Text>
        <ItemSetting
          style={_.mt.sm}
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
      </>
    )
  }

  renderBlock() {
    return (
      <>
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
      </>
    )
  }

  render() {
    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.bottom}
      >
        {this.renderTopic()}
        {this.renderList()}
        {this.renderBlock()}
      </ScrollView>
    )
  }
}
