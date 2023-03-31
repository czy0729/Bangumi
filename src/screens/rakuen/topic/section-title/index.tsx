/*
 * @Author: czy0729
 * @Date: 2019-07-28 02:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-31 07:28:17
 */
import React from 'react'
import { Text, Heatmap } from '@components'
import { SectionTitle as CompSectionTitle, IconReverse } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Segment from '../segment'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function SectionTitle(props, { $ }: Ctx) {
  global.rerender('Topic.SectionTitle')

  const styles = memoStyles()
  const { list = [] } = $.comments
  const { reverse } = $.state
  let commentsCount = 0
  list.forEach(item => {
    commentsCount += 1
    if (item.sub) commentsCount += item.sub.length
  })

  return (
    <CompSectionTitle
      style={styles.title}
      right={
        <>
          <Segment />
          <IconReverse
            style={reverse ? styles.reverse : undefined}
            iconStyle={styles.reverseIcon}
            color={reverse ? _.colorMain : _.colorIcon}
            size={18}
            onPress={$.toggleReverseComments}
          >
            <Heatmap right={10} bottom={29} id='帖子.吐槽倒序' />
          </IconReverse>
        </>
      }
    >
      吐槽{' '}
      {commentsCount !== 0 && (
        <Text size={12} type='sub' lineHeight={24}>
          {commentsCount}
        </Text>
      )}
    </CompSectionTitle>
  )
}

export default obc(SectionTitle)
