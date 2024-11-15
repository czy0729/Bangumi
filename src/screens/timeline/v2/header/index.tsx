/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:21:35
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTabsHeader, LogoHeader } from '@_'
import { userStore, useStore } from '@stores'
import { info, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, WEB } from '@constants'
import i18n from '@constants/i18n'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <LogoHeader
      navigation={navigation}
      right={
        <IconTabsHeader
          style={styles.icon}
          name='md-add'
          onPress={() => {
            if (WEB) {
              open(`${HOST}/timeline`)
              return
            }

            if (!userStore.isWebLogin) {
              info(`请先${i18n.login()}`)
              return
            }

            navigation.push('Say', {
              onNavigationCallback: $.fetchTimeline
            })

            t('时间胶囊.新吐槽')
          }}
        >
          <Heatmap id='时间胶囊.新吐槽' />
        </IconTabsHeader>
      }
    />
  )
}

export default ob(Header, COMPONENT)
