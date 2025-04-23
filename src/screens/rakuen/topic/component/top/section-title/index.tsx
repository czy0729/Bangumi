/*
 * @Author: czy0729
 * @Date: 2019-07-28 02:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 17:18:58
 */
import React from 'react'
import { Heatmap, Text } from '@components'
import { IconReverse, SectionTitle as SectionTitleComp } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import Segment from '../../segment'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SectionTitle() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { list = [] } = $.comments
  let commentsCount = 0
  list.forEach(item => {
    commentsCount += 1
    if (item.sub) commentsCount += item.sub.length
  })

  return (
    <SectionTitleComp
      style={styles.title}
      right={
        <>
          <Segment />
          <IconReverse
            style={$.state.reverse ? styles.reverse : undefined}
            iconStyle={styles.reverseIcon}
            color={$.state.reverse ? _.colorMain : _.colorIcon}
            size={18}
            onPress={$.toggleReverseComments}
          >
            <Heatmap right={10} bottom={29} id='帖子.吐槽倒序' />
          </IconReverse>
        </>
      }
    >
      吐槽{' '}
      {!!commentsCount && (
        <Text size={12} type='sub' lineHeight={24}>
          {commentsCount}
        </Text>
      )}
    </SectionTitleComp>
  )
}

export default ob(SectionTitle, COMPONENT)
