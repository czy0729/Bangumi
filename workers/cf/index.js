/*
 * @Author: czy0729
 * @Date: 2026-05-30 08:02:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 20:53:09
 */

/** 允许的上游域名白名单 */
const ALLOWED_UPSTREAMS = ['api.bgm.tv', 'bgm.tv', 'next.bgm.tv']

/** 被屏蔽的 IP */
const BLOCKED_IP = ['0.0.0.0', '127.0.0.1']

/** 机密键名 */
const SECRET_NAME = 'WORKER_SECRET'

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
    const secret = env[SECRET_NAME]
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

      // 本分支自行构造响应头, 上游 30x 上的 cookie (如登录的 chii_auth) 需手动透传
      setCookieHeaders(redirectHeaders, response)

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

    // Set-Cookie 透传 (先删再写, 否则 new Headers 拷贝的合并值会与本处重复)
    respHeaders.delete('Set-Cookie')
    setCookieHeaders(respHeaders, response)

    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: respHeaders
    })
  }
}

/**
 * 透传上游 Set-Cookie
 * - 逐条写入 Set-Cookie (客户端按数组读取)
 * - 额外写入合并头 x-set-cookie: 客户端若只读第一条 set-cookie 会丢 cookie (如 chii_sec_id), 合并头可避免
 */
function setCookieHeaders(target, response) {
  const setCookies = response.headers.getSetCookie?.()
  if (setCookies?.length) {
    for (const cookie of setCookies) {
      target.append('Set-Cookie', cookie)
    }
    target.set('x-set-cookie', setCookies.join(', '))
    return
  }

  const cookie = response.headers.get('Set-Cookie')
  if (cookie) {
    target.set('Set-Cookie', cookie)
    target.set('x-set-cookie', cookie)
  }
}

/**
 * CORS 响应头
 *
 * 已知取舍 (自用节点, 有意保留, 勿盲目收紧):
 * - Allow-Origin 回显请求方 Origin 且 Allow-Credentials 为 true, Expose-Headers 又暴露了
 *   x-set-cookie (合并后的登录凭证), 理论上任意来源的浏览器脚本都能读到
 * - 实际门槛: 需要知道节点地址; 节点设置 WORKER_SECRET 时还必须通过 x-proxy-key 校验
 * - 如将来需要收紧: 通过密钥校验后再单独追加 Expose-Headers, 或把 Origin 收成白名单
 *   (RN 客户端不受 CORS 约束, 收紧不影响 App)
 */
function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Expose-Headers': 'Set-Cookie, Location, x-redirect-url, x-set-cookie',
    Vary: 'Origin'
  }
}
