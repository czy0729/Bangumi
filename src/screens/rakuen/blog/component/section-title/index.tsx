/*
 * @Author: czy0729
 * @Date: 2019-07-28 02:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 21:37:36
 */
import { observer } from 'mobx-react'
import { Text } from '@components'
import { SectionTitle as SectionTitleComp } from '@_'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function SectionTitle() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { list = [] } = $.comments
  let commentsCount = 0
  list.forEach(item => {
    commentsCount += 1
    if (item.sub) commentsCount += item.sub.length
  })

  return (
    <SectionTitleComp style={styles.title}>
      吐槽{' '}
      {commentsCount !== 0 && (
        <Text type='sub' size={12} lineHeight={24}>
          {commentsCount}
        </Text>
      )}
    </SectionTitleComp>
  )
}

export default observer(SectionTitle)
