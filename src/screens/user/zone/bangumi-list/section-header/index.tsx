/*
 * @Author: czy0729
 * @Date: 2023-02-13 15:47:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-13 16:06:56
 */
import React from 'react'
import { Touchable, Text, Iconfont, Heatmap } from '@components'
import { SectionHeader as SectionHeaderComp } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { memoStyles } from './styles'

function SectionHeader({ title, count }, { $ }: Ctx) {
  const styles = memoStyles()
  const { expand } = $.state
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
            name={expand[title] ? 'md-keyboard-arrow-down' : 'md-keyboard-arrow-up'}
          />
        }
      >
        {title}{' '}
        <Text type='sub' size={12} bold lineHeight={15}>
          {count}{' '}
        </Text>
      </SectionHeaderComp>
      {title === '在看' && <Heatmap id='空间.展开分组' />}
    </Touchable>
  )
}

export default obc(SectionHeader)
