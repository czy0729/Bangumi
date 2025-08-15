/*
 * @Author: czy0729
 * @Date: 2025-03-22 19:59:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-22 20:11:27
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { confirm, open } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { FROZEN_FN, HOST, URL_PRIVACY, WEB } from '@constants'
import i18n from '@constants/i18n'
import { COMPONENT, TEXT_REGISTER } from './ds'
import { memoStyles } from './styles'

function Footer({ navigation }) {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Flex style={styles.footer} justify='around'>
        {!WEB && (
          <Touchable
            onPress={() => {
              confirm(
                TEXT_REGISTER,
                () => {
                  open(`${HOST}/signup`)

                  t('登陆.跳转', {
                    to: 'Signup'
                  })
                },
                '提示',
                FROZEN_FN,
                '前往注册'
              )
            }}
          >
            <Flex justify='center'>
              <Text size={11} type='sub' bold>
                注册
              </Text>
              <Iconfont style={_.ml.xxs} name='md-open-in-new' color={_.colorSub} size={12} />
            </Flex>
            <Heatmap id='登陆.跳转' to='Signup' alias='注册' />
          </Touchable>
        )}
        <Touchable
          onPress={() => {
            open(URL_PRIVACY)

            t('登陆.跳转', {
              to: 'Privacy'
            })
          }}
        >
          <Flex justify='center'>
            <Text size={11} type='sub' bold>
              隐私保护政策
            </Text>
            <Iconfont style={_.ml.xxs} name='md-open-in-new' color={_.colorSub} size={12} />
          </Flex>
          <Heatmap id='登陆.跳转' to='Privacy' alias='隐私保护政策' />
        </Touchable>
        {!WEB && (
          <Text
            size={11}
            bold
            type='sub'
            onPress={() => {
              navigation.push('LoginAssist')

              t('登陆.跳转', {
                to: 'LoginAssist'
              })
            }}
          >
            辅助{i18n.login()}
            <Heatmap id='登陆.跳转' to='LoginAssist' alias='辅助登录' />
          </Text>
        )}
      </Flex>
    )
  })
}

export default Footer
