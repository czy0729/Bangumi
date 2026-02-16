/*
 * @Author: czy0729
 * @Date: 2022-06-14 13:12:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-14 13:25:33
 */
export type Props = {
  styles?: any

  /** id 和 uuid 二选一 */
  smb: {
    /** 预设方案 id */
    id?: string

    /** 用户自定义方案唯一 id */
    uuid?: string
    name: string
    ip: string
    username: string
    password: string
    sharedFolder: string
    path: string
    port: string
    workGroup: string
    url: string
  }
  folder: {
    name: string
    lastModified: string
    path: string
    list: {
      name: string
      type: string
      lastModified: string
    }[]
    ids: string[]
    tags: string[]
  }
}
