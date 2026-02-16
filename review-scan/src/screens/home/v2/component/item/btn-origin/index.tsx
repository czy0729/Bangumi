/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:49:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-21 18:23:02
 */
import React, { useCallback } from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { systemStore, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectId, SubjectTypeCn } from '@types'
import { Ctx } from '../../../types'
import {
  TEXT_ADD_REMINDER,
  TEXT_COLLAPSE_ALL,
  TEXT_EXPAND_ALL,
  TEXT_EXPORT_SCHEDULE,
  TEXT_PIN,
  TEXT_UNPIN
} from '../../../store/ds'
import { COMPONENT } from './ds'
import { styles } from './styles'

function BtnOrigin({ subjectId }: { subjectId: SubjectId }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const handleSelect = useCallback(
    (label: string) => {
      $.onPopover(label, subjectId)
    },
    [$, subjectId]
  )

  return useObserver(() => {
    if (systemStore.setting.homeOrigin === -1) return null

    const subject = $.subject(subjectId)
    const title = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
    const isAnime = ['动画', '三次元'].includes(title)
    const isPinned = $.state.top.indexOf(subjectId) !== -1

    // 来源
    const origins = [...$.actions(subjectId).map(item => item.name)]
    if (systemStore.setting.homeOrigin === true) {
      origins.push(
        ...$.onlineOrigins(subjectId).map(item => (typeof item === 'object' ? item.name : item))
      )
    }

    // 构建操作菜单数据
    const buildMenuData = () => {
      const data: string[] = [...origins]

      // 添加置顶/取消置顶操作
      data.push(isPinned ? TEXT_UNPIN : TEXT_PIN)

      // 动画类条目特有操作
      if (isAnime) {
        data.push(TEXT_EXPAND_ALL, TEXT_COLLAPSE_ALL)

        // 添加提醒功能, 条目非 SP 章节有未播才显示此选项
        const hasUnairedEpisodes = subject?.eps?.some(
          item => item.type === 0 && item.status === 'NA'
        )
        if (hasUnairedEpisodes) data.push(TEXT_ADD_REMINDER)

        // 导出日程功能
        if (systemStore.setting.exportICS && subject?.eps?.length) data.push(TEXT_EXPORT_SCHEDULE)
      }

      return data
    }
    const menuData = buildMenuData()
    const hasOrigins = origins.length > 1

    return (
      <Popover key={subjectId} style={styles.touch} data={menuData} onSelect={handleSelect}>
        <Flex style={styles.btn} justify='center'>
          <Iconfont
            style={styles.icon}
            name={hasOrigins ? 'md-airplay' : 'md-menu'}
            size={hasOrigins ? 17 : 21}
          />
        </Flex>
        <Heatmap right={55} bottom={-7} id='首页.搜索源' />
      </Popover>
    )
  })
}

export default BtnOrigin
