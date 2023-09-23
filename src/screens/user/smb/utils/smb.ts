/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:22:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 10:26:44
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
