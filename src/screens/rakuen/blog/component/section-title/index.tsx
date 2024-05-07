/*
 * @Author: czy0729
 * @Date: 2019-07-28 02:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 04:40:24
 */
import React from 'react'
import { Text } from '@components'
import { SectionTitle as CompSectionTitle } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SectionTitle(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { list = [] } = $.comments
  let commentsCount = 0
  list.forEach(item => {
    commentsCount += 1
    if (item.sub) commentsCount += item.sub.length
  })

  return (
    <CompSectionTitle style={styles.title}>
      吐槽{' '}
      {commentsCount !== 0 && (
        <Text size={12} type='sub' lineHeight={24}>
          {commentsCount}
        </Text>
      )}
    </CompSectionTitle>
  )
}

export default obc(SectionTitle, COMPONENT)
