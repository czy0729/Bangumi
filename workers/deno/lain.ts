/*
 * @Author: czy0729
 * @Date: 2026-05-30 08:02:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-30 13:04:52
 *
 * Deno Deploy (https://console.deno.com)
 *
 * 流量优化策略:
 *  - 条件请求: 透传 If-None-Match / If-Modified-Since, 上游返回 304 无 body
 *  - 流式转发: 不缓冲 response.body, 直接 pipe 回客户端
 *  - 激进缓存: ETag + immutable, 浏览器/Deno 边缘都能命中 304
 */

/** 允许的上游域名白名单 */
const UPSTREAM = 'https://lain.bgm.tv'

/** 机密键名 */
const SECRET_NAME = 'LAIN_SECRET'

Deno.serve(async request => {
  const url = new URL(request.url)

  // HTTP -> HTTPS 重定向
  if (url.protocol === 'http:') {
    url.protocol = 'https:'
    return Response.redirect(url.toString(), 301)
  }

  // CORS 预检 (浏览器预检不带查询参数, 跳过鉴权)
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders(request.headers.get('origin')) })
  }

  // 只允许 GET/HEAD
  if (!['GET', 'HEAD'].includes(request.method)) {
    return new Response('Method Not Allowed', { status: 405 })
  }

  // ── 鉴权: 验证 ?v= 参数 (HMAC-SHA256 of pathname) ──
  const secret = Deno.env.get(SECRET_NAME)
  if (secret) {
    const token = url.searchParams.get('v')
    if (!token) {
      return new Response('Forbidden', { status: 403 })
    }
    const expected = await hmacSign(secret, url.pathname)
    if (token !== expected) {
      return new Response('Forbidden', { status: 403 })
    }
  }

  // 构造上游 URL (去掉 ?v= 参数)
  const cleanSearch = url.searchParams
  cleanSearch.delete('v')
  const searchStr = cleanSearch.toString()
  const upstreamUrl = `${UPSTREAM}${url.pathname}${searchStr ? `?${searchStr}` : ''}`

  // ── 构造上游请求头, 透传条件请求 ──
  const headers = new Headers()
  headers.set('Accept', request.headers.get('Accept') || 'image/*')
  headers.set('User-Agent', request.headers.get('User-Agent') || 'Bangumi32-Proxy')

  // 透传条件请求头, 让上游有机会返回 304 (无 body, 零传输)
  const ifNoneMatch = request.headers.get('if-none-match')
  const ifModifiedSince = request.headers.get('if-modified-since')
  if (ifNoneMatch) headers.set('If-None-Match', ifNoneMatch)
  if (ifModifiedSince) headers.set('If-Modified-Since', ifModifiedSince)

  // 透传 Accept-Encoding, 让上游返回压缩体
  const acceptEncoding = request.headers.get('accept-encoding')
  if (acceptEncoding) headers.set('Accept-Encoding', acceptEncoding)

  const response = await fetch(upstreamUrl, { method: 'GET', headers })

  // 304 Not Modified: 上游确认资源未变, 直接透传 (零 body 传输)
  if (response.status === 304) {
    return new Response(null, {
      status: 304,
      headers: {
        ...corsHeaders(request.headers.get('origin')),
        ETag: response.headers.get('ETag') || '',
        'Last-Modified': response.headers.get('Last-Modified') || ''
      }
    })
  }

  // 上游返回错误时直接透传
  if (!response.ok) {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText
    })
  }

  // ── 构造响应, 流式转发 body (不缓冲) ──
  const respHeaders = new Headers(response.headers)
  respHeaders.set('Cache-Control', 'public, max-age=31536000, immutable')
  respHeaders.set('Access-Control-Allow-Origin', '*')

  // 保留上游的 ETag / Last-Modified, 浏览器下次请求会带上条件头
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: respHeaders
  })
})

/** CORS 响应头 */
function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    Vary: 'Origin'
  }
}

/** HMAC-SHA256 签名, 返回 hex 字符串 */
async function hmacSign(secret, pathname) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(pathname))
  return Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 4)
}
