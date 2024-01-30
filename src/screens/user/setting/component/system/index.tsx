/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:42:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-28 13:08:42
 */
import React from 'react'
import { ActionSheet, Heatmap } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, userStore } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useBoolean, useObserver } from '@utils/hooks'
import { STORYBOOK } from '@constants'
import i18n from '@constants/i18n'
import { Navigation } from '@types'
import { getShows } from '../../utils'
import { useCloud } from './hooks'
import { handleDownload, handleRestore, handleUpload } from './utils'
import { COMPONENT, TEXTS } from './ds'

function System({ navigation, filter }: { navigation: Navigation; filter: string }) {
  r(COMPONENT)

  const text = useCloud()
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        {/* 同步设置 */}
        <ItemSetting
          hd={`同步${i18n.setting()}`}
          arrow
          highlight
          filter={filter}
          onPress={setTrue}
        />
        <ActionSheet show={state} title='同步' onClose={setFalse}>
          {/* 同步设置 */}
          <ItemSettingBlock
            show={shows.setting}
            style={_.mt.sm}
            title={`同步${i18n.setting()}`}
            information={`同步${i18n.setting()}、超展开${i18n.setting()}、自定义放送数据`}
            filter={filter}
          >
            <ItemSettingBlock.Item
              icon='md-ios-share'
              iconStyle={{
                transform: [
                  {
                    rotate: '180deg'
                  }
                ]
              }}
              title='下载'
              information={
                text || ((!userStore.isLogin || !userStore.userInfo.id) && `需${i18n.login()}`)
              }
              filter={filter}
              onPress={handleDownload}
            />
            <ItemSettingBlock.Item
              style={_.ml.md}
              icon='md-ios-share'
              title='上传'
              information={(!userStore.isLogin || !userStore.userInfo.id) && `需${i18n.login()}`}
              filter={filter}
              onPress={handleUpload}
            />
            <ItemSettingBlock.Item
              style={_.ml.md}
              icon='md-refresh'
              title={`恢复${i18n.initial()}`}
              filter={filter}
              onPress={handleRestore}
            />
          </ItemSettingBlock>

          {/* 同步收藏的帖子 */}
          <ItemSetting show={shows.settingTopic} filter={filter} {...TEXTS.settingTopic} />
        </ActionSheet>

        {/* 网络探针 */}
        <ItemSetting
          show={!STORYBOOK && shows.serverStatus}
          arrow
          highlight
          filter={filter}
          onPress={() => {
            t('设置.跳转', {
              title: '网络探针',
              to: 'ServerStatus'
            })
            navigation.push('ServerStatus')
          }}
          {...TEXTS.serverStatus}
        >
          <Heatmap id='设置.跳转' to='ServerStatus' alias='网络探针' />
        </ItemSetting>
      </>
    )
  })
}

export default System
