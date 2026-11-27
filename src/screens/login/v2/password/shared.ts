/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 密码登录里两个平台完全一致的小逻辑 (表单 / 判据)
 */
import { urlStringify } from '@utils'
import { APP_ID } from '@constants'
import { readRedirectTarget } from '../shared/redirect'

/** 登录表单请求体 */
export function createLoginPayload(params: {
  formhash: string
  host: string
  email: string
  password: string
  captcha: string
}): string {
  return urlStringify({
    formhash: params.formhash,
    referer: `${params.host}/`,
    dreferer: `${params.host}/`,
    email: params.email,
    password: params.password,
    captcha_challenge_field: params.captcha,
    loginsubmit: '登录'
  })
}

/** 授权表单请求体 */
export function createAuthorizePayload(formhash: string): string {
  return urlStringify({
    formhash,
    redirect_uri: '',
    client_id: APP_ID,
    submit: '授权'
  })
}

/** 服务端返回「请求来路不正确 / 验证字串不符」页面 */
export function isFormHashInvalidPage(data: unknown): boolean {
  return (
    typeof data === 'string' && (data.includes('请求来路不正确') || data.includes('验证字串不符'))
  )
}

/**
 * 本次登录是否发生过跳转
 * - 直连: responseURL 不再是登录地址
 * - 节点/原生: 响应里带 location
 */
export function hasLoginRedirect(
  data: unknown,
  headers?: Record<string, string>,
  responseURL?: string
): boolean {
  const target = readRedirectTarget(data, headers)

  return !!target || !String(responseURL || '').includes('/FollowTheRabbit')
}
