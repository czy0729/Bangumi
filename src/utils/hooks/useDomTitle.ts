/*
 * @Author: czy0729
 * @Date: 2023-12-05 03:12:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-13 04:55:09
 */
import { useEffect } from 'react'
import { STORYBOOK } from '@constants'

const TITLE = 'Bangumi 番组计划'

const TITLE_BOTTOM_TABS = ['发现', '时间胶囊', '超展开', '搜索'] as const

export default function useDomTitle(title: string) {
  useEffect(() => {
    if (!STORYBOOK) return

    if (title && !isInclude(title)) {
      document.title = `${title} | ${TITLE}`
    } else {
      document.title = TITLE
    }
  }, [title])
}

type BottomTabsTitles = (typeof TITLE_BOTTOM_TABS)[number]

function isInclude(title: string): title is BottomTabsTitles {
  return TITLE_BOTTOM_TABS.includes(title as BottomTabsTitles)
}
