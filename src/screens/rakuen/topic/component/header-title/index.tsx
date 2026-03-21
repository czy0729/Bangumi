/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 05:40:28
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import { IMG_DEFAULT_AVATAR } from '@constants'
import HeaderTitle from './header-title'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function HeaderTitleWrap({ onScrollToTop }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <HeaderTitle
      avatar={$.avatar === IMG_DEFAULT_AVATAR ? $.groupThumb : $.avatar}
      userId={$.userId}
      userName={$.userName}
      title={$.title}
      group={$.group}
      onScrollToTop={onScrollToTop}
    />
  )
}

export default observer(HeaderTitleWrap)
