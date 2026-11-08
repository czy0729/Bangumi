/*
 * @Author: czy0729
 * @Date: 2024-02-07 15:06:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 头部: 菜单切换版本 + 浏览器打开
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { HTML_SINGLE_DOC } from '@constants'
import { COMPONENT, HM, MENUS } from './ds'

import type { Ctx } from '../types'

/** 头部 */
function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)
  const { uri } = $.state

  const handleOpen = useCallback(() => {
    open(HTML_SINGLE_DOC(uri))
  }, [uri])

  const handleHeaderRight = useCallback(
    () => (
      <>
        <HeaderV2Popover name='md-menu' data={MENUS} onSelect={$.onSelect} />
        <IconTouchable
          style={_.ml.xs}
          name='md-open-in-new'
          color={_.colorTitle}
          size={18}
          onPress={handleOpen}
        />
      </>
    ),
    [$, handleOpen]
  )

  return <HeaderV2 title='更新内容' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
