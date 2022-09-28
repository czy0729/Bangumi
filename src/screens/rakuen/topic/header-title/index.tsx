/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-28 17:29:22
 */
import React from 'react'
import { ob } from '@utils/decorators'
import { IMG_DEFAULT_AVATAR } from '@constants'
import { Ctx } from '../types'
import HeaderTitle from './header-title'

export default ob(({ $, navigation }: Ctx) => {
  global.rerender('Topic.HeaderTitle')

  return (
    <HeaderTitle
      navigation={navigation}
      avatar={$.avatar === IMG_DEFAULT_AVATAR ? $.groupThumb : $.avatar}
      userId={$.userId}
      userName={$.userName}
      title={$.title}
      group={$.group}
    />
  )
})
