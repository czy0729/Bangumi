/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-24 23:49:04
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text, SwitchPro, Flex, SegmentedControl } from '@components'
import { ItemSetting } from '@screens/_'
import { _, rakuenStore } from '@stores'
import { withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants/model'
import History from './history'

const scrollDirectionDS = MODEL_RAKUEN_SCROLL_DIRECTION.data.map(
  item => item.label
)
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

  renderSection(text) {
    return (
      <Flex style={this.styles.section}>
        <Flex.Item>
          <Text size={16} type='sub'>
            {text}
          </Text>
        </Flex.Item>
      </Flex>
    )
  }

  renderTopic() {
    const { quote, scrollDirection } = rakuenStore.setting
    return (
      <>
        {this.renderSection('帖子')}
        <ItemSetting
          hd='展开引用'
          ft={
            <SwitchPro
              value={quote}
              onSyncPress={() => {
                t('超展开设置.切换', {
                  title: '展开引用',
                  checked: !quote
                })
                rakuenStore.switchQuote()
              }}
            />
          }
          withoutFeedback
          information='展开子回复中上一级的回复内容'
        />
        <ItemSetting
          border
          hd='楼层直达条'
          ft={
            <SegmentedControl
              values={scrollDirectionDS}
              selectedIndex={MODEL_RAKUEN_SCROLL_DIRECTION.data.findIndex(
                item => item.value === scrollDirection
              )}
              onValueChange={this.setHomeSorting}
            />
          }
        />
      </>
    )
  }

  renderList() {
    const { isBlockDefaultUser, isMarkOldTopic } = rakuenStore.setting
    return (
      <>
        {this.renderSection('列表')}
        <ItemSetting
          hd='屏蔽疑似广告姬'
          ft={
            <SwitchPro
              value={isBlockDefaultUser}
              onSyncPress={() => {
                t('超展开设置.切换', {
                  title: '屏蔽广告',
                  checked: !isBlockDefaultUser
                })
                rakuenStore.switchIsBlockDefaultUser()
              }}
            />
          }
          withoutFeedback
          information='屏蔽默认头像发布且回复数小于4的帖子'
        />
        <ItemSetting
          border
          hd='标记坟贴'
          ft={
            <SwitchPro
              value={isMarkOldTopic}
              onSyncPress={() => {
                t('超展开设置.切换', {
                  title: '坟贴',
                  checked: !isMarkOldTopic
                })
                rakuenStore.switchIsMarkOldTopic()
              }}
            />
          }
          withoutFeedback
          information='标记发布时间大于1年的帖子'
        />
      </>
    )
  }

  renderBlock() {
    return (
      <>
        {this.renderSection('屏蔽小组 / 条目')}
        <History
          data={rakuenStore.setting.blockGroups}
          onDelete={item => {
            t('超展开设置.取消关键字', {
              item
            })
            rakuenStore.deleteBlockGroup(item)
          }}
        />
        <View style={this.styles.split} />
        {this.renderSection('屏蔽用户')}
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
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
      >
        {this.renderTopic()}
        <View style={this.styles.split} />
        {this.renderList()}
        <View style={this.styles.split} />
        {this.renderBlock()}
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  section: {
    paddingTop: _.lg,
    paddingHorizontal: _.wind,
    paddingBottom: _.md
  },
  split: {
    marginTop: _.md,
    marginHorizontal: _.wind,
    borderTopWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  }
}))
