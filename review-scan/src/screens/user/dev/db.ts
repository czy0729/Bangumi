/*
 * @Author: czy0729
 * @Date: 2022-02-27 11:32:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 04:04:43
 */
import Constants from 'expo-constants'
import Crypto from '@utils/crypto'
import { xhrCustom as xhr } from '@utils/fetch'
import Base64 from '@utils/thirdParty/base64'
import { GITHUB_HOST } from '@constants'

const oauthData = Crypto.get<object>(
  // eslint-disable-next-line max-len
  'U2FsdGVkX19fLWKIpcMloDjdAz++NCIuNnc4GAf/tZF9WpcAWWGZaXujErTngZ1aYg487rZ6AAR+ve0ayzlTvw5nl1m4VNVazEzJNFuJCEVYNYCl7UY93qrYaJft7uwzLOAiJyCdFSzgnmJQLKKQ8QZZf2iLaBrwqnginL/lpVY6puBnmBQyKPKT/e+LtNKjjxItXQXbK7eEpcilLK/vmVdWKTUfbaJARriu3zpIw2ARh5C61hZKcerUwzmpaBagv77hPhR0E9JaHP2lVDiE5JcvQ5eDoLGtsDVenRSuS88v1CDjPE3XEM0hm05oUa0AQB0FBKgUayOszrf8NjSSAjJESpSFiikapkYUhz6lYWoYOrx6ZCdgn2U2auwSBp8sJqYY+VeHRSfESxrd9cAgAQJcxMdmbW53OBUn2+Oz1h4='
)

const [, , , owner, repo] = GITHUB_HOST.split('/')
const repoData = {
  owner,
  repo
}

let accessToken = ''
let ua = ''
const files = {}

/**
 * 密码模式
 * https://gitee.com/api/v5/oauth_doc#/list-item-2
 */
export async function oauth() {
  if (!ua) ua = await Constants.getWebViewUserAgentAsync()

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
    if (!ua) ua = await Constants.getWebViewUserAgentAsync()

    const res = await xhr({
      method: 'GET',
      url: `https://gitee.com/api/v5/repos/${repoData.owner}/${repoData.repo}/contents/${path}`,
      headers: {
        'User-Agent': ua
      },
      showLog: false
    })
    const { sha, content } = JSON.parse(res._response)
    if (!sha) return {}

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
  if (!ua) ua = await Constants.getWebViewUserAgentAsync()

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

  if (!data?.content?.sha) return false

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
  if (content === files[path].content) return files[path]

  if (!ua) ua = await Constants.getWebViewUserAgentAsync()

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
  if (!data?.content?.sha) return false

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
