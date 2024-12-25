/*
 * @Author: czy0729
 * @Date: 2024-01-31 18:05:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-31 18:09:39
 */
import React from 'react'
import { SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { styles } from '../styles'
import { useAsyncSwitchSetting } from '../../hooks'
import { COMPONENT } from './ds'

/** 基本设置 */
function Base() {
  r(COMPONENT)

  const { value: filterDelete, handleSwitch: handleSwitchFilterDelete } =
    useAsyncSwitchSetting('filterDelete')
  const { value: isBlockDefaultUser, handleSwitch: handleSwitchIsBlockDefaultUser } =
    useAsyncSwitchSetting('isBlockDefaultUser')
  const { value: isMarkOldTopic, handleSwitch: handleSwitchIsMarkOldTopic } =
    useAsyncSwitchSetting('isMarkOldTopic')

  return useObserver(() => (
    <Block>
      <Tip>列表</Tip>

      {/* 过滤用户删除的楼层 */}
      <ItemSetting
        hd='过滤用户删除的楼层'
        ft={
          <SwitchPro
            style={styles.switch}
            value={filterDelete}
            onSyncPress={() => {
              handleSwitchFilterDelete()

              t('超展开设置.切换', {
                title: '过滤删除',
                checked: !filterDelete
              })
            }}
          />
        }
        withoutFeedback
      />

      {/* 屏蔽疑似广告姬 */}
      <ItemSetting
        hd='屏蔽疑似广告姬'
        information='屏蔽默认头像发布且回复数小于 4 的帖子'
        ft={
          <SwitchPro
            style={styles.switch}
            value={isBlockDefaultUser}
            onSyncPress={() => {
              handleSwitchIsBlockDefaultUser()

              t('超展开设置.切换', {
                title: '屏蔽广告',
                checked: !isBlockDefaultUser
              })
            }}
          />
        }
        withoutFeedback
      />

      {/* 标记坟贴 */}
      <ItemSetting
        hd='标记坟贴'
        information='标记发布时间大于 1 年的帖子'
        ft={
          <SwitchPro
            style={styles.switch}
            value={isMarkOldTopic}
            onSyncPress={() => {
              handleSwitchIsMarkOldTopic()

              t('超展开设置.切换', {
                title: '坟贴',
                checked: !isMarkOldTopic
              })
            }}
          />
        }
        withoutFeedback
      />
    </Block>
  ))
}

export default Base
