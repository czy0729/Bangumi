/*
 * @Author: czy0729
 * @Date: 2019-07-28 02:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-06 06:29:52
 */
import React from 'react'
import { Text } from '@components'
import { SectionTitle as CompSectionTitle } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function SectionTitle(props, { $ }) {
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

export default obc(SectionTitle)

const memoStyles = _.memoStyles(() => ({
  title: {
    paddingHorizontal: _.wind,
    marginTop: _.lg,
    marginBottom: _.md
  },
  sort: {
    marginRight: -_.sm,
    marginLeft: _.xs
  }
}))
