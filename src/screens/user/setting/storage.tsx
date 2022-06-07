/*
 * @Author: czy0729
 * @Date: 2022-06-07 07:48:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-07 08:12:46
 */
import React, { useState, useCallback } from 'react'
import AsyncStorage from '@components/@/react-native-async-storage'
import { ActionSheet, Text, Heatmap } from '@components'
import { clearCache } from '@components/image/image'
import { ItemSetting } from '@_'
import Stores from '@stores'
import { toFixed } from '@utils'
import { t } from '@utils/fetch'
import { useBoolean, useObserver, useMount } from '@utils/hooks'
import { confirm, info } from '@utils/ui'
import i18n from '@constants/i18n'

function Storage() {
  const { state, setTrue, setFalse } = useBoolean(false)
  const [storageSize, setStorageSize] = useState('')

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
      console.error('Setting', 'caculateStorageSize', error)
    }
  }, [])

  const clearStorage = useCallback(() => {
    confirm(`清除所有数据${i18n.cache()}，确定?`, async () => {
      t('设置.清除缓存', {
        type: 'storage'
      })

      await Stores.clearStorage()

      setTimeout(() => {
        info('已清除数据缓存')
        caculateStorageSize()
      }, 2400)
    })
  }, [caculateStorageSize])

  const clearImages = useCallback(() => {
    confirm('清除所有图片缓存，确定?', () => {
      t('设置.清除缓存', {
        type: 'images'
      })

      setTimeout(() => {
        clearCache()
        info('已清除图片缓存')
      }, 0)
    })
  }, [])

  const clearAll = useCallback(() => {
    confirm(
      `清除所有包括页面接口的数据${i18n.cache()} (若需清除图片${i18n.cache()}，请到系统里面清除应用数据)，确定?`,
      async () => {
        t('设置.清除缓存', {
          type: 'all'
        })

        await Stores.clearStorage()
        clearCache()

        setTimeout(() => {
          info('已清除')
          caculateStorageSize()
        }, 2400)
      }
    )
  }, [caculateStorageSize])

  useMount(() => {
    caculateStorageSize()
  })

  return useObserver(() => {
    return (
      <>
        <ItemSetting hd='缓存' arrow highlight onPress={setTrue} />
        <ActionSheet show={state} onClose={setFalse}>
          {/* 清除数据缓存 */}
          <ItemSetting
            hd={`清除数据${i18n.cache()}`}
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

          {/* 清除图片缓存 */}
          <ItemSetting
            hd={`清除图片${i18n.cache()}`}
            arrow
            highlight
            onPress={clearImages}
          >
            <Heatmap id='设置.清除缓存' />
          </ItemSetting>

          {/* 清除缓存 */}
          <ItemSetting
            hd={`清除全部${i18n.cache()}`}
            information='包括数据缓存和图片缓存'
            arrow
            highlight
            onPress={clearAll}
          >
            <Heatmap id='设置.清除缓存' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Storage
