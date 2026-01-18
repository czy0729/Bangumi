/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 16:17:31
 */
import React, { useMemo } from 'react'
import { Heatmap } from '@components'
import { IconTabsHeader, LogoHeader } from '@_'
import { userStore, useStore } from '@stores'
import { info, open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { HOST, WEB } from '@constants'
import i18n from '@constants/i18n'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const elRight = useMemo(
    () => (
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
    ),
    [$, navigation]
  )

  return useObserver(() => <LogoHeader navigation={navigation} right={elRight} />)
}

export default Header
