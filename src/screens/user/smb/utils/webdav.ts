/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:28:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 00:02:54
 */
import { AuthType, createClient, WebDAVClient } from 'webdav'
import { alert, asc, desc, info, loading } from '@utils'
import { queue } from '@utils/fetch'
import { SubjectId } from '@types'
import { SMBListItem, SMBRawItem, WebDAVRawItem } from '../types'
import { getFileMediaType, matchTags } from './utils'

let webDAVClient: WebDAVClient

/**
 * 使用 webDAV 服务获取文件夹信息
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

    let host = String(config.ip)
    if (host.indexOf('http') !== 0) host = `http://${host}`

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
      const items = (await webDAVClient.getDirectoryContents(`/${path}`)) as WebDAVRawItem[]
      if (!items?.length) {
        webDAVClient = null

        alert('读取文件夹失败')
        resolve(false)
        return
      }

      const list: SMBListItem[] = items
        .map(item => webDAVToSMB(item))
        .filter(item => !item.hidden && item.isDirectory && item.name !== '.' && item.name !== '..')
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
                    .filter(item => /^\d+\.bgm(\.txt)?$/.test(item.name.toLocaleLowerCase()))
                    .sort((a, b) => desc(a.name, b.name))
                    .map(item =>
                      Number(item.name.toLocaleLowerCase().replace(/(\.bgm)|(\.txt)/g, ''))
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
