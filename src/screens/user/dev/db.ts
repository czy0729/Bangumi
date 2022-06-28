/*
 * @Author: czy0729
 * @Date: 2022-02-27 11:32:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-29 05:24:04
 */
import Constants from 'expo-constants'
import { xhrCustom as xhr } from '@utils/fetch'
import Base64 from '@utils/thirdParty/base64'

const oauthData = {
  grant_type: 'password',
  username: '8691935+a296377710@user.noreply.gitee.com',
  password: '123qweasdzxc',
  client_id: '8147145b834d171b9497012d3ae8a8732e974ad44f34b498648aef52a6155b5c',
  client_secret: '39b06b299ea03da64d4479e0f22277aba879934351b7ed6570c2ecb5658e06d4',
  scope: 'projects user_info'
}

const repoData = {
  owner: 'a296377710',
  repo: 'bangumi'
}

let accessToken = ''
let ua = ''
const files = {}

/**
 * 密码模式
 * https://gitee.com/api/v5/oauth_doc#/list-item-2
 */
export async function oauth() {
  if (!ua) {
    ua = await Constants.getWebViewUserAgentAsync()
  }

  const res = await xhr({
    method: 'POST',
    url: 'https://gitee.com/oauth/token',
    data: oauthData,
    headers: {
      'User-Agent': ua,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    showLog: false
  })

  console.info(res)
  const { access_token } = JSON.parse(res._response)
  accessToken = access_token
  console.info(`🗃  oauth ${access_token}`)
  return accessToken
}

/**
 * 获取仓库具体路径下的内容
 * https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoContents(Path)
 *
 * @param {*} path
 */
export async function read({ path }) {
  if (!files[path]) {
    if (!ua) {
      ua = await Constants.getWebViewUserAgentAsync()
    }

    const res = await xhr({
      method: 'GET',
      url: `https://gitee.com/api/v5/repos/${repoData.owner}/${repoData.repo}/contents/${path}`,
      headers: {
        'User-Agent': ua
      },
      showLog: false
    })
    const { sha, content } = JSON.parse(res._response)
    if (!sha) {
      return {}
    }

    files[path] = {
      sha,
      content: Base64.atob(content)
    }
    console.info(`🗃  read ${path}`)
  }

  return files[path]
}

/**
 * 新建文件
 * https://gitee.com/api/v5/swagger#/postV5ReposOwnerRepoContentsPath
 */
export async function add({ path, content, message }) {
  if (!ua) {
    ua = await Constants.getWebViewUserAgentAsync()
  }

  const res = await xhr({
    method: 'POST',
    url: `https://gitee.com/api/v5/repos/${repoData.owner}/${repoData.repo}/contents/${path}`,
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

  if (!data?.content?.sha) {
    return false
  }

  files[path] = {
    sha: data.content.sha,
    content
  }

  console.info(`🗃  add ${path}`)
  return files[path]
}

/**
 * 更新文件
 * https://gitee.com/api/v5/swagger#/putV5ReposOwnerRepoContentsPath
 *
 *  - 提示, content不允许携带中文, 请先escape或encode
 */
export async function update(args: {
  path: string
  content: string
  sha: string
  message?: string
}) {
  const { path, content, sha, message } = args || {}
  if (content === files[path].content) {
    return files[path]
  }

  if (!ua) {
    ua = await Constants.getWebViewUserAgentAsync()
  }

  const res = await xhr({
    method: 'PUT',
    url: `https://gitee.com/api/v5/repos/${repoData.owner}/${repoData.repo}/contents/${path}`,
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
  if (!data?.content?.sha) {
    return false
  }

  files[path] = {
    sha: data.content.sha,
    content
  }

  console.info(`🗃  update ${path}`)
  return files[path]
}

/**
 * 自动写入
 */
export async function put(args: { path: string; content: string; message?: string }) {
  const { path, content, message } = args || {}
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
    console.error('utils/db', 'put', error)
    return false
  }
}
