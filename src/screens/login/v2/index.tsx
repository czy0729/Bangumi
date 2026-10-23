/*
 * @Author: czy0729
 * @Date: 2019-06-30 15:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 11:00:00
 *
 * 账号密码登录页: 只做渲染, 状态与交互见 ./hooks, 请求链路见 ./service
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component, KeyboardSpacer } from '@components'
import { Notice, StatusBarPlaceholder } from '@_'
import { _ } from '@stores'
import { confirm } from '@utils'
import { WEB } from '@constants'
import i18n from '@constants/i18n'
import Extra from './component/extra'
import Footer from './component/footer'
import Form from './component/form'
import Notify from './component/notify'
import Preview from './component/preview'
import { useLoginV2Page } from './hooks'

import type { NavigationProps } from '@types'

/** 账号密码登录 */
function LoginV2({ navigation }: NavigationProps) {
  const {
    state,
    host,
    onCodeRef,
    onGetCaptcha,
    onFocus,
    onBlur,
    onChange,
    onSelect,
    onUAChange,
    onSyncSettingChange,
    onLogin,
    onTour,
    onPreviewLogin
  } = useLoginV2Page({ navigation })
  const {
    clicked,
    email,
    password,
    captcha,
    base64,
    isCommonUA,
    isSyncSetting,
    loading,
    info,
    focus,
    failed,
    networkFailed
  } = state

  return (
    <Component id='screen-login-v2' style={_.container.plain}>
      <StatusBarPlaceholder />
      {WEB && (
        <Notice style={_.mv.lg}>当前网页版{i18n.login()}功能尚未实装，本页面仅供查看使用</Notice>
      )}
      <View style={_.container.flex}>
        {clicked ? (
          <Form
            forwardRef={onCodeRef}
            navigation={navigation}
            email={email}
            password={password}
            captcha={captcha}
            base64={base64}
            isCommonUA={isCommonUA}
            isSyncSetting={isSyncSetting}
            loading={loading}
            info={info}
            host={host}
            failed={failed}
            networkFailed={networkFailed}
            onGetCaptcha={onGetCaptcha}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            onSelect={onSelect}
            onUAChange={onUAChange}
            onSyncSettingChange={onSyncSettingChange}
            onLogin={onLogin}
          />
        ) : (
          <Preview
            onLogin={onPreviewLogin}
            onTour={() => {
              confirm(
                `将使用开发者的测试账号, 提供大部分功能预览, 确定${i18n.login()}? (可以在设置里面退出${i18n.login()})`,
                onTour,
                '提示'
              )
            }}
          />
        )}
      </View>
      {clicked ? !focus && <Notify /> : <Footer navigation={navigation} />}
      <KeyboardSpacer topSpacing={_.ios(-120, 0)} />
      <Extra />
    </Component>
  )
}

export default observer(LoginV2)
