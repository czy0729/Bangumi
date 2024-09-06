/*
 * @Author: czy0729
 * @Date: 2022-06-07 07:48:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 13:36:26
 */
import React, { useCallback, useState } from 'react'
import { ActionSheet, Heatmap, Text } from '@components'
import { clearCache } from '@components/image/image'
import { ItemSetting } from '@_'
import Stores from '@stores'
import { confirm, info, toFixed } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useBoolean, useMount, useObserver } from '@utils/hooks'
import { getAllKeys, multiGet } from '@utils/storage/utils'
import { WEB } from '@constants'
import i18n from '@constants/i18n'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

/** 缓存 */
function Storage({ filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const [storageSize, setStorageSize] = useState('')

  const caculateStorageSize = useCallback(async () => {
    if (WEB) return

    try {
      const keys = await getAllKeys()
      const storages = await multiGet(keys)

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

  const shows = getShows(filter, TEXTS)
  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting hd='缓存' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='缓存' onClose={setFalse}>
          {/* 清除数据缓存 */}
          <ItemSetting
            show={shows.clearStorage}
            ft={
              <Text type='sub' size={15}>
                {storageSize}
              </Text>
            }
            arrow
            highlight
            filter={filter}
            onPress={clearStorage}
            {...TEXTS.clearStorage}
            hd={`清除数据${i18n.cache()}`}
          >
            <Heatmap id='设置.清除缓存' />
          </ItemSetting>

          {/* 清除图片缓存 */}
          <ItemSetting
            show={shows.clearImages}
            arrow
            highlight
            filter={filter}
            onPress={clearImages}
            {...TEXTS.clearImages}
            hd={`清除图片${i18n.cache()}`}
          >
            <Heatmap id='设置.清除缓存' />
          </ItemSetting>

          {/* 清除缓存 */}
          <ItemSetting
            show={shows.clearAll}
            arrow
            highlight
            filter={filter}
            onPress={clearAll}
            {...TEXTS.clearAll}
            hd={`清除全部${i18n.cache()}`}
          >
            <Heatmap id='设置.清除缓存' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Storage
