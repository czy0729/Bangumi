/*
 * @Author: czy0729
 * @Date: 2022-05-23 22:43:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-23 22:44:17
 */
import { getSystemStoreAsync } from '@utils/async'

export const t = (s?: string, t?: string): string =>
  getSystemStoreAsync().setting.s2t ? t : s
