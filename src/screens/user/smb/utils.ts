/*
 *
 * @Author: czy0729
 * @Date: 2022-03-28 19:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-22 03:14:34
 */
import SMBClient from 'react-native-smb'
import { createClient, WebDAVClient, AuthType } from 'webdav'
import { asc, desc, alert, info, loading } from '@utils'
import { queue } from '@utils/fetch'
import { SubjectId } from '@types'
import { DICT, DICT_ORDER } from './ds'
import { SMBRawItem, SMBListItem, WebDAVRawItem } from './types'

let smbClient: {
  list: (arg0: string, arg1: { (data: any): Promise<void>; (data: any): void }) => void
  disconnect: (arg0: { (): void; (): void }) => void
}

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
      async (data: {
        success: any
        errorCode: any
        message: any
        list: SMBRawItem[]
      }) => {
        if (!data?.success) {
          smbClient.disconnect(() => console.info('Disconnect'))
          smbClient = null

          alert(`[${data.errorCode}] ${data.message}`, '连接失败')
          resolve(false)
          return
        }

        const list: SMBListItem[] = data.list
          .filter(
            item =>
              !item.hidden &&
              item.isDirectory &&
              item.name !== '.' &&
              item.name !== '..'
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

        const hide = loading('扫描目录中...')
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
                            type: item.isDirectory
                              ? 'folder'
                              : getFileMediaType(item.name),
                            lastModified: item.lastModified
                          }))
                          .sort((a, b) => asc(a.name, b.name))

                        // subjects
                        let ids: SubjectId[] = []
                        if (typeof item.name === 'string') {
                          const temp = item.name
                            .toLocaleLowerCase()
                            .match(/bangumi-\d+/g)
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
                              Number(
                                item.name
                                  .toLocaleLowerCase()
                                  .replace(/(\.bgm)|(\.txt)/g, '')
                              )
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

export function matchTags(name: string): string[] {
  const tags = []
  if (!name) return tags

  DICT.forEach(item => {
    if (item.reg.test(name)) tags.push(item.val)
  })

  return tags.sort((a, b) => desc(DICT_ORDER[a] || 0, DICT_ORDER[b] || 0))
}

export function getFileMediaType(filename: any) {
  const _filename = String(filename).toLocaleLowerCase()
  if (/\.(mp4|m4v|mkv|avi|rmvb|mov|flv)$/.test(_filename)) return 'video'
  if (/\.(mp3|m4a|aac|flac|ape|wav)$/.test(_filename)) return 'music'
  if (/\.(jpg|jpeg|png|gif|bmp|webp)$/.test(_filename)) return 'pic'
  if (/\.(zip|rar|7z)$/.test(_filename)) return 'zip'
  if (/((\.bgm)|(\.bgm\.txt))$/.test(_filename)) return 'origin'
  return 'file'
}

let webDAVClient: WebDAVClient

/**
 * 新增了 webDAV 模式
 * 直接把原始数据转换为 SMB 模式的数据, 走相同的逻辑
 * */
export function webDAVList(
  config: {
    ip?: any
    port?: any
    sharedFolder?: any
    username?: any
    password?: any
    path?: any
  } = {}
): Promise<SMBListItem[]> {
  return new Promise(async resolve => {
    webDAVClient = null

    let host = `http://${config.ip}`
    if (config.port) host += `:${config.port}`
    const url = [host, config.sharedFolder].filter(item => !!item).join('/')

    webDAVClient = createClient(url, {
      authType: AuthType.Password,
      username: config.username,
      password: config.password
    })
    info('连接 webDAV...')

    setTimeout(async () => {
      const data = []
      const _path = config.path.split(',')
      for (let i = 0; i < _path.length; i += 1) {
        const list = await _webDAVList(_path[i])
        if (list) data.push(...list)
      }

      resolve(data)
      webDAVClient = null
    }, 1000)
  })
}

function _webDAVList(path = ''): Promise<SMBListItem[] | false> {
  return new Promise(async resolve => {
    if (!webDAVClient) {
      resolve(false)
      return
    }

    try {
      const items = (await webDAVClient.getDirectoryContents(
        `/${path}`
      )) as WebDAVRawItem[]
      if (!items?.length) {
        webDAVClient = null

        alert('读取目录失败')
        resolve(false)
        return
      }

      const list: SMBListItem[] = items
        .map(item => webDAVToSMB(item))
        .filter(
          item =>
            !item.hidden && item.isDirectory && item.name !== '.' && item.name !== '..'
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

      const hide = loading('扫描目录中...')
      await queue(
        list.map(
          item => () =>
            new Promise<void>(async rsl => {
              try {
                const items = (await webDAVClient.getDirectoryContents(
                  `/${path}${path ? '/' : ''}${item.name}`
                )) as WebDAVRawItem[]

                const list = items.map(item => webDAVToSMB(item))
                item.list = list
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
                  ids = list
                    .filter(item =>
                      /^\d+\.bgm(\.txt)?$/.test(item.name.toLocaleLowerCase())
                    )
                    .sort((a, b) => desc(a.name, b.name))
                    .map(item =>
                      Number(
                        item.name.toLocaleLowerCase().replace(/(\.bgm)|(\.txt)/g, '')
                      )
                    )
                }

                item.ids = ids

                // tags
                item.tags = matchTags(`${item.name} ${list[0]?.name || ''}`)

                rsl()
              } catch (error) {
                rsl()
              }
            })
        )
      )
      hide()

      resolve(list)
    } catch (err) {
      console.log(err)
    }
  })
}

function webDAVToSMB(item: WebDAVRawItem): SMBRawItem {
  const isDirectory = item.type === 'directory'
  return {
    size: isDirectory ? '0' : String(item.size),
    hidden: false,
    readOnly: false,
    createTime: '',
    shortName: '',
    isDirectory,
    lastModified: item.lastmod,
    name: item.basename
  }
}
