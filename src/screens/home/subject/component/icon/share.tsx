/*
 * @Author: czy0729
 * @Date: 2021-07-09 23:45:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-22 17:06:50
 */
import React from 'react'
import { Header } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'

import type { Override } from '@types'
import type { Ctx } from '../../types'

const TEXT_POST_SHARE = '海报分享'
const TEXT_WEB_SHARE = 'APP 网页版分享'
const DATA = [TEXT_POST_SHARE, TEXT_WEB_SHARE] as const

function IconShare({
  $,
  navigation,
  color
}: Override<
  Ctx,
  {
    color?: any
  }
>) {
  return useObserver(() => {
    if (WEB) return null

    return (
      <Header.Popover
        style={_.mr.xs}
        data={DATA}
        name='md-ios-share'
        color={color}
        size={19}
        onSelect={key => {
          switch (key) {
            case TEXT_POST_SHARE:
              $.onPostShare(navigation)
              break

            case TEXT_WEB_SHARE:
              $.onWebShare()
              break

            default:
              break
          }
        }}
      />
    )
  })
}

export default IconShare
