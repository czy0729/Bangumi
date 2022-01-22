/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:42:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-22 22:08:18
 */
import React, { useState, useCallback } from 'react'
import AsyncStorage from '@components/@/react-native-async-storage'
import { ActionSheet, Text, Heatmap } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import Stores, { _, userStore, systemStore, rakuenStore } from '@stores'
import { toFixed } from '@utils'
import { useObserver, useMount, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import { confirm, info, loading, feedback } from '@utils/ui'
import { read } from '@utils/db'

function System({ navigation }) {
  const [storageSize, setStorageSize] = useState('')
  const [settingLen, setSettingLen] = useState(0)
  const { state, setTrue, setFalse } = useBoolean(false)

  const caculateStorageSize = useCallback(async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const storages = await AsyncStorage.multiGet(keys)

      let storageSize = 0
      storages.forEach(item => {
        storageSize += item[0].length + item[1].length
      })
      setStorageSize(`${toFixed(storageSize / 1000 / 1000, 1)} mb`)
    } catch (error) {
      warn('Setting', 'caculateStorageSize', error)
    }
  }, [])
  const clearStorage = useCallback(() => {
    t('设置.清除缓存')

    Stores.clearStorage()
    setTimeout(() => {
      caculateStorageSize()
    }, 2400)
  }, [caculateStorageSize])

  useMount(() => {
    caculateStorageSize()

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

  return useObserver(() => {
    return (
      <>
        {/* 清除缓存 */}
        <ItemSetting
          hd='清除缓存'
          information='推荐大于 10mb 或遇到数据不刷新等情况进行清除'
          ft={
            <Text type='sub' size={15}>
              {storageSize}
            </Text>
          }
          arrow
          highlight
          onPress={clearStorage}
        >
          <Heatmap id='设置.清除缓存' />
        </ItemSetting>

        {/* 同步设置 */}
        <ItemSetting hd='同步设置' arrow highlight onPress={setTrue} />
        <ActionSheet show={state} onClose={setFalse}>
          {/* 同步设置 */}
          <ItemSettingBlock
            style={_.mt.sm}
            title='同步设置'
            information='同步设置和超展开设置'
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
                  : (!userStore.isLogin || !userStore.userInfo.id) && '需登录'
              }
              onPress={() => {
                t('设置.恢复默认设置', {
                  label: '下载'
                })

                if (!userStore.isLogin || !userStore.userInfo.id) {
                  return info('下载需先登录')
                }

                setTimeout(() => {
                  confirm('确定恢复到云端的设置?', async () => {
                    let hide = loading('下载设置(1/2)...')
                    const flag = await systemStore.downloadSetting()
                    hide()

                    hide = loading('超展开设置(2/2)...')
                    await rakuenStore.downloadSetting()
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
              information={(!userStore.isLogin || !userStore.userInfo.id) && '需登录'}
              onPress={() => {
                t('设置.恢复默认设置', {
                  label: '上传'
                })

                if (!userStore.isLogin || !userStore.userInfo.id) {
                  return info('上传需先登录')
                }

                setTimeout(() => {
                  confirm('确定上传当前设置到云端?', async () => {
                    let hide = loading('上传设置(1/2)...')
                    const flag = await systemStore.uploadSetting()
                    hide()

                    hide = loading('超展开设置(2/2)...')
                    await rakuenStore.uploadSetting()
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
              title='恢复默认'
              onPress={() => {
                t('设置.恢复默认设置', {
                  label: '恢复默认'
                })

                setTimeout(() => {
                  confirm('确定恢复默认设置?', () => {
                    systemStore.resetSetting()
                    setTimeout(() => {
                      info('已恢复')
                    }, 160)
                  })
                }, 160)
              }}
            />
          </ItemSettingBlock>

          {/* 同步收藏的帖子 */}
          <ItemSetting hd='同步收藏的帖子' information='规划中暂不可用' />
        </ActionSheet>

        {/* 网络探针 */}
        <ItemSetting
          hd='网络探针'
          arrow
          highlight
          onPress={() => {
            t('设置.跳转', {
              title: '网络探针',
              to: 'ServerStatus'
            })
            navigation.push('ServerStatus')
          }}
        >
          <Heatmap id='设置.跳转' to='ServerStatus' alias='网络探针' />
        </ItemSetting>
      </>
    )
  })
}

export default System
