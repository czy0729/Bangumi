/*
 * @Author: czy0729
 * @Date: 2022-03-15 23:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-24 15:57:00
 */
import React from 'react'
import {
  Page,
  ScrollView,
  SwitchPro,
  Flex,
  SegmentedControl,
  Input,
  Text,
  Touchable,
  Iconfont
} from '@components'
import { ItemSetting } from '@_'
import { _, rakuenStore, uiStore } from '@stores'
import { info } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants'
import { Navigation } from '@types'
import Block from '../../../user/setting/block'
import Tip from '../../../user/setting/tip'
import History from './../history'
import { memoStyles } from './styles'
import { getYuqueThumbs } from './utils'

const scrollDirectionDS = MODEL_RAKUEN_SCROLL_DIRECTION.data.map(item => item.label)

class RakuenSetting extends React.Component<{
  navigation: Navigation
}> {
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

  onScroll = () => {
    uiStore.closePopableSubject()
  }

  get setting() {
    return rakuenStore.setting
  }

  renderTopic() {
    const {
      matchLink,
      acSearch,
      acSearchPopable,
      quote,
      quoteAvatar,
      wide,
      scrollDirection
    } = this.setting
    return (
      <Block>
        <Tip>帖子</Tip>

        {/* 楼层链接显示成信息块 */}
        <ItemSetting
          hd='楼层链接显示成信息块'
          information='若楼层出现特定页面链接，使用不同的 UI 代替'
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
          thumb={getYuqueThumbs([
            '0/2022/png/386799/1661155814563-74ea244f-c48c-49d2-8fa0-be0bc220724e.png',
            '0/2022/png/386799/1661155854261-970ecf62-6eaa-4b0f-b280-347233ada8f1.png'
          ])}
        />

        {/* 楼层内容猜测条目 */}
        <ItemSetting
          hd='楼层内容猜测条目'
          information='使用条目词库对楼层文字进行猜测匹配，若匹配成功文字下方显示下划线，点击直接去到条目页面'
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
          thumb={getYuqueThumbs([
            '0/2022/png/386799/1661156697962-47872ab9-dd71-40e7-84c6-842d014fa85e.png',
            '0/2022/png/386799/1661156404852-5419bd25-408e-49b3-9e0a-57b480b54ecf.png'
          ])}
        />

        {/* 猜测条目先显示缩略信息 */}
        <ItemSetting
          hd='[实验性] 猜测条目先显示缩略信息'
          information='若猜测命中关键字，为了不打断阅读，会在图层上方先显示缩略信息，再次点击才会进入条目页面'
          ft={
            <SwitchPro
              style={this.styles.switch}
              value={acSearchPopable}
              onSyncPress={() => {
                t('超展开设置.切换', {
                  title: '猜测条目',
                  checked: !acSearch
                })
                rakuenStore.switchSetting('acSearchPopable')
              }}
            />
          }
          withoutFeedback
          thumb={getYuqueThumbs([
            '0/2022/png/386799/1661157003238-c24ee52e-85ba-43b1-81fb-71e2596c6562.png',
            '0/2022/png/386799/1661157009090-307ff23e-1734-4914-8c8e-1537faa7e9f9.png'
          ])}
        />
        <Flex style={this.styles.acSearchPopable}>
          <Text size={13}>试一试∶</Text>
          <Text size={13}>
            <Text
              size={13}
              bold
              underline
              onPress={() => {
                uiStore.showPopableSubject({
                  subjectId: 364450
                })
              }}
            >
              石蒜
            </Text>
            物语是什么鬼翻译[bgm38]
          </Text>
        </Flex>

        {/* 展开引用 */}
        <ItemSetting
          hd='展开引用'
          information='展开子回复中上一级的回复内容'
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
          thumb={getYuqueThumbs([
            '0/2022/png/386799/1661157694142-917c49b1-96f4-4d51-9cdc-a39ea80a4de5.png',
            '0/2022/png/386799/1661157697155-91a59c53-a075-423b-8116-717583a7f5f2.png'
          ])}
        />

        {/* 显示引用头像 */}
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
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661157853356-0ecf0000-acd2-4faf-acfb-9804498ee85c.png',
              '0/2022/png/386799/1661157856095-60c6b420-8aba-406b-8c82-97a8360c84c1.png'
            ])}
          />
        )}

        {/* 楼层内容使用加宽版展示 */}
        <ItemSetting
          hd='楼层内容加宽展示'
          ft={
            <SwitchPro
              style={this.styles.switch}
              value={wide}
              onSyncPress={() => {
                t('超展开设置.切换', {
                  title: '加宽展示',
                  checked: !wide
                })
                rakuenStore.switchSetting('wide')
              }}
            />
          }
          withoutFeedback
          thumb={getYuqueThumbs([
            '0/2022/png/386799/1661327786769-cd143b43-e267-4648-af34-179efbe052af.png',
            '0/2022/png/386799/1661327416446-79d19833-ed5c-4a44-a86e-06c00e83f12d.png'
          ])}
        />

        {/* 楼层直达条 */}
        <ItemSetting
          hd='楼层直达条'
          ft={
            <SegmentedControl
              style={this.styles.segmentedControl}
              backgroundColor={_.select(_.colorBg, _.colorPlain)}
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
          thumb={getYuqueThumbs([
            '0/2022/png/386799/1661159480188-a1279dab-0af3-4985-ba54-cda3581a5cbf.png'
          ])}
        />
      </Block>
    )
  }

  renderList() {
    const { filterDelete, isBlockDefaultUser, isMarkOldTopic } = this.setting
    return (
      <Block>
        <Tip>列表</Tip>
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
          information='屏蔽默认头像发布且回复数小于4的帖子'
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
        />
        <ItemSetting
          information='标记发布时间大于1年的帖子'
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
        />
      </Block>
    )
  }

  renderCustom() {
    const { keyword } = this.state
    return (
      <Block>
        <Tip>屏蔽关键字（对标题、正文内容生效）</Tip>
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
              style={this.styles.input}
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
      </Block>
    )
  }

  renderBlock() {
    const { navigation } = this.props
    return (
      <>
        <Block>
          <Tip>屏蔽小组 / 条目（对帖子所属小组名生效）</Tip>
          <History
            data={this.setting.blockGroups}
            onDelete={item => {
              t('超展开设置.取消关键字', {
                item
              })
              rakuenStore.deleteBlockGroup(item)
            }}
          />
        </Block>
        <Block>
          <Tip>屏蔽用户（对发帖人、楼层主、条目评分留言人生效）</Tip>
          <History
            navigation={navigation}
            data={this.setting.blockUserIds}
            onDelete={item => {
              t('超展开设置.取消用户', {
                item
              })
              rakuenStore.deleteBlockUser(item)
            }}
          />
        </Block>
      </>
    )
  }

  render() {
    return (
      <Page style={_.select(_.container.bg, _.container.plain)}>
        <ScrollView
          contentContainerStyle={this.styles.container}
          onScroll={this.onScroll}
        >
          {this.renderTopic()}
          {this.renderList()}
          {this.renderCustom()}
          {this.renderBlock()}
        </ScrollView>
      </Page>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default ob(RakuenSetting)
