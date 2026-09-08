/*
 * @Author: czy0729
 * @Date: 2026-09-08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08
 *
 * 隐私条款弹窗（拆分自 app.ts）
 */
import { Alert, BackHandler } from 'react-native'
import { URL_PRIVACY } from '@constants/host'
import { syncS2T } from '../async'
import { getStorage, setStorage } from '../storage'
import { open } from '../utils'
import { PRIVACY_STATE } from './ds'

/** 隐私条款弹窗 */
export async function privacy() {
  const value = await getStorage(PRIVACY_STATE)
  if (value) return

  const params = [
    {
      text: syncS2T('隐私保护政策'),
      onPress: () => {
        open(URL_PRIVACY)

        setTimeout(() => {
          privacy()
        }, 4000)
      }
    },
    {
      text: syncS2T('不同意并退出'),
      onPress: () => {
        BackHandler.exitApp()

        setTimeout(() => {
          privacy()
        }, 4000)
      }
    },
    {
      text: syncS2T('同意'),
      onPress: () => {
        setStorage(PRIVACY_STATE, 1)
      }
    }
  ]

  return Alert.alert(
    syncS2T('隐私保护政策'),
    syncS2T(`请你务必审慎阅读、充分理解“隐私保护政策”各条款。
    \n如你同意，请点击“同意”开始使用服务。如你不同意，很遗憾本应用无法为你提供服务。`),
    params
  )
}
