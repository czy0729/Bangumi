/*
 * @Author: czy0729
 * @Date: 2019-07-28 02:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 12:19:43
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Heatmap, Text } from '@components'
import { IconReverse, SectionTitle as SectionTitleComp } from '@_'
import { _, useStore } from '@stores'
import Segment from '../../segment'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function SectionTitle() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const { list = [] } = $.comments

  let commentsCount = 0
  list.forEach(item => {
    commentsCount += 1
    if (item.sub) commentsCount += item.sub.length
  })

  const { reverse } = $.state
  const elRight = useMemo(
    () => (
      <>
        <Segment />
        <IconReverse
          style={reverse ? styles.reverse : undefined}
          iconStyle={styles.reverseIcon}
          color={reverse ? _.colorDesc : _.colorIcon}
          size={18}
          onPress={$.toggleReverseComments}
        >
          <Heatmap right={10} bottom={29} id='帖子.吐槽倒序' />
        </IconReverse>
      </>
    ),
    [$, reverse, styles]
  )

  return (
    <SectionTitleComp style={styles.title} right={elRight}>
      吐槽{' '}
      {!!commentsCount && (
        <Text size={12} type='sub' lineHeight={24}>
          {commentsCount}
        </Text>
      )}
    </SectionTitleComp>
  )
}

export default observer(SectionTitle)
