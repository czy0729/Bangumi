/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:47:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-24 01:40:05
 */
import { observable, runInAction } from 'mobx'
import { date, getTimestamp } from '@utils'
import { syncSystemStore } from '@utils/async'
import { DEV } from '@constants'

export const logs = observable([])

/** 调试窗口打印 (手机实机开发用) */
export function devLog(...args: any) {
  if (!DEV && !syncSystemStore().state.dev) return

  setTimeout(() => {
    runInAction(() => {
      args
        .slice()
        .reverse()
        .forEach(data => {
          logs.unshift({
            date: date('H:i:s', getTimestamp()),
            data:
              typeof data === 'object' ? JSON.stringify(data, null, 4) : String(data)
          })
        })
    })
  }, 40)
}

/** 调试窗口打印 (批量) */
export function devLogs(...args: any) {
  devLog(args.join(', '))
}

let _limit = 0

/** 调试窗口打印 (限制打印) */
export function devLogLimit(...args: any) {
  _limit += 1
  if (_limit >= 8) return
  devLog(args.join(', '))
}
