/*
 * @Author: czy0729
 * @Date: 2023-02-13 15:47:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 09:26:00
 */
import React from 'react'
import { Heatmap, Iconfont, Text, Touchable } from '@components'
import { SectionHeader as SectionHeaderComp } from '@_'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function SectionHeader({ title, count }) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <Touchable
      style={stl(styles.section, title === '在看' && _.mt.sm)}
      onPress={() => $.onToggleSection(title)}
    >
      <SectionHeaderComp
        style={styles.sectionHeader}
        type='title'
        size={15}
        right={
          <Iconfont
            style={styles.arrow}
            name={$.state.expand[title] ? 'md-keyboard-arrow-down' : 'md-keyboard-arrow-up'}
          />
        }
      >
        {title}{' '}
        <Text type='sub' size={13} bold lineHeight={15}>
          {count}
        </Text>
      </SectionHeaderComp>
      {title === '在看' && <Heatmap id='空间.展开分组' />}
    </Touchable>
  )
}

export default ob(SectionHeader)
