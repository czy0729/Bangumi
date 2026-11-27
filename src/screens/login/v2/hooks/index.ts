/*
 * @Author: czy0729
 * @Date: 2026-10-23 11:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 页面编排: 组合 state / 登录动作 / 输入交互 / 生命周期
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { feedback, info } from '@utils'
import { hm, t } from '@utils/fetch'
import { createPasswordLoginService } from '../password'
import { saveLoginSetting } from '../utils'
import { useLoginActions } from './login'
import { INIT_STATE, useLoginState } from './state'

import type { InputInstance } from '@components'
import type { NavigationProps } from '@types'
import type { ChangeField, LoginState } from '../types'

export function useLoginV2Page({ navigation }: NavigationProps) {
  // 引用需保持不变: patch / reset 依赖它, 变化会连带重跑页面初始化
  const [service] = useState(() => createPasswordLoginService(INIT_STATE.host))
  const { state, stateRef, patch } = useLoginState(service)

  const codeRef = useRef<InputInstance | null>(null)

  // 页面是否仍挂载, 用于阻止异步初始化在卸载后继续执行
  const mountedRef = useRef(true)

  const { loadCaptcha, reset, getLocalSetting, onLogin, onTour } = useLoginActions({
    service,
    patch,
    stateRef,
    navigation,
    codeRef
  })

  /** 外置图标: 注册验证码输入框实例 */
  const onCodeRef = useCallback((ref: InputInstance) => {
    codeRef.current = ref
  }, [])

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

  /** 显示登录表单 */
  const onPreviewLogin = useCallback(() => {
    patch({
      clicked: true
    })
  }, [patch])

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
  }, [patch, reset, stateRef])

  /** 切换是否自动同步设置 */
  const onSyncSettingChange = useCallback(() => {
    const next = !stateRef.current.isSyncSetting

    saveLoginSetting('isSyncSetting', next)
    patch({
      isSyncSetting: next
    })
    feedback(true)
  }, [patch, stateRef])

  useEffect(() => {
    mountedRef.current = true
    ;(async () => {
      // 先确认/清理已有登录态, 再切到支持者节点走验证码与登录
      await service.probeHome()
      if (!mountedRef.current) return

      if (!service.applySupporter()) info('当前网络路径无法完成登录，请先到设置里配置节点')
      if (!mountedRef.current) {
        // 页面在切换后才卸载, 补一次还原
        service.restoreProxy()
        return
      }

      await getLocalSetting()
    })()
    hm('login/v2', 'LoginV2')

    return () => {
      mountedRef.current = false
      service.restoreProxy()
    }
  }, [getLocalSetting, service])

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
