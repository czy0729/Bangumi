/*
 * @Author: czy0729
 * @Date: 2023-12-05 03:12:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-05 03:26:23
 */
import { useEffect } from 'react'
import { STORYBOOK } from '@constants'

const TITLE = 'Bangumi 番组计划'
const TITLE_BOTTOM_TABS = ['发现', '时间胶囊', '超展开', '搜索']

export default function useDomTitle(title: string) {
  useEffect(() => {
    if (!STORYBOOK) return

    document.title =
      title && !TITLE_BOTTOM_TABS.includes(title) ? `${title} | ${TITLE}` : TITLE
  }, [title])
}
