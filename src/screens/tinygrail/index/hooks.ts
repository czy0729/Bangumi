/*
 * @Author: czy0729
 * @Date: 2024-03-04 19:09:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 04:28:08
 */
import { StatusBar } from '@components'
import { _ } from '@stores'
import { hm } from '@utils/fetch'
import { useFocusEffect, useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 小圣杯页面逻辑 */
export function useTinygrailPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
    hm('tinygrail', 'Tinygrail')
  })

  useFocusEffect(() => {
    setTimeout(() => {
      StatusBar.setBarStyle(_.select('dark-content', 'light-content'))
    }, 40)
  })
}
