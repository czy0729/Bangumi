/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 登录动作: 验证码 / 重设 / 提交登录 / 游客登录
 */
import { useCallback, useEffect, useRef } from 'react'
import { userStore } from '@stores'
import { feedback, info } from '@utils'
import { logger } from '@utils/dev'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'
import { AUTH_RETRY_COUNT, NAMESPACE } from '../ds'
import { fetchTouristUser, restoreLoginSetting, saveLoginResult, saveLoginSetting } from '../utils'

import type { MutableRefObject } from 'react'
import type { InputInstance } from '@components'
import type { Navigation } from '@types'
import type { PasswordLoginService } from '../password'
import type { LoginState } from '../types'

type Options = {
  service: PasswordLoginService
  patch: (next: Partial<LoginState>) => void
  stateRef: MutableRefObject<LoginState>
  navigation: Navigation
  codeRef: MutableRefObject<InputInstance | null>
}

export function useLoginActions(options: Options) {
  const { service, patch, stateRef, navigation, codeRef } = options

  /** 上次成功的验证码, 用于判断是否需要重新提交 */
  const lastCaptcha = useRef('')
  const retryCount = useRef(0)

  // 重试需要执行最新的 onLogin, 避免闭包固化
  const onLoginRef = useRef<() => Promise<void>>(async () => {})

  /** 拉取验证码, 回填图片并清空已输入的验证码 */
  const loadCaptcha = useCallback(async () => {
    patch({
      base64: ''
    })

    const base64 = await service.fetchCaptcha()
    patch({
      base64,
      captcha: ''
    })
  }, [patch, service])

  /** 重设 */
  const reset = useCallback(async () => {
    try {
      service.reset()
      patch({
        base64: ''
      })
      retryCount.current = 0

      await service.fetchUserAgent(stateRef.current.isCommonUA)
      await service.fetchFormHash()
      await loadCaptcha()
    } catch {
      patch({
        loading: false,
        info: '连接 Bangumi 失败，获取验证码失败',
        networkFailed: true
      })
    }
  }, [loadCaptcha, patch, service, stateRef])

  /** 恢复本地数据 */
  const getLocalSetting = useCallback(async () => {
    patch(await restoreLoginSetting())
    reset()
  }, [patch, reset])

  /** 密码登录, 附带错误次数提示 */
  const login = useCallback(
    async (email: string, password: string, captcha: string) => {
      const data = await service.login(email, password, captcha)
      if (data.includes('分钟内您将不能登录本站')) {
        info(`累计 5 次错误尝试，15 分钟内您将不能${i18n.login()}本站。`)
      }
    },
    [service]
  )

  /** 登录成功后入库 */
  const inStore = useCallback(() => {
    patch({
      info: `${i18n.login()}成功，正在请求个人信息...(5/5)`
    })

    saveLoginResult({
      cookie: service.cookieString,
      userAgent: service.userAgent,
      accessToken: service.accessToken,
      navigation,
      isSyncSetting: () => stateRef.current.isSyncSetting
    })
  }, [navigation, patch, service, stateRef])

  /** 登录最终失败 */
  const loginFail = useCallback(
    (text: string) => {
      t('登陆.错误')

      patch({
        loading: false,
        info: text,
        failed: true
      })
      reset()
    },
    [patch, reset]
  )

  /** 登录流程 */
  const onLogin = useCallback(async () => {
    const { email, password, captcha } = stateRef.current
    if (!email || !password || !captcha) {
      info('请填写邮箱、密码和验证码')
      return
    }

    // iOS 无节点时拿不到 chii_auth, 拦截并给出可见反馈, 避免点击像失效
    if (!service.canCaptureAuth) {
      patch({
        failed: true,
        info: '当前网络路径无法完成登录，请先到设置里配置节点'
      })
      return
    }

    try {
      if (lastCaptcha.current !== captcha) {
        t('登陆.登陆')

        if (typeof codeRef.current?.inputRef?.blur === 'function') {
          codeRef.current.inputRef.blur()
        }
        saveLoginSetting('email', email)

        patch({
          loading: true,
          info: `${i18n.login()}请求中...(1/5)`
        })
        await login(email, password, captcha)
        if (!service.authorized) {
          loginFail('验证码或密码错误，请稍后重试')
          return
        }

        // 缓存上次的正确的验证码
        lastCaptcha.current = captcha

        patch({
          info: '获取授权表单码...(2/5)'
        })
        await service.fetchAuthorizeFormHash()

        patch({
          info: '授权中...(3/5)'
        })
        await service.authorize()
      } else {
        patch({
          info: '正在重试...(4/5)'
        })
        retryCount.current += 1
      }

      patch({
        info: '获取 token 中...(5/5)'
      })
      await service.fetchAccessToken()
      saveLoginSetting('password', password)
      inStore()
      service.restoreProxy()
    } catch (ex) {
      retryCount.current += 1
      logger.error(NAMESPACE, 'onLogin', ex)
      if ((ex as { code?: string })?.code === 'E_LOGIN_FORMHASH') {
        loginFail('登录页面校验失败，可能被站点风控拦截，请过一段时间再试')
        return
      }

      if (retryCount.current >= AUTH_RETRY_COUNT) {
        loginFail(`${i18n.login()}失败，请重试或重启客户端，或改用旧版${i18n.login()} →`)
        return
      }

      await onLoginRef.current()
    }
  }, [codeRef, inStore, login, loginFail, patch, service, stateRef])

  /** 游客访问 */
  const onTour = useCallback(async () => {
    t('登陆.游客访问')

    try {
      info('正在获取游客登录状态...')

      await fetchTouristUser()

      info(`${i18n.login()}成功，正在请求个人信息...`, 6)
      feedback()
      userStore.fetchUserInfo()
      userStore.fetchUsersInfo()

      navigation.popToTop()
    } catch (error) {
      logger.error(NAMESPACE, 'onTour', error)
      info('获取游客登录状态失败，请检查网络后重试')
    }
  }, [navigation])

  useEffect(() => {
    onLoginRef.current = onLogin
  }, [onLogin])

  return { loadCaptcha, reset, getLocalSetting, onLogin, onTour }
}
