/*
 * @Author: czy0729
 * @Date: 2026-09-02 19:43:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-02 19:43:20
 *
 * 与真实 webdav 库 (node_modules 内) 的活体差分
 * - 本地 HTTP 服务器返回固定 multistatus, 双方各请求一次, 深比较输出
 * - 库随 yarn install 移除后自动跳过 (冻结用例在 index.test.ts 仍持续生效)
 */
import http from 'http'

import type { Server } from 'http'

jest.setTimeout(10000)

// vendored axios 0.19 为 RN XHR 适配器, node 环境无 XMLHttpRequest;
// 差分关注解析与请求语义, 传输层用 node fetch 替代 (webdav 模块实际经 '../index' 取包装实例)
jest.mock('../../index', () => ({
  __esModule: true,
  axios: async (config: any) => {
    const response = await fetch(config.url, {
      method: config.method,
      headers: config.headers
    })
    return { status: response.status, data: await response.text() }
  }
}))

let lib: any = null
try {
  lib = require('webdav')
} catch (e) {
  /* 依赖已移除, 差分跳过 */
}

const XML = `<?xml version="1.0" encoding="utf-8"?>
<D:multistatus xmlns:D="DAV:">
  <D:response>
    <D:href>/dav/anime/</D:href>
    <D:propstat>
      <D:prop><D:resourcetype><D:collection/></D:resourcetype><D:getlastmodified>Mon, 31 Aug 2026 08:00:00 GMT</D:getlastmodified></D:prop>
      <D:status>HTTP/1.1 200 OK</D:status>
    </D:propstat>
  </D:response>
  <D:response>
    <D:href>/dav/anime/season%201/</D:href>
    <D:propstat>
      <D:prop><D:resourcetype><D:collection/></D:resourcetype><D:getlastmodified>Mon, 31 Aug 2026 08:01:00 GMT</D:getlastmodified></D:prop>
      <D:status>HTTP/1.1 200 OK</D:status>
    </D:propstat>
  </D:response>
  <D:response>
    <D:href>/dav/anime/%E6%B8%8B%E8%B0%B7%2001.mkv</D:href>
    <D:propstat>
      <D:prop><D:getcontentlength>1024</D:getcontentlength><D:getlastmodified>Mon, 31 Aug 2026 08:02:00 GMT</D:getlastmodified><D:getetag>"abc-123"</D:getetag><D:getcontenttype>video/mp4; charset=utf-8</D:getcontenttype></D:prop>
      <D:status>HTTP/1.1 200 OK</D:status>
    </D:propstat>
  </D:response>
  <D:response>
    <D:href>/dav/anime/A%26B%20.op</D:href>
    <D:propstat>
      <D:prop><D:getcontentlength>2048</D:getcontentlength><D:getlastmodified>Mon, 31 Aug 2026 08:03:00 GMT</D:getlastmodified></D:prop>
      <D:status>HTTP/1.1 200 OK</D:status>
    </D:propstat>
  </D:response>
</D:multistatus>`

/** 差分扫描过的附加路径 (真机/库行为核验用) */
const PATHS = ['/', '/anime', '/anime/season 1']

;(lib ? describe : describe.skip)('webdav 差分 (自研 vs webdav@4.11.3)', () => {
  let server: Server
  let port: number
  let lastAuth: string[] = []

  beforeAll(done => {
    server = http.createServer((req, res) => {
      lastAuth.push(String(req.headers.authorization))
      res.writeHead(207, { 'Content-Type': 'application/xml; charset=utf-8' })
      res.end(XML)
    })
    server.listen(0, '127.0.0.1', () => {
      port = (server.address() as any).port
      done()
    })
  }, 10000)

  afterAll(done => {
    server.close(done)
  })

  it('Basic 认证头一致', async () => {
    lastAuth = []
    const { createClient, AuthType } = lib
    const client = createClient(`http://127.0.0.1:${port}/dav`, {
      authType: AuthType.Password,
      username: 'user',
      password: 'pass'
    })
    await client.getDirectoryContents('/anime')

    const { getDirectoryContents: mine } = require('../index')
    await mine(`http://127.0.0.1:${port}/dav`, {
      username: 'user',
      password: 'pass',
      path: '/anime'
    })

    expect(lastAuth).toHaveLength(2)
    expect(lastAuth[0]).toBe('Basic dXNlcjpwYXNz')
    expect(lastAuth[1]).toBe(lastAuth[0])
  })

  it.each(PATHS)('getDirectoryContents(%s) 输出深度一致', async path => {
    const { createClient, AuthType } = lib
    const client = createClient(`http://127.0.0.1:${port}/dav`, {
      authType: AuthType.Password,
      username: 'user',
      password: 'pass'
    })
    const expected = await client.getDirectoryContents(path)

    const { getDirectoryContents: mine } = require('../index')
    const actual = await mine(`http://127.0.0.1:${port}/dav`, {
      username: 'user',
      password: 'pass',
      path
    })

    expect(actual).toEqual(expected)
  })
})
