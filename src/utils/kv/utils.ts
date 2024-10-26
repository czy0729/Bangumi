/*
 * @Author: czy0729
 * @Date: 2023-12-14 12:12:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-14 12:23:13
 */
import { DEV } from '@src/config'

/** [DEV] */
export function log(method: string, ...others: any[]) {
  if (DEV) {
    console.info(`%c[@utils/kv/${method}]`, 'background: #000; color: #fff', ...others)
  }
}
