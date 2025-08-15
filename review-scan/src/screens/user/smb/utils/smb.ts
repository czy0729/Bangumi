/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:22:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 00:02:50
 */
import { SMBListItem } from '../types'

export function smbList(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config: {
    ip?: any
    port?: any
    sharedFolder?: any
    workGroup?: any
    username?: any
    password?: any
    path?: string
  } = {}
  // @ts-ignore
): Promise<SMBListItem[]> {}
