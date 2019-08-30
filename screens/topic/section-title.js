/*
 * @Author: czy0729
 * @Date: 2019-07-28 02:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-31 01:32:58
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text } from '@components'
import {
  SectionTitle as CompSectionTitle,
  IconTouchable,
  IconReverse
} from '@screens/_'
import _ from '@styles'

function SectionTitle(props, { $ }) {
  const { list = [] } = $.comments
  const { filterMe, filterFriends, reverse } = $.state
  const hasLogin = !!$.myId
  let commentsCount = 0
  list.forEach(item => {
    commentsCount += 1
    if (item.sub) {
      commentsCount += item.sub.length
    }
  })

  return (
    <CompSectionTitle
      style={[styles.title, _.mt.lg, _.mb.md]}
      right={
        <>
          {hasLogin && (
            <IconTouchable
              name='me'
              color={filterMe ? _.colorMain : _.colorIcon}
              onPress={$.toggleFilterMe}
            />
          )}
          {hasLogin && (
            <IconTouchable
              style={_.ml.sm}
              name='friends'
              color={filterFriends ? _.colorMain : _.colorIcon}
              onPress={$.toggleFilterFriends}
            />
          )}
          <IconReverse
            style={[styles.sort, _.ml.xs]}
            color={reverse ? _.colorMain : _.colorIcon}
            onPress={$.toggleReverseComments}
          />
        </>
      }
    >
      吐槽箱{' '}
      {commentsCount !== 0 && (
        <Text size={12} type='sub' lineHeight={24}>
          ({commentsCount})
        </Text>
      )}
    </CompSectionTitle>
  )
}

SectionTitle.contextTypes = {
  $: PropTypes.object
}

export default observer(SectionTitle)

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: _.wind
  },
  sort: {
    marginRight: -_.sm
  }
})
