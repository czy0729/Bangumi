/*
 * @Author: czy0729
 * @Date: 2022-02-27 12:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 19:13:45
 */
import React, { useCallback, useEffect, useState } from 'react'
import { Image as RNImage } from 'react-native'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { Flex, Iconfont, Input, Text, Touchable } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { info } from '@utils'
import { useObserver } from '@utils/hooks'
import { update } from '@utils/kv'
import { doLogin, getConfig } from './utils'
import { memoStyles } from './styles'

function UpdateTourist() {
  const [show, setShow] = useState(false)
  const [config, setConfig] = useState<{
    ua?: string
    cookie?: string
    formhash?: string
    base64?: string
  }>({})
  const [captcha, setCaptcha] = useState('')

  const onChange = useCallback(
    evt => {
      const { nativeEvent } = evt
      const { text } = nativeEvent
      setCaptcha(text)
    },
    [setCaptcha]
  )
  const onGetCofig = useCallback(async () => {
    if (!show) return

    setConfig(await getConfig())
    setCaptcha('')
  }, [show])
  const onLogin = useCallback(async () => {
    try {
      info('do login')

      const data = await doLogin(config, captcha)
      if (!data) info('login fail')

      await update('tourist', data)
      info('update db success')
    } catch (error) {
      info('catch error: login fail')
    }
  }, [config, captcha])

  useEffect(() => {
    onGetCofig()
  }, [onGetCofig])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <ItemSetting
          hd='Update Tourist'
          ft={
            <Touchable onPress={() => setShow(!show)}>
              <Text>使用</Text>
            </Touchable>
          }
          withoutFeedback
        />
        {show && (
          <Flex style={styles.container}>
            <Flex.Item>
              <Input
                style={styles.input}
                value={captcha}
                placeholder='验证码'
                onChange={onChange}
              />
            </Flex.Item>
            <Touchable style={styles.captchaTouch} onPress={onGetCofig}>
              <Flex style={styles.captchaContainer} justify='center'>
                {config.base64 ? (
                  <RNImage
                    style={styles.captcha}
                    source={{
                      uri: config.base64
                    }}
                  />
                ) : (
                  <ActivityIndicator size='small' />
                )}
              </Flex>
            </Touchable>
            <Touchable style={_.ml.lg} onPress={onLogin}>
              <Iconfont name='md-check' />
            </Touchable>
          </Flex>
        )}
      </>
    )
  })
}

export default UpdateTourist
