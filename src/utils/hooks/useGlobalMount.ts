/*
 * @Author: czy0729
 * @Date: 2022-03-24 21:42:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 08:12:37
 */
import { _, userStore, calendarStore } from '@stores'
import { t, ua } from '../fetch'
import useMount from './useMount'

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
  })
}
