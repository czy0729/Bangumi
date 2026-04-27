/*
 * @Author: czy0729
 * @Date: 2022-03-11 18:03:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 12:37:23
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconTouchable
          style={_.mr.xs}
          name={$.state.useWebView ? 'md-radio-button-on' : 'md-radio-button-off'}
          size={18}
          color={_.colorDesc}
          onPress={$.toggleUseWebView}
        />
        <HeaderV2Popover
          name='md-menu'
          data={DATA}
          size={21}
          onSelect={(title: string) => {
            if (title === TEXT_MENU_BROWSER) {
              open($.url)
            } else {
              $.toggleType(title)
            }

            t('Anitama.右上角菜单', {
              key: title
            })
          }}
        />
      </>
    ),
    [$]
  )

  return <HeaderV2 title='业界资讯' alias='Anitama' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
