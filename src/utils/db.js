/*
 * gitee as DB
 *
 * @Author: czy0729
 * @Date: 2020-12-25 01:12:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-25 18:15:05
 */
import { xhrCustom as xhr } from './fetch'
import Base64 from './thirdParty/base64'

const oauthData = {
  grant_type: 'password',
  username: '402731062@qq.com',
  client_id: 'b44b7a05afb86b3885a620fd42aa759181476cbf63240da31ac5c255cfb2c84a',
  scope: 'projects user_info'
}
const repoData = {
  owner: 'a402731062',
  repo: 'bangumi-micro'
}

let accessToken = ''
const files = {}

/**
 * 密码模式
 * https://gitee.com/api/v5/oauth_doc#/list-item-2
 */
export async function oauth() {
  const res = await xhr({
    method: 'POST',
    url: 'https://gitee.com/oauth/token',
    data: oauthData
  })
  const { access_token } = JSON.parse(res._response)
  accessToken = access_token

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
    const res = await xhr({
      method: 'GET',
      url: `https://gitee.com/api/v5/repos/${repoData.owner}/${repoData.repo}/contents/${path}`
    })
    const { sha, content } = JSON.parse(res._response)
    if (!sha) {
      return {}
    }

    files[path] = {
      sha,
      content
    }
  }

  return files[path]
}

/**
 * 新建文件
 * https://gitee.com/api/v5/swagger#/postV5ReposOwnerRepoContentsPath
 */
export async function add({ path, content, message }) {
  const res = await xhr({
    method: 'POST',
    url: `https://gitee.com/api/v5/repos/${repoData.owner}/${repoData.repo}/contents/${path}`,
    data: {
      access_token: accessToken,
      content: Base64.btoa(content),
      message: message || `add ${path}`
    }
  })
  const data = JSON.parse(res._response)
  console.log(data)
}

/**
 * 更新文件
 * https://gitee.com/api/v5/swagger#/putV5ReposOwnerRepoContentsPath
 */
export async function update({ path, content, sha, message }) {
  const res = await xhr({
    method: 'PUT',
    url: `https://gitee.com/api/v5/repos/${repoData.owner}/${repoData.repo}/contents/${path}`,
    data: {
      access_token: accessToken,
      content: Base64.btoa(content),
      sha,
      message: message || `update ${path}`
    }
  })
  const data = JSON.parse(res._response)
  console.log(data)
}

/**
 *
 */
export async function put({ path, content, message }) {
  /**
   * 获取access_token
   */
  if (!accessToken) {
    await oauth()
  }

  /**
   * 检查path是否存在
   *  - 不存在使用新建
   *  - 若存在使用更新, 还需要获取文件sha
   */
  const { sha } = await read({ path })
  return sha
    ? update({ path, content, sha, message })
    : add({ path, content, message })
}
