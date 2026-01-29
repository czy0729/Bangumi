/*
 * @Author: czy0729
 * @Date: 2023-02-13 15:47:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 09:26:00
 */
import React, { useCallback, useMemo } from 'react'
import { Heatmap, Iconfont, Text, Touchable } from '@components'
import { SectionHeader as SectionHeaderComp } from '@_'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function SectionHeader({ title, count }) {
  const { $ } = useStore<Ctx>()

  const handlePress = useCallback(() => {
    $.onToggleSection(title)
  }, [$, title])

  return useObserver(() => {
    const styles = memoStyles()

    const expand = $.state.expand[title]
    const elRight = useMemo(
      () => (
        <Iconfont
          style={styles.arrow}
          name={expand ? 'md-keyboard-arrow-down' : 'md-keyboard-arrow-up'}
        />
      ),
      [expand, styles]
    )

    return (
      <Touchable style={stl(styles.section, title === '在看' && _.mt.sm)} onPress={handlePress}>
        <SectionHeaderComp style={styles.sectionHeader} type='title' size={15} right={elRight}>
          {title}{' '}
          <Text type='sub' size={13} bold lineHeight={15}>
            {count}
          </Text>
        </SectionHeaderComp>
        {title === '在看' && <Heatmap id='空间.展开分组' />}
      </Touchable>
    )
  })
}

export default SectionHeader
