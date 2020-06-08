/*
 * @Author: czy0729
 * @Date: 2019-07-28 02:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-07 14:25:48
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
import { _ } from '@stores'

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
      style={styles.title}
      right={
        <>
          {hasLogin && !!$.commentMeCount && (
            <IconTouchable
              name='me'
              color={filterMe ? _.colorMain : _.colorIcon}
              count={$.commentMeCount}
              onPress={$.toggleFilterMe}
            />
          )}
          {hasLogin && !!$.commentFriendsCount && (
            <IconTouchable
              style={_.ml.sm}
              name='friends'
              color={filterFriends ? _.colorMain : _.colorIcon}
              count={$.commentFriendsCount}
              onPress={$.toggleFilterFriends}
            />
          )}
          <IconReverse
            style={styles.sort}
            color={reverse ? _.colorMain : _.colorIcon}
            onPress={$.toggleReverseComments}
          />
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

SectionTitle.contextTypes = {
  $: PropTypes.object
}

export default observer(SectionTitle)

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: _.wind,
    marginTop: _.lg,
    marginBottom: _.md
  },
  sort: {
    marginRight: -_.sm,
    marginLeft: _.xs
  }
})
