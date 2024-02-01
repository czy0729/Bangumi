/*
 * @Author: czy0729
 * @Date: 2024-01-31 17:53:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-31 17:56:05
 */
import React from 'react'
import { SegmentedControl, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { _, rakuenStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MODEL_RAKUEN_SUB_EXPAND, RAKUEN_SUB_EXPAND } from '@constants'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { styles } from '../styles'
import { getYuqueThumbs } from '../utils'
import { COMPONENT } from './ds'

/** 帖子 */
function Topic() {
  const { autoLoadImage, quote, quoteAvatar, subExpand, wide } = rakuenStore.setting
  return (
    <Block>
      <Tip>帖子</Tip>

      {/* 楼层中图片自动加载 */}
      <ItemSetting
        hd='楼层中图片自动加载'
        information={`对于大于 2M 的图片开启后依然不会自动加载\n不推荐使用，因为观察到用户使用的图床都很慢，而且不压缩图片很大`}
        ft={
          <SwitchPro
            style={styles.switch}
            value={autoLoadImage}
            onSyncPress={() => {
              t('超展开设置.切换', {
                title: '楼层中图片自动加载',
                checked: !autoLoadImage
              })
              rakuenStore.switchSetting('autoLoadImage')
            }}
          />
        }
        withoutFeedback
      />

      {/* 展开引用 */}
      <ItemSetting
        hd='展开引用'
        information='展开子回复中上一级的回复内容'
        ft={
          <SwitchPro
            style={styles.switch}
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
              style={styles.switch}
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
            style={styles.switch}
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

      {/* 子楼层折叠 */}
      <ItemSetting
        hd='子楼层折叠'
        information='子回复超过此值后折叠，需手动展开。0 代表一直折叠，因性能问题暂不提供不折叠。'
        ft={
          <SegmentedControl
            style={styles.segmentedControl}
            backgroundColor={_.select(_.colorBg, _.colorPlain)}
            size={12}
            values={RAKUEN_SUB_EXPAND.map(item => item.label)}
            selectedIndex={RAKUEN_SUB_EXPAND.findIndex(item => item.value === subExpand)}
            onValueChange={title => {
              t('超展开设置.切换', {
                title: '子楼层折叠',
                value: title
              })
              rakuenStore.setSubExpand(MODEL_RAKUEN_SUB_EXPAND.getValue(title))
            }}
          />
        }
      />
    </Block>
  )
}

export default ob(Topic, COMPONENT)
