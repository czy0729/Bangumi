/*
 * @Author: czy0729
 * @Date: 2023-11-01 13:41:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 13:20:08
 */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FROZEN_FN } from '@constants/init'

export const getItem = AsyncStorage.getItem

export const setItem = AsyncStorage.setItem

export const getAllKeys = AsyncStorage.getAllKeys

export const multiGet = AsyncStorage.multiGet

/** @todo */
export const removeItem = FROZEN_FN
