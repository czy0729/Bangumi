/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-27 11:54:41
 */
import React from 'react'
import { View } from 'react-native'
import {
  ScrollView,
  Text,
  SwitchPro,
  Flex,
  SegmentedControl,
  Input,
  Touchable,
  Iconfont
} from '@components'
import { ItemSetting } from '@screens/_'
import { _, rakuenStore } from '@stores'
import { withHeader, ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import { MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants/model'
import History from './history'

const scrollDirectionDS = MODEL_RAKUEN_SCROLL_DIRECTION.data.map(item => item.label)
const title = '超展开设置'

export default
@withHeader({
  screen: title,
  hm: ['rakuen/settings', 'RakuenSetting']
})
@ob
class RakuenSetting extends React.Component {
  state = {
    keyword: ''
  }

  onChange = keyword => {
    this.setState({
      keyword: keyword.trim()
    })
  }

  onSubmit = () => {
    const { keyword } = this.state
    if (!keyword.length) {
      info('不能为空')
      return
    }

    rakuenStore.addBlockKeyword(keyword)
    this.setState({
      keyword: ''
    })
  }

  get setting() {
    return rakuenStore.setting
  }

  renderSection(text, information) {
    return (
      <Flex style={this.styles.section}>
        <Flex.Item>
          <Text type='sub' size={16} bold>
            {text}
          </Text>
          {!!information && (
            <Text style={this.styles.information} type='sub' size={12}>
              {information}
            </Text>
          )}
        </Flex.Item>
      </Flex>
    )
  }

  renderTopic() {
    const { matchLink, acSearch, quote, quoteAvatar, scrollDirection } = this.setting
    return (
      <>
        {this.renderSection('帖子')}
        <ItemSetting
          hd='楼层链接显示成信息块'
          ft={
            <SwitchPro
              style={this.styles.switch}
              value={matchLink}
              onSyncPress={() => {
                t('超展开设置.切换', {
                  title: '显示信息块',
                  checked: !matchLink
                })
                rakuenStore.switchSetting('matchLink')
              }}
            />
          }
          withoutFeedback
          information='若楼层出现特定页面链接，使用不同的UI代替'
        />
        <ItemSetting
          hd='[实验性] 楼层内容猜测条目'
          ft={
            <SwitchPro
              style={this.styles.switch}
              value={acSearch}
              onSyncPress={() => {
                t('超展开设置.切换', {
                  title: '猜测条目',
                  checked: !acSearch
                })
                rakuenStore.switchSetting('acSearch')
              }}
            />
          }
          withoutFeedback
          information='使用条目词库对楼层文字进行猜测匹配，若匹配成功文字下方显示下划线，点击直接去到条目页面'
        />
        <ItemSetting
          hd='展开引用'
          ft={
            <SwitchPro
              style={this.styles.switch}
              value={quote}
              onSyncPress={() => {
                t('超展开设置.切换', {
                  title: '展开引用',
                  checked: !quote
                })
                rakuenStore.switchSetting('quote')
              }}
            />
          }
          withoutFeedback
          information='展开子回复中上一级的回复内容'
        />
        {quote && (
          <ItemSetting
            hd='显示引用头像'
            ft={
              <SwitchPro
                style={this.styles.switch}
                value={quoteAvatar}
                onSyncPress={() => {
                  t('超展开设置.切换', {
                    title: '显示引用头像',
                    checked: !quoteAvatar
                  })
                  rakuenStore.switchSetting('quoteAvatar')
                }}
              />
            }
            withoutFeedback
          />
        )}
        <ItemSetting
          border
          hd='楼层直达条'
          ft={
            <SegmentedControl
              style={this.styles.segmentedControl}
              size={12}
              values={scrollDirectionDS}
              selectedIndex={MODEL_RAKUEN_SCROLL_DIRECTION.data.findIndex(
                item => item.value === scrollDirection
              )}
              onValueChange={title => {
                t('超展开设置.切换', {
                  title: '楼层导航条方向',
                  value: title
                })
                rakuenStore.setScrollDirection(
                  MODEL_RAKUEN_SCROLL_DIRECTION.getValue(title)
                )
              }}
            />
          }
        />
      </>
    )
  }

  renderList() {
    const { filterDelete, isBlockDefaultUser, isMarkOldTopic } = this.setting
    return (
      <>
        {this.renderSection('列表')}
        <ItemSetting
          hd='过滤用户删除的楼层'
          ft={
            <SwitchPro
              style={this.styles.switch}
              value={filterDelete}
              onSyncPress={() => {
                t('超展开设置.切换', {
                  title: '过滤删除',
                  checked: !filterDelete
                })
                rakuenStore.switchSetting('filterDelete')
              }}
            />
          }
          withoutFeedback
        />
        <ItemSetting
          hd='屏蔽疑似广告姬'
          ft={
            <SwitchPro
              style={this.styles.switch}
              value={isBlockDefaultUser}
              onSyncPress={() => {
                t('超展开设置.切换', {
                  title: '屏蔽广告',
                  checked: !isBlockDefaultUser
                })
                rakuenStore.switchSetting('isBlockDefaultUser')
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
              style={this.styles.switch}
              value={isMarkOldTopic}
              onSyncPress={() => {
                t('超展开设置.切换', {
                  title: '坟贴',
                  checked: !isMarkOldTopic
                })
                rakuenStore.switchSetting('isMarkOldTopic')
              }}
            />
          }
          withoutFeedback
          information='标记发布时间大于1年的帖子'
        />
      </>
    )
  }

  renderCustom() {
    const { keyword } = this.state
    return (
      <>
        {this.renderSection('屏蔽关键字', '对标题、正文内容生效')}
        <History
          data={this.setting.blockKeywords}
          onDelete={item => {
            t('超展开设置.取消关键字', {
              item
            })
            rakuenStore.deleteBlockKeyword(item)
          }}
        />
        <Flex style={this.styles.section}>
          <Flex.Item>
            <Input
              value={keyword}
              placeholder='输入关键字'
              returnKeyType='search'
              returnKeyLabel='添加'
              onChangeText={this.onChange}
              onSubmitEditing={this.onSubmit}
            />
          </Flex.Item>
          <Touchable style={_.ml.md} onPress={this.onSubmit}>
            <Flex style={this.styles.icon} justify='center'>
              <Iconfont name='md-add' size={24} />
            </Flex>
          </Touchable>
        </Flex>
      </>
    )
  }

  renderBlock() {
    return (
      <>
        {this.renderSection('屏蔽小组 / 条目', '对帖子所属小组名生效')}
        <History
          data={this.setting.blockGroups}
          onDelete={item => {
            t('超展开设置.取消关键字', {
              item
            })
            rakuenStore.deleteBlockGroup(item)
          }}
        />
        <View style={this.styles.split} />
        {this.renderSection('屏蔽用户', '对发帖人、楼层主、条目评分留言人生效')}
        <History
          style={_.mt.sm}
          data={this.setting.blockUserIds}
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
        scrollToTop
      >
        {this.renderTopic()}
        <View style={this.styles.split} />
        {this.renderList()}
        <View style={this.styles.split} />
        {this.renderCustom()}
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
    paddingTop: _.md,
    paddingHorizontal: _.wind,
    paddingBottom: _.sm
  },
  split: {
    marginTop: _.md,
    marginHorizontal: _.wind,
    borderTopWidth: _.select(_.hairlineWidth, 1),
    borderColor: _.colorBorder
  },
  segmentedControl: {
    height: 28 * _.ratio,
    width: 164 * _.ratio
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  },
  icon: {
    width: 36,
    height: 36
  },
  information: {
    maxWidth: '80%',
    marginTop: _.xs
  }
}))
