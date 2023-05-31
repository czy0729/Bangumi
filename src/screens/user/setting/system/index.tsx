/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:42:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-30 20:45:50
 */
import React, { useState } from 'react'
import { ActionSheet, Heatmap } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, userStore, systemStore, rakuenStore, calendarStore } from '@stores'
import { confirm, info, loading, feedback } from '@utils'
import { useObserver, useMount, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import { read } from '@utils/db'
import { STORYBOOK } from '@constants'
import i18n from '@constants/i18n'
import { getShows } from '../utils'
import { TEXTS } from './ds'

function System({ navigation, filter }) {
  const [settingLen, setSettingLen] = useState(0)
  const { state, setTrue, setFalse } = useBoolean(false)

  useMount(() => {
    setTimeout(async () => {
      try {
        const { id } = userStore.userInfo
        if (!id) return

        const { content } = await read({
          path: `setting/${id}.json`
        })

        if (content?.length) setSettingLen(content.length)
      } catch (error) {}
    }, 2400)
  })

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
                settingLen
                  ? `${(settingLen / 1000).toFixed(1)} kb`
                  : (!userStore.isLogin || !userStore.userInfo.id) &&
                    `需${i18n.login()}`
              }
              filter={filter}
              onPress={() => {
                t('设置.恢复默认设置', {
                  label: '下载'
                })

                if (!userStore.isLogin || !userStore.userInfo.id) {
                  return info(`下载需先${i18n.login()}`)
                }

                setTimeout(() => {
                  confirm('确定恢复到云端的设置?', async () => {
                    let hide = loading('下载设置(1/3)...')
                    const flag = await systemStore.downloadSetting()
                    hide()

                    hide = loading('超展开设置(2/3)...')
                    await rakuenStore.downloadSetting()
                    hide()

                    hide = loading('自定义放送数据(3/3)')
                    await calendarStore.downloadSetting()
                    hide()

                    feedback()
                    info(flag ? '已恢复' : '下载设置失败')
                  })
                }, 160)
              }}
            />
            <ItemSettingBlock.Item
              style={_.ml.md}
              icon='md-ios-share'
              title='上传'
              information={
                (!userStore.isLogin || !userStore.userInfo.id) && `需${i18n.login()}`
              }
              filter={filter}
              onPress={() => {
                t('设置.恢复默认设置', {
                  label: '上传'
                })

                if (!userStore.isLogin || !userStore.userInfo.id) {
                  return info(`上传需先${i18n.login()}`)
                }

                setTimeout(() => {
                  confirm('确定上传当前设置到云端?', async () => {
                    let hide = loading('上传设置(1/3)...')
                    const flag = await systemStore.uploadSetting()
                    hide()

                    hide = loading('超展开设置(2/3)...')
                    await rakuenStore.uploadSetting()
                    hide()

                    hide = loading('自定义放送数据(3/3)')
                    await calendarStore.uploadSetting()
                    hide()

                    feedback()
                    info(flag ? '已上传' : '上传失败，云服务异常，请待作者修复')
                  })
                }, 160)
              }}
            />
            <ItemSettingBlock.Item
              style={_.ml.md}
              icon='md-refresh'
              title={`恢复${i18n.initial()}`}
              filter={filter}
              onPress={() => {
                t('设置.恢复默认设置', {
                  label: '恢复默认'
                })

                setTimeout(() => {
                  confirm(
                    `仅会恢复${i18n.initial()}设置，不包含超展开设置和自定义放送数据，确定?`,
                    () => {
                      systemStore.resetSetting()
                      setTimeout(() => {
                        info('已恢复')
                      }, 160)
                    }
                  )
                }, 160)
              }}
            />
          </ItemSettingBlock>

          {/* 同步收藏的帖子 */}
          <ItemSetting
            show={shows.settingTopic}
            filter={filter}
            {...TEXTS.settingTopic}
          />
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
