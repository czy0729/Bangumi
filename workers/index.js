/*
 * @Author: czy0729
 * @Description: Cloudflare Worker 反向代理, 客户端通过 x-upstream 头指定上游域名
 */

/** 允许的上游域名白名单 */
const ALLOWED_UPSTREAMS = ['api.bgm.tv', 'bgm.tv', 'next.bgm.tv']

/** 被屏蔽的 IP */
const BLOCKED_IP = ['0.0.0.0', '127.0.0.1']

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // HTTP -> HTTPS 重定向
    if (url.protocol === 'http:') {
      url.protocol = 'https:'
      return Response.redirect(url.toString(), 301)
    }

    // CORS 预检
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() })
    }

    // 密钥验证
    const secret = env.WORKER_SECRET
    if (secret) {
      const key = request.headers.get('x-proxy-key')
      if (key !== secret) {
        return new Response('Forbidden: invalid proxy key.', { status: 403 })
      }
    }

    const ip = request.headers.get('cf-connecting-ip')
    if (BLOCKED_IP.includes(ip)) {
      return new Response('Access denied: IP blocked.', { status: 403 })
    }

    // 从 x-upstream 头读取目标域名
    const upstreamHost = request.headers.get('x-upstream')
    if (!upstreamHost || !ALLOWED_UPSTREAMS.includes(upstreamHost)) {
      return new Response('Forbidden: invalid or missing x-upstream header.', { status: 403 })
    }

    const upstream = `https://${upstreamHost}`
    const pathname = url.pathname
    const upstreamUrl = `${upstream}${pathname}${url.search}`

    // 构造请求头
    const headers = new Headers(request.headers)
    headers.set('Referer', upstream)

    // 读取 origin 用于 CORS 响应（读完即删，不发给上游）
    const reqOrigin = request.headers.get('origin')

    // 透传自定义头
    const customUserAgent = request.headers.get('x-user-agent')
    const customCookie = request.headers.get('x-cookie')
    if (customUserAgent) headers.set('User-Agent', customUserAgent)
    if (customCookie) headers.set('Cookie', customCookie)

    // 清除自定义代理头和 Cloudflare 特有头
    headers.delete('x-upstream')
    headers.delete('x-proxy-key')
    headers.delete('origin')
    headers.delete('x-cookie')
    headers.delete('host')
    headers.delete('cf-connecting-ip')
    headers.delete('cf-ipcountry')
    headers.delete('cf-ray')
    headers.delete('cf-visitor')

    // 发起上游请求
    const method = request.method
    const init = {
      method,
      headers,
      body: method !== 'GET' && method !== 'HEAD' ? request.body : undefined,
      redirect: 'follow',
      cf: { cacheTtl: 0 }
    }

    const response = await fetch(upstreamUrl, init)

    // 构造响应头
    const respHeaders = new Headers(response.headers)

    // CORS
    for (const [key, value] of Object.entries(corsHeaders(reqOrigin))) {
      respHeaders.set(key, value)
    }

    // 防缓存认证响应
    respHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    respHeaders.set('CDN-Cache-Control', 'no-store')

    // 移除 CSP
    respHeaders.delete('content-security-policy')
    respHeaders.delete('content-security-policy-report-only')
    respHeaders.delete('clear-site-data')

    // Set-Cookie -> X-Set-Cookie
    const setCookies = response.headers.getAll?.('Set-Cookie')
    if (setCookies) {
      for (const cookie of setCookies) {
        respHeaders.append('X-Set-Cookie', cookie)
      }
    } else if (response.headers.has('Set-Cookie')) {
      respHeaders.set('X-Set-Cookie', response.headers.get('Set-Cookie'))
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: respHeaders
    })
  }
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Expose-Headers': 'X-Set-Cookie',
    Vary: 'Origin'
  }
}
