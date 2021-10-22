/*
 * @Author: czy0729
 * @Date: 2019-07-28 02:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-22 22:06:31
 */
import React from 'react'
import { Text, Heatmap } from '@components'
import { SectionTitle as CompSectionTitle, IconReverse } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Segment from './segment'

function SectionTitle(props, { $ }) {
  rerender('Topic.SectionTitle')

  const { list = [] } = $.comments
  const { reverse } = $.state
  let commentsCount = 0
  list.forEach(item => {
    commentsCount += 1
    if (item.sub) {
      commentsCount += item.sub.length
    }
  })

  return (
    <CompSectionTitle
      style={styles.title}
      right={
        <>
          <Segment />
          <IconReverse
            style={[
              styles.sort,
              {
                transform: reverse
                  ? [
                      {
                        rotateX: '180deg'
                      }
                    ]
                  : undefined
              }
            ]}
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

const styles = _.create({
  title: {
    paddingHorizontal: _.wind,
    marginTop: _.lg,
    marginBottom: _.md
  },
  sort: {
    marginLeft: _.xs
  }
})
