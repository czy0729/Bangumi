/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 05:39:07
 */
import React, { useCallback } from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXT_MENU_BROWSER } from '@constants'
import Filter from '../component/filter'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        <Filter $={$} />
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open($.url)

              t('用户评分.右上角菜单', {
                key: title
              })
            }
          }}
        />
      </>
    ),
    [$]
  )

  return useObserver(() => (
    <HeaderV2
      title={$.params?.name || '用户评分'}
      headerTitleAlign='left'
      headerTitleStyle={styles.headerTitleStyle}
      alias='用户评分'
      hm={$.hm}
      headerRight={handleHeaderRight}
    />
  ))
}

export default Header
