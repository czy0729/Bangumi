/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 10:00:00
 *
 * 条目页面头部 (返回首页 / 标题 / 右侧菜单)
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { useStore } from '@stores'
import HeaderTitle from '../component/header-title'
import Menu from './menu'
import PopToTop from './pop-to-top'
import { COMPONENT } from './ds'

import type { Ctx } from '../types'
import type { Props } from './types'

/** 头部左侧固定元素, 实例常驻, 无需随渲染重建 */
const elHeaderLeft = <PopToTop />

function Header({ onScrollTo, onScrollToTop }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elHeaderTitle = useMemo(
    () => <HeaderTitle onScrollToTop={onScrollToTop} />,
    [onScrollToTop]
  )

  const handleHeaderRight = useCallback(() => <Menu onScrollTo={onScrollTo} />, [onScrollTo])

  return (
    <HeaderV2
      mode='transition'
      statusBarEventsType='Subject'
      fixed={$.state.fixed}
      title='条目'
      domTitle={$.jp || $.cn}
      hm={$.hm}
      headerLeft={elHeaderLeft}
      headerTitle={elHeaderTitle}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
