/*
 * @Author: czy0729
 * @Date: 2026-01-20 08:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-29 07:28:06
 */
export type Config = {
  method: 'get' | 'post'
  url: string
  headers: {
    Authorization?: string
    'User-Agent'?: string
    'Content-Type'?: 'application/x-www-form-urlencoded'
  }
  data?: string
}

export type ResponseUsersTimelineP1 = {
  createdAt: number
}[]
