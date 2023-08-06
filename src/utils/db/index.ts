/*
 * gitee as DB
 * @Author: czy0729
 * @Date: 2020-12-25 01:12:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-24 15:39:12
 */
import Constants from 'expo-constants'
import { xhrCustom as xhr } from '../fetch'
import Base64 from '../thirdParty/base64'
import { log } from '../dev'
import { OAUTH_DATA, REPO_DATA } from './ds'

const FILE_CACHES = {}
let accessToken = ''
let ua = ''

/**
 * 密码模式
 * https://gitee.com/api/v5/oauth_doc#/list-item-2
 */
export async function oauth() {
  if (!ua) ua = (await Constants.getWebViewUserAgentAsync()) || ''

  const res = await xhr({
    method: 'POST',
    url: 'https://gitee.com/oauth/token',
    data: OAUTH_DATA,
    headers: {
      'User-Agent': ua,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    showLog: false
  })
  log(res)

  const { access_token } = JSON.parse(res._response)
  accessToken = access_token
  log(`🗃  oauth ${access_token}`)

  return accessToken
}

/**
 * 获取仓库具体路径下的内容
 * https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoContents(Path)
 *
 * @param {*} path
 */
export async function read({ path }) {
  if (!FILE_CACHES[path]) {
    if (!ua) ua = (await Constants.getWebViewUserAgentAsync()) || ''

    const res = await xhr({
      method: 'GET',
      url: `https://gitee.com/api/v5/repos/${REPO_DATA.owner}/${REPO_DATA.repo}/contents/${path}`,
      headers: {
        'User-Agent': ua
      },
      showLog: false
    })

    const { sha, content } = JSON.parse(res._response)
    if (!sha) return {}

    FILE_CACHES[path] = {
      sha,
      content: Base64.atob(content)
    }
    log(`🗃  read ${path}`)
  }

  return FILE_CACHES[path]
}

/**
 * 新建文件
 * https://gitee.com/api/v5/swagger#/postV5ReposOwnerRepoContentsPath
 */
export async function add({ path, content, message }) {
  if (!ua) ua = (await Constants.getWebViewUserAgentAsync()) || ''

  const res = await xhr({
    method: 'POST',
    url: `https://gitee.com/api/v5/repos/${REPO_DATA.owner}/${REPO_DATA.repo}/contents/${path}`,
    data: {
      access_token: accessToken,
      content: Base64.btoa(content),
      message: message || `add ${path}`
    },
    headers: {
      'User-Agent': ua,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    showLog: false
  })
  const data = JSON.parse(res._response)

  if (!data?.content?.sha) return false

  FILE_CACHES[path] = {
    sha: data.content.sha,
    content
  }

  log(`🗃  add ${path}`)
  return FILE_CACHES[path]
}

/**
 * 更新文件
 * https://gitee.com/api/v5/swagger#/putV5ReposOwnerRepoContentsPath
 *
 *  - 提示, content不允许携带中文, 请先escape或encode
 */
export async function update({ path, content, sha, message }) {
  if (content === FILE_CACHES[path].content) return FILE_CACHES[path]

  if (!ua) ua = (await Constants.getWebViewUserAgentAsync()) || ''

  const res = await xhr({
    method: 'PUT',
    url: `https://gitee.com/api/v5/repos/${REPO_DATA.owner}/${REPO_DATA.repo}/contents/${path}`,
    data: {
      access_token: accessToken,
      content: Base64.btoa(content),
      sha,
      message: message || `update ${path}`
    },
    headers: {
      'User-Agent': ua,
      'Content-type': 'application/x-www-form-urlencoded'
    },
    showLog: false
  })

  const data = JSON.parse(res._response)
  if (!data?.content?.sha) return false

  FILE_CACHES[path] = {
    sha: data.content.sha,
    content
  }

  log(`🗃  update ${path}`)
  return FILE_CACHES[path]
}

/** 自动写入 */
export async function put({
  path,
  content,
  message
}: {
  path: `${string}.json`
  content: string
  message?: string
}) {
  try {
    /**
     * 获取access_token
     */
    if (!accessToken) await oauth()

    /**
     * 检查path是否存在
     *  - 不存在使用新建
     *  - 若存在使用更新, 还需要获取文件sha
     */
    const { sha } = await read({ path })
    return sha
      ? update({ path, content, sha, message })
      : add({ path, content, message })
  } catch (error) {
    return false
  }
}
