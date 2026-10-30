/*
 * @Author: czy0729
 * @Date: 2022-03-16 00:00:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 吐槽页头部
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { feedback, open } from '@utils'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, WEB } from '@constants'
import { COMPONENT, DATA, LIST_COUNT_SCROLL } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleScrollToTop = useCallback(() => {
    $.scrollToTop(true)
    feedback(true)
  }, [$])

  const handleScrollToBottom = useCallback(() => {
    $.scrollToBottom(true)
    feedback(true)
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

  const { isNew, say, hm } = $
  const { list } = say
  const lastDate = list.length ? list[list.length - 1]?.date?.split(' ')[0] : ''
  const suffix = lastDate ? ` · ${lastDate}` : ''
  const title = isNew ? '新吐槽' : `吐槽 (${list.length})${suffix}`

  const headerRight = useCallback(() => {
    if (isNew) return null

    return (
      <>
        {!WEB && list.length >= LIST_COUNT_SCROLL && (
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
  }, [handleScrollToBottom, handleScrollToTop, handleSelect, isNew, list.length])

  return (
    <HeaderV2
      title={title}
      alias='吐槽'
      hm={hm}
      headerTitleSize={15}
      headerTitleAlign='left'
      headerRight={headerRight}
    />
  )
}

export default observer(Header)
