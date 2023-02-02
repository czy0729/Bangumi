/*
 *
 * @Author: czy0729
 * @Date: 2022-03-28 19:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-02 13:18:58
 */
import SMBClient from 'react-native-smb'
import { asc, desc, alert, info, loading } from '@utils'
import { queue } from '@utils/fetch'
import { DICT, DICT_ORDER } from './ds'

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
): Promise<any[]> {
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
      data => {
        console.log('Create', data)

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
        const list: any = await _smbList(_path[i])
        if (list) data.push(...list)
      }

      resolve(data)
      smbDisconnect()
    }, 1000)
  })
}

function _smbList(path = '') {
  return new Promise(resolve => {
    if (typeof smbClient?.list !== 'function') {
      smbDisconnect()
      resolve(false)
      return
    }

    smbClient.list(path, async data => {
      if (!data?.success) {
        smbClient.disconnect(() => console.log('Disconnect'))
        smbClient = null

        alert(`[${data.errorCode}] ${data.message}`, '连接失败')
        resolve(false)
        return
      }

      const list = data.list
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
        list.map(item => {
          return () => {
            return new Promise<void>(rsl => {
              try {
                smbClient.list(
                  path ? `${path}/${item.name}` : item.name,
                  // @ts-expect-error
                  data => {
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
                      item.ids = data.list
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
          }
        })
      )
      hide()

      resolve(list)
    })
  })
}

function smbDisconnect() {
  if (smbClient) {
    try {
      smbClient.disconnect(() => console.log('Disconnect'))
    } catch (error) {}
    smbClient = null
  }
}

export function matchTags(name: string) {
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
