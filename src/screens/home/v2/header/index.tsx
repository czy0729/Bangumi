/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-22 12:46:42
 */
import React from 'react'
import { Flex, Heatmap } from '@components'
import { LogoHeader, IconNotify, IconTabsHeader } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MENU_MAP } from '../../../discovery/index/ds'
import { styles } from './styles'

const EVENT = {
  id: '首页.跳转'
} as const

function Header(props, { navigation }) {
  global.rerender('Home.Header')

  const { homeTopLeftCustom, homeTopRightCustom } = systemStore.setting
  const left = MENU_MAP[homeTopLeftCustom]
  const right = MENU_MAP[homeTopRightCustom]
  return (
    <LogoHeader
      left={
        <IconNotify style={styles.icon} navigation={navigation} event={EVENT}>
          <Heatmap right={-39} id='首页.跳转' to='Notify' alias='电波提醒' />
          <Heatmap right={-92} id='其他.切换主题' transparent />
        </IconNotify>
      }
      right={
        <Flex style={_.mr.xs}>
          {!!left && (
            <IconTabsHeader
              style={[styles.icon, _.mr.xs]}
              name={left.icon}
              text={left.text}
              size={(left.size || 23) - 1}
              onPress={() => {
                t('首页.跳转', {
                  to: left.key
                })
                navigation.push(left.key)
              }}
            />
          )}
          {!!right && (
            <IconTabsHeader
              style={[styles.icon, _.mr.xs]}
              name={right.icon}
              text={right.text}
              size={(right.size || 23) - 1}
              onPress={() => {
                t('首页.跳转', {
                  to: right.key
                })
                navigation.push(right.key)
              }}
            />
          )}
        </Flex>
      }
    />
  )
}

export default obc(Header)
