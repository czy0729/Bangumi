/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-06 21:35:40
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { IMG_DEFAULT_AVATAR } from '@constants'
import { Ctx } from '../../types'
import HeaderTitle from './header-title'
import { COMPONENT } from './ds'

function HeaderTitleWrap({ onScrollToTop }) {
  const { $, navigation } = useStore<Ctx>()
  return (
    <HeaderTitle
      navigation={navigation}
      avatar={$.avatar === IMG_DEFAULT_AVATAR ? $.groupThumb : $.avatar}
      userId={$.userId}
      userName={$.userName}
      title={$.title}
      group={$.group}
      onScrollToTop={onScrollToTop}
    />
  )
}

export default ob(HeaderTitleWrap, COMPONENT)
