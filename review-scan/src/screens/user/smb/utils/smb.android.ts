/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:22:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 00:03:01
 */
import SMBClient from 'react-native-smb'
import { alert, asc, desc, info, loading } from '@utils'
import { queue } from '@utils/fetch'
import { SubjectId } from '@types'
import { SMBListItem, SMBRawItem } from '../types'
import { getFileMediaType, matchTags } from './utils'

let smbClient: {
  list: (arg0: string, arg1: { (data: any): Promise<void>; (data: any): void }) => void
  disconnect: (arg0: { (): void; (): void }) => void
}

/** 使用 smb 服务获取文件夹信息 */
export function smbList(
  config: {
    ip?: any
    port?: any
    sharedFolder?: any
    workGroup?: any
    username?: any
    password?: any
    path?: string
  } = {}
): Promise<SMBListItem[]> {
  return new Promise(resolve => {
    smbDisconnect()

    // SMBClient
    smbClient = new SMBClient(
      config.ip,
      config.port,
      config.sharedFolder,
      config.workGroup,
      config.username,
      config.password,
      (data: { success: any; errorCode: any; message: any }) => {
        console.info('Create', data)

        if (!data?.success) {
          smbClient = null
          alert(`[${data.errorCode}] ${data.message}`, '连接失败')
        }
      }
    )
    info('连接 smb...')

    setTimeout(async () => {
      const data = []
      const _path = config.path.split(',')
      for (let i = 0; i < _path.length; i += 1) {
        const list = await _smbList(_path[i])
        if (list) data.push(...list)
      }

      resolve(data)
      smbDisconnect()
    }, 1000)
  })
}

function _smbList(path = ''): Promise<SMBListItem[] | false> {
  return new Promise(resolve => {
    if (typeof smbClient?.list !== 'function') {
      smbDisconnect()
      resolve(false)
      return
    }

    smbClient.list(
      path,
      async (data: { success: any; errorCode: any; message: any; list: SMBRawItem[] }) => {
        if (!data?.success) {
          smbClient.disconnect(() => console.info('Disconnect'))
          smbClient = null

          alert(`[${data.errorCode}] ${data.message}`, '连接失败')
          resolve(false)
          return
        }

        const list: SMBListItem[] = data.list
          .filter(
            item => !item.hidden && item.isDirectory && item.name !== '.' && item.name !== '..'
          )
          .map(item => ({
            name: item.name,
            lastModified: item.lastModified,
            path,

            // lazy
            list: [],
            ids: [],
            tags: []
          }))

        const hide = loading('扫描文件夹中...')
        await queue(
          list.map(
            item => () =>
              new Promise<void>(rsl => {
                try {
                  smbClient.list(
                    path ? `${path}/${item.name}` : item.name,
                    // @ts-expect-error
                    (data: { success: any; list: SMBRawItem[] }) => {
                      if (data?.success) {
                        // list
                        item.list = data.list
                          .filter(
                            item =>
                              !item.hidden &&
                              item.name !== '.' &&
                              item.name !== '..' &&
                              !item.name.includes('DS_Store')
                          )
                          .map(item => ({
                            name: item.name,
                            type: item.isDirectory ? 'folder' : getFileMediaType(item.name),
                            lastModified: item.lastModified
                          }))
                          .sort((a, b) => asc(a.name, b.name))

                        // subjects
                        let ids: SubjectId[] = []
                        if (typeof item.name === 'string') {
                          const temp = item.name.toLocaleLowerCase().match(/bangumi-\d+/g)
                          if (temp) {
                            temp.forEach(item => {
                              const id = Number(item.replace('bangumi-', ''))
                              if (id && !ids.includes(id)) ids.push(id)
                            })
                          }
                        }

                        if (!ids.length) {
                          ids = data.list
                            .filter(item =>
                              /^\d+\.bgm(\.txt)?$/.test(item.name.toLocaleLowerCase())
                            )
                            .sort((a, b) => desc(a.name, b.name))
                            .map(item =>
                              Number(item.name.toLocaleLowerCase().replace(/(\.bgm)|(\.txt)/g, ''))
                            )
                        }

                        item.ids = ids

                        // tags
                        item.tags = matchTags(`${item.name} ${list[0]?.name || ''}`)
                      }
                      rsl()
                    }
                  )
                } catch (error) {
                  rsl()
                }
              })
          )
        )
        hide()

        resolve(list)
      }
    )
  })
}

function smbDisconnect() {
  if (smbClient) {
    try {
      smbClient.disconnect(() => console.info('Disconnect'))
    } catch (error) {}
    smbClient = null
  }
}
