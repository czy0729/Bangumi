/*
 * @Author: czy0729
 * @Date: 2023-05-23 11:54:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-03 05:26:52
 */
import { LogBox } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function ignoreAllLogs() {
  LogBox.ignoreAllLogs(true)
}

/** 读取本地数据 */
export async function getStorage(key: string) {
  try {
    if (!key) return null

    const data = await AsyncStorage.getItem(key)
    return JSON.parse(data)
  } catch (error) {
    return null
  }
}

/** 保存数据到本地 */
export async function setStorage(key: string, data: any) {
  if (!key) return

  AsyncStorage.setItem(key, JSON.stringify(data))
}
