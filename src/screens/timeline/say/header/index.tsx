/*
 * @Author: czy0729
 * @Date: 2022-03-16 00:00:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 12:46:12
 */
import React, { useCallback, useMemo } from 'react'
import { useObserver } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, WEB } from '@constants'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleScrollToTop = useCallback(() => {
    $.scrollToTop($.scrollViewRef, true)
  }, [$])

  const handleScrollToBottom = useCallback(() => {
    $.scrollToBottom($.scrollViewRef, true)
  }, [$])

  const handleSelect = useCallback(
    (title: string) => {
      if (title === TEXT_MENU_BROWSER) {
        open($.url)

        t('吐槽.右上角菜单', { key: title })
      }
    },
    [$]
  )

  return useObserver(() => {
    const { isNew, say, hm } = $
    const list = say.list || []
    const lastDate = list.length ? list[list.length - 1]?.date?.split(' ')?.[0] : ''

    const title = useMemo(() => {
      if (isNew) return '新吐槽'

      const count = list.length
      return `吐槽 (${count})${lastDate ? ` · ${lastDate}` : ''}`
    }, [isNew, list.length, lastDate])

    const headerRight = useCallback(() => {
      if (isNew) return null

      return (
        <>
          {!WEB && list.length >= 10 && (
            <>
              <IconTouchable
                style={_.mr._xs}
                name='md-keyboard-arrow-up'
                size={24}
                color={_.colorTitle}
                onPress={handleScrollToTop}
              />
              <IconTouchable
                name='md-keyboard-arrow-down'
                size={24}
                color={_.colorTitle}
                onPress={handleScrollToBottom}
              />
            </>
          )}
          <HeaderV2Popover data={DATA} onSelect={handleSelect} />
        </>
      )
    }, [isNew, list.length])

    return (
      <HeaderV2
        title={title}
        alias='吐槽'
        hm={hm}
        headerTitleAlign='left'
        headerRight={headerRight}
      />
    )
  })
}

export default Header
