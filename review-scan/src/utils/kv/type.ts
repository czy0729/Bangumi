/*
 * @Author: czy0729
 * @Date: 2022-11-27 07:41:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-05 05:21:30
 */
export type Result<T = any> = Record<any, any> & {
  code: number
  data: T
  ts?: number
  message?: string
}

export type ResultTemp = {
  data: {
    downloadKey: string
  }
}

export type ResultCollectList = Result<
  {
    id: string
    createTime: string
  }[]
>
