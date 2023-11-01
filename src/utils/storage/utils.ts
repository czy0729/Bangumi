/*
 * @Author: czy0729
 * @Date: 2023-11-01 13:41:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 14:12:35
 */
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getItem = AsyncStorage.getItem

export const setItem = AsyncStorage.setItem

export const getAllKeys = AsyncStorage.getAllKeys

export const multiGet = AsyncStorage.multiGet

/** @todo */
export const removeItem = () => {}
