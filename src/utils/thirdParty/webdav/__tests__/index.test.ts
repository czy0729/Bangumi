/*
 * @Author: czy0729
 * @Date: 2026-09-02 19:43:12
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-02 19:43:12
 */
import { buildPropfindRequest, generateBasicAuthHeader, parseMultistatus } from '../index'

/** Apache 风格: D: 前缀 + 自引用条目 + 子目录 + 中文文件名 (URL 编码) */
const XML_DAV = `<?xml version="1.0" encoding="utf-8"?>
<D:multistatus xmlns:D="DAV:">
  <D:response>
    <D:href>/dav/anime/</D:href>
    <D:propstat>
      <D:prop>
        <D:resourcetype><D:collection/></D:resourcetype>
        <D:getlastmodified>Mon, 31 Aug 2026 08:00:00 GMT</D:getlastmodified>
      </D:prop>
      <D:status>HTTP/1.1 200 OK</D:status>
    </D:propstat>
  </D:response>
  <D:response>
    <D:href>/dav/anime/season%201/</D:href>
    <D:propstat>
      <D:prop>
        <D:resourcetype><D:collection/></D:resourcetype>
        <D:getlastmodified>Mon, 31 Aug 2026 08:01:00 GMT</D:getlastmodified>
      </D:prop>
      <D:status>HTTP/1.1 200 OK</D:status>
    </D:propstat>
  </D:response>
  <D:response>
    <D:href>/dav/anime/%E6%B8%8B%E8%B0%B7%2001.mkv</D:href>
    <D:propstat>
      <D:prop>
        <D:getcontentlength>1024</D:getcontentlength>
        <D:getlastmodified>Mon, 31 Aug 2026 08:02:00 GMT</D:getlastmodified>
        <D:getetag>"abc-123"</D:getetag>
        <D:getcontenttype>video/mp4; charset=utf-8</D:getcontenttype>
      </D:prop>
      <D:status>HTTP/1.1 200 OK</D:status>
    </D:propstat>
  </D:response>
</D:multistatus>`

/** Nextcloud 风格: d: 前缀 + 实体解码 + 双 propstat + 无 getcontentlength 的目录 */
const XML_NEXTCLOUD = `<?xml version="1.0"?>
<d:multistatus xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns" xmlns:nc="http://nextcloud.org/ns">
  <d:response>
    <d:href>/remote.php/dav/files/user/%E6%B8%B8%E6%88%8F/subdir/</d:href>
    <d:propstat>
      <d:prop>
        <d:getlastmodified>Tue, 01 Sep 2026 01:02:03 GMT</d:getlastmodified>
        <d:resourcetype><d:collection/></d:resourcetype>
        <d:quota-used-bytes>1</d:quota-used-bytes>
      </d:prop>
      <d:status>HTTP/1.1 200 OK</d:status>
    </d:propstat>
  </d:response>
  <d:response>
    <d:href>/remote.php/dav/files/user/%E6%B8%B8%E6%88%8F/A&amp;B%20.op</d:href>
    <d:propstat>
      <d:prop>
        <d:getlastmodified>Wed, 02 Sep 2026 04:05:06 GMT</d:getlastmodified>
        <d:getcontentlength>2048</d:getcontentlength>
        <d:resourcetype/>
        <d:getetag>&quot;deadbeef&quot;</d:getetag>
      </d:prop>
      <d:status>HTTP/1.1 200 OK</d:status>
    </d:propstat>
    <d:propstat>
      <d:prop>
        <nc:has-preview/>
      </d:prop>
      <d:status>HTTP/1.1 404 Not Found</d:status>
    </d:propstat>
  </d:response>
</d:multistatus>`

/** 无前缀命名空间 + 绝对 URL href + 自闭合空 resourcetype 的文件 */
const XML_NO_PREFIX = `<?xml version="1.0" encoding="utf-8"?>
<multistatus xmlns="DAV:">
  <response>
    <href>http://192.168.1.2:5000/dav/movie.mkv</href>
    <propstat>
      <prop>
        <resourcetype/>
        <getlastmodified>Thu, 03 Sep 2026 09:09:09 GMT</getlastmodified>
        <getcontentlength>3145728</getcontentlength>
      </prop>
      <status>HTTP/1.1 200 OK</status>
    </propstat>
  </response>
</multistatus>`

