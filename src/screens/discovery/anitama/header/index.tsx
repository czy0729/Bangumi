/*
 * @Author: czy0729
 * @Date: 2022-03-11 18:03:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 12:37:23
 */
import React, { useCallback } from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { url } = $

    const handleSelect = useCallback(
      (title: string) => {
        if (title === TEXT_MENU_BROWSER) {
          open(url)
        } else {
          $.toggleType(title)
        }

        t('Anitama.右上角菜单', {
          key: title
        })
      },
      [url]
    )

    return (
      <HeaderV2
        title='二次元资讯'
        alias='Anitama'
        hm={HM}
        headerRight={() => (
          <>
            <IconTouchable
              style={_.mr.xs}
              name={$.state.useWebView ? 'md-radio-button-on' : 'md-radio-button-off'}
              size={20}
              color={_.colorDesc}
              onPress={$.toggleUseWebView}
            />
            <HeaderV2Popover name='md-menu' data={DATA} onSelect={handleSelect} />
          </>
        )}
      />
    )
  })
}

export default Header
