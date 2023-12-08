/*
 * @Author: czy0729
 * @Date: 2023-12-09 00:44:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-09 01:48:33
 */
import { BangumiData } from '@types'

export type Decode = <T extends 'bangumi-data'>(name: T) => Promise<any>

export type Get = <T extends 'bangumi-data'>(
  name: T
) => T extends 'bangumi-data' ? BangumiData : null