describe('webdav (parseMultistatus)', () => {
  describe('XML_DAV (Apache 风格, serverBase=/dav/, requestPath=/anime)', () => {
    const items = parseMultistatus(XML_DAV, '/dav/', '/anime')

    it('目录自身条目被剔除', () => {
      expect(items.some(item => item.filename === '/anime')).toBe(false)
      expect(items).toHaveLength(2)
    })

    it('子目录: filename 带首斜杠 (对齐原库 normalisePath)/basename/type/lastmod', () => {
      expect(items[0]).toMatchObject({
        filename: '/anime/season 1',
        basename: 'season 1',
        type: 'directory',
        lastmod: 'Mon, 31 Aug 2026 08:01:00 GMT'
      })
    })

    it('目录缺 getcontentlength 时 size 为 0', () => {
      expect(items[0].size).toBe(0)
    })

    it('中文文件名 URL 解码 + size/etag 去引号/mime 截断', () => {
      expect(items[1]).toMatchObject({
        filename: '/anime/渋谷 01.mkv',
        basename: '渋谷 01.mkv',
        type: 'file',
        size: 1024,
        etag: 'abc-123',
        mime: 'video/mp4'
      })
    })
  })

  describe('XML_NEXTCLOUD (d: 前缀 + 实体 + 双 propstat)', () => {
    const items = parseMultistatus(XML_NEXTCLOUD, '/remote.php/dav/files/user/', '/游戏')

    it('请求目录自身 (游戏) 被剔除, 子目录解析', () => {
      expect(items.some(item => item.filename === '/游戏')).toBe(false)
      expect(items[0]).toMatchObject({
        filename: '/游戏/subdir',
        basename: 'subdir',
        type: 'directory'
      })
    })

    it('文件名实体 &amp; 解码, 第二组 propstat 不干扰取值', () => {
      expect(items[1]).toMatchObject({
        filename: '/游戏/A&B .op',
        basename: 'A&B .op',
        type: 'file',
        size: 2048,
        etag: 'deadbeef'
      })
    })
  })

  describe('XML_NO_PREFIX (无前缀 + 绝对 href)', () => {
    const items = parseMultistatus(XML_NO_PREFIX, '/dav/', '/')

    it('绝对 URL href 归一化后按 serverBase 截取', () => {
      expect(items[0]).toMatchObject({
        filename: '/movie.mkv',
        basename: 'movie.mkv',
        type: 'file',
        size: 3145728
      })
    })
  })

  it('空 multistatus 返回空数组', () => {
    expect(parseMultistatus('<D:multistatus xmlns:D="DAV:"></D:multistatus>', '/', '/')).toEqual([])
  })

  it('无 multistatus 根节点抛错', () => {
    expect(() => parseMultistatus('<html><body>404</body></html>', '/', '/')).toThrow(
      'Invalid response: No root multistatus found'
    )
  })
})

describe('webdav (buildPropfindRequest)', () => {
  it('URL 拼接: origin + pathname + encodePath + 尾斜杠', () => {
    const request = buildPropfindRequest('http://192.168.1.2:5000/dav', '/anime', {
      username: 'user',
      password: 'pass'
    })
    expect(request.url).toBe('http://192.168.1.2:5000/dav/anime/')
    expect(request.method).toBe('PROPFIND')
    expect(request.headers.Depth).toBe('1')
    expect(request.headers.Accept).toBe('text/plain')
    expect(request.responseType).toBe('text')
    expect(request.serverBase).toBe('/dav/')
    expect(request.requestPath).toBe('/anime')
  })

  it('path 无首斜杠时自动补齐', () => {
    const request = buildPropfindRequest('http://192.168.1.2:5000', 'anime')
    expect(request.url).toBe('http://192.168.1.2:5000/anime/')
    expect(request.serverBase).toBe('/')
    expect(request.requestPath).toBe('/anime')
  })

  it('path 为空 (根目录) 不产生双斜杠', () => {
    const request = buildPropfindRequest('http://192.168.1.2:5000/dav', '')
    expect(request.url).toBe('http://192.168.1.2:5000/dav/')
    expect(request.requestPath).toBe('/')
  })

  it('路径按段 URL 编码, 保留斜杠', () => {
    const request = buildPropfindRequest('http://192.168.1.2:5000/dav', '/游戏 season 1')
    expect(request.url).toBe('http://192.168.1.2:5000/dav/%E6%B8%B8%E6%88%8F%20season%201/')
  })

  it('有凭据时携带 Basic Authorization', () => {
    const request = buildPropfindRequest('http://192.168.1.2:5000', '/anime', {
      username: 'user',
      password: 'pass'
    })
    expect(request.headers.Authorization).toBe('Basic dXNlcjpwYXNz')
  })

  it('无凭据时不携带 Authorization', () => {
    const request = buildPropfindRequest('http://192.168.1.2:5000', '/anime')
    expect(request.headers.Authorization).toBeUndefined()
  })
})

describe('webdav (generateBasicAuthHeader)', () => {
  it('Latin1 凭据与标准 base64 一致', () => {
    expect(generateBasicAuthHeader('user', 'pass')).toBe('Basic dXNlcjpwYXNz')
  })

  it('非 Latin1 凭据按 UTF-8 编码 (原库会抛错)', () => {
    expect(generateBasicAuthHeader('用户', '密码')).toBe('Basic 55So5oi3OuWvhueggQ==')
  })
})
