/*
 * @Author: czy0729
 * @Date: 2026-05-30 08:02:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-30 08:04:12
 */

/** 允许的上游域名白名单 */
const UPSTREAM = 'https://lain.bgm.tv'

/** 机密键名 */
const SECRET_NAME = 'LAIN_SECRET'

export default {
  async fetch(request, env, ctx) {
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
    const secret = env[SECRET_NAME]
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

    // ── Cache API: 用干净的路径作为缓存键 (不含 ?v=) ──
    const cache = caches.default
    const cacheKey = new Request(
      `${url.origin}${url.pathname}${searchStr ? `?${searchStr}` : ''}`,
      {
        method: 'GET'
      }
    )
    let response = await cache.match(cacheKey)

    if (response) {
      // 边缘缓存命中, 直接返回
      return response
    }

    // 发起上游请求
    const headers = new Headers()
    headers.set('Accept', request.headers.get('Accept') || 'image/*')
    headers.set('User-Agent', request.headers.get('User-Agent') || 'Bangumi32-Proxy')

    const acceptEncoding = request.headers.get('Accept-Encoding')
    if (acceptEncoding) headers.set('Accept-Encoding', acceptEncoding)

    response = await fetch(upstreamUrl, {
      method: 'GET',
      headers,
      cf: {
        cacheTtl: 86400 * 30, // Cloudflare 边缘缓存 30 天
        cacheEverything: true
      }
    })

    // 上游返回错误时直接透传
    if (!response.ok && response.status !== 304) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText
      })
    }

    // 构造可缓存的响应
    const respHeaders = new Headers(response.headers)
    respHeaders.set('Cache-Control', 'public, max-age=31536000, immutable')
    respHeaders.set('Access-Control-Allow-Origin', '*')

    const cacheableResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: respHeaders
    })

    // 写入 Cache API (fire-and-forget)
    ctx.waitUntil(cache.put(cacheKey, cacheableResponse.clone()))

    return cacheableResponse
  }
}

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
