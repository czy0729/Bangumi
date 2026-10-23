/*
 * @Author: czy0729
 * @Date: 2026-10-23 11:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 11:00:00
 *
 * 页面状态与交互: 本地设置恢复 / 验证码 / 登录重试 / 游客预览
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { userStore } from '@stores'
import { feedback, info } from '@utils'
import { logger } from '@utils/dev'
import { hm, t } from '@utils/fetch'
import { HOST, WEB } from '@constants'
import i18n from '@constants/i18n'
import { HOST_PROXY } from '@src/config'
import { LoginService } from './service'
import { fetchTouristUser, restoreLoginSetting, saveLoginResult, saveLoginSetting } from './utils'
import { AUTH_RETRY_COUNT, NAMESPACE } from './ds'

import type { InputInstance } from '@components'
import type { NavigationProps } from '@types'
import type { ChangeField, LoginState } from './types'

/** 页面 state 初始值 */
const INIT_STATE: LoginState = {
  host: WEB ? HOST_PROXY : HOST,
  clicked: false,
  email: '',
  password: '',
  captcha: '',
  base64: '',
  isCommonUA: false,
  isSyncSetting: false,
  loading: false,
  info: '',
  focus: false,
  failed: false,
  networkFailed: false
}

export function useLoginV2Page({ navigation }: NavigationProps) {
  const [state, setState] = useState<LoginState>(INIT_STATE)

  // 引用需保持不变: patch / reset 依赖它, 变化会连带重跑页面初始化
  const [service] = useState(() => new LoginService(INIT_STATE.host))

  // 异步流程内读取的最新 state, 对应 class 的 this.state
  const stateRef = useRef(state)
  const lastCaptcha = useRef('')
  const retryCount = useRef(0)
  const codeRef = useRef<InputInstance | null>(null)

  // 重试需要执行最新的 onLogin, 避免闭包固化
  const onLoginRef = useRef<() => Promise<void>>(async () => {})

  /** 合并进 stateRef 后再 setState, 供异步流程读取最新值; host 变化时同步给 service */
  const patch = useCallback(
    (next: Partial<LoginState>) => {
      const merged = { ...stateRef.current, ...next }
      stateRef.current = merged
      if (next.host !== undefined) service.host = next.host
      setState(merged)
    },
    [service]
  )

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
        info: '连接主站失败，获取验证码失败',
        networkFailed: true
      })
    }
  }, [loadCaptcha, patch, service])

  /** 恢复本地数据 */
  const getLocalSetting = useCallback(async () => {
    patch(await restoreLoginSetting())
    reset()
  }, [patch, reset])

  /**
   * 密码登录
   *
   * @param email 邮箱
   * @param password 密码
   * @param captcha 验证码
   */
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
      info: `${i18n.login()}成功, 正在请求个人信息...(5/5)`
    })

    saveLoginResult({
      cookie: service.cookieString,
      userAgent: service.userAgent,
      accessToken: service.accessToken,
      navigation,
      isSyncSetting: () => stateRef.current.isSyncSetting
    })
  }, [navigation, patch, service])

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
      info('请填写以上字段')
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
          loginFail(`验证码或密码错误，稍会再重试或前往授权${i18n.login()} →`)
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
          info: '重试 (4/5)'
        })
        retryCount.current += 1
      }

      patch({
        info: '授权成功, 获取token中...(4/5)'
      })
      await service.fetchAccessToken()
      saveLoginSetting('password', password)
      inStore()
    } catch (ex) {
      retryCount.current += 1
      if (retryCount.current >= AUTH_RETRY_COUNT) {
        loginFail(
          `[${String(ex)}] ${i18n.login()}失败，请重试或重启客户端，或前往授权${i18n.login()} →`
        )
        return
      }

      logger.error(NAMESPACE, 'onLogin', ex)
      onLoginRef.current()
    }
  }, [inStore, login, loginFail, patch, service])

  useEffect(() => {
    onLoginRef.current = onLogin
  }, [onLogin])

  /** 游客访问 */
  const onTour = useCallback(async () => {
    t('登陆.游客访问')

    try {
      info('正在从 github 获取游客 cookie...')

      await fetchTouristUser()

      info(`${i18n.login()}成功, 正在请求个人信息...`, 6)
      feedback()
      userStore.fetchUserInfo()
      userStore.fetchUsersInfo()

      navigation.popToTop()
    } catch (error) {
      logger.error(NAMESPACE, 'onTour', error)
      info(`${i18n.login()}状态过期, 请稍后再试`)
    }
  }, [navigation])

  /** 显示登录表单 */
  const onPreviewLogin = useCallback(() => {
    patch({
      clicked: true
    })
  }, [patch])

  /** 输入框聚焦 */
  const onFocus = useCallback(() => {
    patch({
      focus: true
    })
  }, [patch])

  /** 输入框失焦 */
  const onBlur = useCallback(() => {
    patch({
      focus: false
    })
  }, [patch])

  /** 输入框变化 */
  const onChange = useCallback(
    (evt: { nativeEvent: { text: string } }, type: ChangeField) => {
      let { text } = evt.nativeEvent
      if (type === 'captcha') text = text.replace(/ /g, '')

      const next: Partial<LoginState> = { info: '' }
      next[type] = text
      patch(next)
    },
    [patch]
  )

  /** 注册验证码输入框实例 */
  const onCodeRef = useCallback((ref: InputInstance) => {
    codeRef.current = ref
  }, [])

  /** 切换登录域名 */
  const onSelect = useCallback(
    (host: string) => {
      saveLoginSetting('host', host)
      patch({
        host
      })
      t('登陆.切换域名', {
        host
      })

      reset()
    },
    [patch, reset]
  )

  /** 切换是否使用固定 UA 登录 */
  const onUAChange = useCallback(() => {
    const next = !stateRef.current.isCommonUA

    saveLoginSetting('isCommonUA', next)
    patch({
      isCommonUA: next
    })
    feedback(true)

    reset()
  }, [patch, reset])

  /** 切换是否自动同步设置 */
  const onSyncSettingChange = useCallback(() => {
    const next = !stateRef.current.isSyncSetting

    saveLoginSetting('isSyncSetting', next)
    patch({
      isSyncSetting: next
    })
    feedback(true)
  }, [patch])

  useEffect(() => {
    getLocalSetting()
    hm('login/v2', 'LoginV2')
  }, [getLocalSetting])

  return {
    /** 页面 state */
    state,

    /** 当前登录域名 */
    host: state.host,

    /** 注册验证码输入框实例 */
    onCodeRef,

    /** 刷新验证码 */
    onGetCaptcha: loadCaptcha,

    /** 输入框聚焦 */
    onFocus,

    /** 输入框失焦 */
    onBlur,

    /** 输入框变化 */
    onChange,

    /** 切换登录域名 */
    onSelect,

    /** 切换是否使用固定 UA */
    onUAChange,

    /** 切换是否同步云端设置 */
    onSyncSettingChange,

    /** 提交登录 */
    onLogin,

    /** 游客登录 */
    onTour,

    /** 展示账号密码表单 */
    onPreviewLogin
  }
}
