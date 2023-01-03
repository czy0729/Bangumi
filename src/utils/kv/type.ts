/*
 * @Author: czy0729
 * @Date: 2022-11-27 07:41:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-03 19:43:59
 */
export type Result = Record<any, any> & {
  code: number
  data: any
  ts?: number
  message?: string
}

export type ResultTemp = {
  data: {
    downloadKey: string
  }
}
