/*
 * @Author: czy0729
 * @Date: 2024-02-08 19:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-22 00:26:49
 *
 * 头部: 菜单切换功能页 + 浏览器打开
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { HTML_SINGLE_DOC } from '@constants'
import { COMPONENT, getMenuTitle, HM, MENUS } from './ds'

import type { Ctx } from '../types'

/** 头部 */
function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)
  const { uri } = $.state
  const menuTitle = getMenuTitle(uri)

  const handleOpen = useCallback(() => {
    open(HTML_SINGLE_DOC(uri))
  }, [uri])

  const handleHeaderRight = useCallback(
    () => (
      <>
        {/* 文档索引是本页核心操作, 用列表图标与全站头部的通用三横菜单区分 */}
        <HeaderV2Popover
          name='md-filter-list'
          data={MENUS}
          value={menuTitle}
          onSelect={$.onSelect}
        />
        <IconTouchable
          style={_.ml.xs}
          name='md-open-in-new'
          color={_.colorTitle}
          size={18}
          onPress={handleOpen}
        />
      </>
    ),
    [$, handleOpen, menuTitle]
  )

  return <HeaderV2 title='特色功能' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
