/*
 * @Author: czy0729
 * @Date: 2024-01-31 17:53:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-25 16:26:36
 */
import React from 'react'
import { SegmentedControl, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import {
  MODEL_RAKUEN_AUTO_LOAD_IMAGE,
  MODEL_RAKUEN_NEW_FLOOR_STYLE,
  MODEL_RAKUEN_SUB_EXPAND,
  RAKUEN_AUTO_LOAD_IMAGE,
  RAKUEN_NEW_FLOOR_STYLE,
  RAKUEN_SUB_EXPAND
} from '@constants'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { styles } from '../styles'
import { useAsyncSetSetting, useAsyncSwitchSetting } from '../../hooks'
import { getYuqueThumbs } from '../utils'
import { COMPONENT } from './ds'

/** 帖子 */
function Topic() {
  r(COMPONENT)

  const { value: quote, handleSwitch: handleSwitchQuote } = useAsyncSwitchSetting('quote')
  const { value: quoteAvatar, handleSwitch: handleSwitchQuoteAvatar } =
    useAsyncSwitchSetting('quoteAvatar')
  const { value: wide, handleSwitch: handleSwitchWide } = useAsyncSwitchSetting('wide')
  const { value: autoLoadImageV2, handleSet: handleSetAutoLoadImageV2 } =
    useAsyncSetSetting('autoLoadImageV2')
  const { value: newFloorStyle, handleSet: handleSetNewFloorStyle } =
    useAsyncSetSetting('newFloorStyle')
  const { value: subExpand, handleSet: handleSetSubExpand } = useAsyncSetSetting('subExpand')

  return useObserver(() => (
    <Block>
      <Tip>帖子</Tip>

      {/* 展开引用 */}
      <ItemSetting
        hd='展开引用'
        information='展开子回复中上一级的回复内容'
        ft={
          <SwitchPro
            style={styles.switch}
            value={quote}
            onSyncPress={() => {
              handleSwitchQuote()

              t('超展开设置.切换', {
                title: '展开引用',
                checked: !quote
              })
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
              style={styles.switch}
              value={quoteAvatar}
              onSyncPress={() => {
                handleSwitchQuoteAvatar()

                t('超展开设置.切换', {
                  title: '显示引用头像',
                  checked: !quoteAvatar
                })
              }}
            />
          }
          withoutFeedback
          thumb={getYuqueThumbs([
            '0/2022/png/386799/1661157853356-0ecf0000-acd2-4faf-acfb-9804498ee85c.png',
            '0/2022/png/386799/1661157856095-60c6b420-8aba-406b-8c82-97a8360c84c1.png'
          ])}
          sub
        />
      )}

      {/* 楼层内容使用加宽版展示 */}
      <ItemSetting
        hd='楼层加宽展示'
        ft={
          <SwitchPro
            style={styles.switch}
            value={wide}
            onSyncPress={() => {
              handleSwitchWide()

              t('超展开设置.切换', {
                title: '加宽展示',
                checked: !wide
              })
            }}
          />
        }
        withoutFeedback
        thumb={getYuqueThumbs([
          '0/2022/png/386799/1661327786769-cd143b43-e267-4648-af34-179efbe052af.png',
          '0/2022/png/386799/1661327416446-79d19833-ed5c-4a44-a86e-06c00e83f12d.png'
        ])}
      />

      {/* 楼层中图片自动加载 */}
      <ItemSetting
        hd='图片自动加载'
        information='开启自动加载会强制加载所有图片，但因图床为用户自己选择，可能出现不稳定且图片体积大，导致加载失败或卡顿，建议谨慎开启自动加载。'
        ft={
          <SegmentedControl
            style={styles.segmentedControl}
            backgroundColor={_.select(_.colorBg, _.colorPlain)}
            size={12}
            values={RAKUEN_AUTO_LOAD_IMAGE.map(item => item.label)}
            selectedIndex={RAKUEN_AUTO_LOAD_IMAGE.findIndex(item => item.value === autoLoadImageV2)}
            onValueChange={title => {
              handleSetAutoLoadImageV2(MODEL_RAKUEN_AUTO_LOAD_IMAGE.getValue(title))

              t('超展开设置.切换', {
                title: '楼层中图片自动加载',
                value: title
              })
            }}
          />
        }
      />

      {/* 新楼层样式 */}
      <ItemSetting
        hd='新楼层样式'
        ft={
          <SegmentedControl
            style={styles.segmentedControl}
            backgroundColor={_.select(_.colorBg, _.colorPlain)}
            size={12}
            values={RAKUEN_NEW_FLOOR_STYLE.map(item => item.label)}
            selectedIndex={RAKUEN_NEW_FLOOR_STYLE.findIndex(item => item.value === newFloorStyle)}
            onValueChange={title => {
              handleSetNewFloorStyle(MODEL_RAKUEN_NEW_FLOOR_STYLE.getValue(title))

              t('超展开设置.切换', {
                title: '新楼层样式',
                value: title
              })
            }}
          />
        }
        thumb={getYuqueThumbs([
          '0/2024/png/386799/1730186697184-5779f201-d45d-45e9-af24-75118288ad4a.png',
          '0/2024/png/386799/1730186711789-3fc50f2a-16b4-4d73-921d-aca7013ca73f.png',
          '0/2024/png/386799/1730186721241-645916b3-3ac6-46ad-a382-91a6d465f284.png'
        ])}
      />

      {/* 子楼层折叠 */}
      <ItemSetting
        hd='子楼层折叠'
        information='子回复超过此值后折叠，需手动展开；0 代表一直折叠，因性能问题暂不提供不折叠'
        ft={
          <SegmentedControl
            style={styles.segmentedControl}
            backgroundColor={_.select(_.colorBg, _.colorPlain)}
            size={12}
            values={RAKUEN_SUB_EXPAND.map(item => item.label)}
            selectedIndex={RAKUEN_SUB_EXPAND.findIndex(item => item.value === subExpand)}
            onValueChange={title => {
              handleSetSubExpand(MODEL_RAKUEN_SUB_EXPAND.getValue(title))

              t('超展开设置.切换', {
                title: '子楼层折叠',
                value: title
              })
            }}
          />
        }
      />
    </Block>
  ))
}

export default Topic
