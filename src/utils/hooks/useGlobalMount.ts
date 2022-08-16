/*
 * @Author: czy0729
 * @Date: 2022-03-24 21:42:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 19:05:34
 */
import { _, userStore, calendarStore, systemStore, rakuenStore } from '@stores'
import { getTimestamp, omit } from '../utils'
import { t, ua } from '../fetch'
import { setStorage, getStorage } from '../storage'
import useMount from './useMount'

const CACHE_KEY = 'utils|hooks|useGlobalMount'

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
        if (now - lastMs >= 24 * 60 * 60) {
          t('其他.设置', {
            ...omit(systemStore.setting, ['homeRenderTabs', 'discoveryMenu']),
            ...omit(rakuenStore.setting, [
              'blockKeywords',
              'blockGroups',
              'blockUserIds'
            ])
          })
          setStorage(CACHE_KEY, now)
        }
      } catch (error) {}
    }, 20000)
  })
}
