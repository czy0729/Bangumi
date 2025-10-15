/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 04:46:41
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { useStore } from '@stores'
import { IMG_DEFAULT_AVATAR } from '@constants'
import HeaderTitle from './header-title'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function HeaderTitleWrap({ onScrollToTop }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <HeaderTitle
      avatar={$.avatar === IMG_DEFAULT_AVATAR ? $.groupThumb : $.avatar}
      userId={$.userId}
      userName={$.userName}
      title={$.title}
      group={$.group}
      onScrollToTop={onScrollToTop}
    />
  ))
}

export default HeaderTitleWrap
