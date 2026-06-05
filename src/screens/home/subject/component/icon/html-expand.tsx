/*
 * @Author: czy0729
 * @Date: 2026-06-05 17:31:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-05 21:59:27
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { systemStore } from '@stores'
import { feedback, stl } from '@utils'
import { withSplit } from '@constants'
import { styles } from './styles'

import type { WithViewStyles } from '@types'

function IconHtmlExpand({
  style,
  showPromoteAlias
}: WithViewStyles<{
  showPromoteAlias?: boolean
}>) {
  const { subjectPromoteAlias, subjectHtmlExpand } = systemStore.setting

  const memoData = useMemo(
    () =>
      [
        showPromoteAlias ? `别名提前${withSplit(subjectPromoteAlias ? '开' : '关')}` : '',
        `新页面展开${withSplit(!subjectHtmlExpand ? '开' : '关')}`
      ].filter(Boolean),
    [showPromoteAlias, subjectPromoteAlias, subjectHtmlExpand]
  )

  const handleSelect = useCallback((title: string) => {
    if (title.includes('别名提前')) {
      systemStore.switchSetting('subjectPromoteAlias')
      feedback(true)
      return
    }

    if (title.includes('新页面展开')) {
      systemStore.switchSetting('subjectHtmlExpand')
      feedback(true)
    }
  }, [])

  return (
    <Flex style={stl(styles.fixed, style)}>
      <Popover style={styles.touch} data={memoData} onSelect={handleSelect}>
        <Flex style={styles.btn}>
          <Iconfont name='icon-setting' size={19} />
        </Flex>
      </Popover>
    </Flex>
  )
}

export default observer(IconHtmlExpand)
