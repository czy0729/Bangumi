/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 06:22:57
 */
import React from 'react'
import { Flex, Heatmap } from '@components'
import { IconNotify, IconTabsHeader, LogoHeader } from '@_'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { MENU_MAP } from '../../../discovery/index/ds'
import { COMPONENT, EVENT } from './ds'
import { styles } from './styles'

function Header() {
  const navigation = useNavigation()
  const left = MENU_MAP[systemStore.setting.homeTopLeftCustom]
  const right = MENU_MAP[systemStore.setting.homeTopRightCustom]
  return (
    <LogoHeader
      navigation={navigation}
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
              style={styles.icon}
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
              style={styles.iconRight}
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

export default ob(Header, COMPONENT)
