/*
 * @Author: czy0729
 * @Date: 2023-12-05 03:12:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 12:00:00
 */
import { useEffect } from 'react'
import { WEB } from '@constants/device'
import { BOTTOM_TAB_LABEL } from '@constants/data/tab'

const TITLE = 'Bangumi 番组计划'

/** 这些标题不加站点后缀, 另含非底栏的搜索页 */
const TITLE_BOTTOM_TABS = [...Object.values(BOTTOM_TAB_LABEL), '搜索']

/**
 * 自定义 Hook，用于设置 Web 页面标题 (非 web 平台为空操作)
 *  - 底部 Tab 页面标题保持默认, 其余页面为 `${title} | ${TITLE}`
 *
 * @param title 页面标题
 */
export default function useDomTitle(title: string): void {
  useEffect(() => {
    if (!WEB) return

    if (title && !isInclude(title)) {
      window.document.title = `${title} | ${TITLE}`
    } else {
      window.document.title = TITLE
    }
  }, [title])
}

function isInclude(title: string): boolean {
  return TITLE_BOTTOM_TABS.includes(title)
}
