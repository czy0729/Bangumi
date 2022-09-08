/*
 * @Author: czy0729
 * @Date: 2022-03-24 21:42:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 19:05:34
 */
import { _, userStore, calendarStore, systemStore, rakuenStore } from '@stores'
import { arrGroup, getTimestamp, omit } from '../utils'
import { t, ua } from '../fetch'
import { setStorage, getStorage } from '../storage'
import useMount from './useMount'

const CACHE_KEY = 'utils|hooks|useGlobalMountV2'

export default function useGlobalMount() {
  useMount(() => {
    // 启动后的全局动作
    setTimeout(() => {
      calendarStore.fetchOnAir()
      ua()
      t('其他.启动', {
        userId: userStore?.userInfo?.username || userStore?.myUserId,
        device: _.isPad ? 'pad' : 'mobile'
      })
    }, 8000)

    setTimeout(async () => {
      try {
        const lastMs = (await getStorage(CACHE_KEY)) || 0
        const now = getTimestamp()
        if (now - lastMs >= 60 * 60 * 24) {
          const settings = omit(systemStore.setting, [
            'homeRenderTabs',
            'discoveryMenu'
          ])
          const keys = Object.keys(settings)
          keys.forEach(key => {
            if (settings[key] === true) {
              settings[key] = 1
            } else if (settings[key] === false) {
              settings[key] = 0
            }
          })
          arrGroup(keys, 10).forEach((arr, index) => {
            setTimeout(() => {
              const data = {}
              arr.forEach((key: string) => (data[key] = settings[key]))
              t('其他.设置', data)
            }, 1000 * index)
          })

          const rakuenSettings = omit(rakuenStore.setting, [
            'blockKeywords',
            'blockGroups',
            'blockUserIds'
          ])
          Object.keys(rakuenSettings).forEach(key => {
            if (rakuenSettings[key] === true) {
              rakuenSettings[key] = 1
            } else if (rakuenSettings[key] === false) {
              rakuenSettings[key] = 0
            }
          })
          t('其他.超展开设置', rakuenSettings)

          setStorage(CACHE_KEY, now)
        }
      } catch (error) {}
    }, 12000)
  })
}
