/*
 * @Author: czy0729
 * @Date: 2019-07-28 02:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:28:27
 */
import React from 'react'
import { Text } from '@components'
import { SectionTitle as SectionTitleComp } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
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
    <SectionTitleComp style={styles.title}>
      吐槽{' '}
      {commentsCount !== 0 && (
        <Text size={12} type='sub' lineHeight={24}>
          {commentsCount}
        </Text>
      )}
    </SectionTitleComp>
  )
}

export default ob(SectionTitle, COMPONENT)
