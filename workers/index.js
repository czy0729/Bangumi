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
      return new Response(null, { headers: corsHeaders(request.headers.get('origin')) })
    }

    // 密钥验证
    const secret = env.WORKER_SECRET
    if (secret) {
      const key = request.headers.get('x-proxy-key')
      if (key !== secret) {
        return new Response('Forbidden: invalid proxy key.', { status: 403 })
      }
    }

    // IP 封禁
    const ip = request.headers.get('cf-connecting-ip')
    if (BLOCKED_IP.includes(ip)) {
      return new Response('Access denied: IP blocked.', { status: 403 })
    }

    // 上游域名校验
    const upstreamHost = request.headers.get('x-upstream')
    if (!upstreamHost || !ALLOWED_UPSTREAMS.includes(upstreamHost)) {
      return new Response('Forbidden: invalid or missing x-upstream header.', { status: 403 })
    }

    const upstream = `https://${upstreamHost}`
    const upstreamUrl = `${upstream}${url.pathname}${url.search}`

    // 构造请求头
    const headers = new Headers(request.headers)

    // 透传自定义头
    const customUserAgent = request.headers.get('x-user-agent')
    const customCookie = request.headers.get('x-cookie')
    const noRedirect = request.headers.get('x-no-redirect')

    if (customUserAgent) headers.set('User-Agent', customUserAgent)
    if (customCookie) headers.set('Cookie', customCookie)

    // 清除代理头
    headers.delete('x-upstream')
    headers.delete('x-proxy-key')
    headers.delete('x-cookie')
    headers.delete('x-user-agent')
    headers.delete('x-no-redirect')
    headers.delete('host')
    headers.delete('cf-connecting-ip')
    headers.delete('cf-ipcountry')
    headers.delete('cf-ray')
    headers.delete('cf-visitor')

    // 发起上游请求
    const init = {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
      redirect: noRedirect ? 'manual' : 'follow',
      cf: { cacheTtl: 0 }
    }

    const response = await fetch(upstreamUrl, init)
    const reqOrigin = request.headers.get('origin')

    // 拦截 30x 重定向，转为 200 返回，通过 x-redirect-url 传递重定向地址
    if (noRedirect && [301, 302, 307, 308].includes(response.status)) {
      const redirectLocation = response.headers.get('Location')
      const redirectHeaders = new Headers(corsHeaders(reqOrigin))

      if (redirectLocation) {
        redirectHeaders.set('Location', redirectLocation)
        redirectHeaders.set('x-redirect-url', redirectLocation)
      }

      return new Response(JSON.stringify({ location: redirectLocation }), {
        status: 200,
        headers: redirectHeaders
      })
    }

    // 构造响应头
    const respHeaders = new Headers(response.headers)

    // buffer body 避免 RN axios redirect hang
    const body = await response.arrayBuffer()

    // 检测跟随重定向后 URL 是否变化
    const finalUrl = response.url
    if (noRedirect && finalUrl !== upstreamUrl) {
      respHeaders.set('x-redirect-url', finalUrl)
      respHeaders.set('Location', finalUrl)
    }

    // preserve redirect
    const location = respHeaders.get('Location')
    if (location) {
      respHeaders.set('Location', location)
    }

    // CORS
    for (const [key, value] of Object.entries(corsHeaders(reqOrigin))) {
      respHeaders.set(key, value)
    }

    // 防缓存
    respHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    respHeaders.set('CDN-Cache-Control', 'no-store')

    // 移除 CSP
    respHeaders.delete('content-security-policy')
    respHeaders.delete('content-security-policy-report-only')
    respHeaders.delete('clear-site-data')

    // Set-Cookie 透传
    const setCookies = response.headers.getSetCookie?.()
    if (setCookies?.length) {
      for (const cookie of setCookies) {
        respHeaders.append('Set-Cookie', cookie)
      }
    } else if (response.headers.has('Set-Cookie')) {
      respHeaders.set('Set-Cookie', response.headers.get('Set-Cookie'))
    }

    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: respHeaders
    })
  }
}

/** CORS 响应头 */
function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Expose-Headers': 'Set-Cookie, Location, x-redirect-url',
    Vary: 'Origin'
  }
}
