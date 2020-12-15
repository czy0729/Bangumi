/*
 * @Author: czy0729
 * @Date: 2019-07-28 02:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-16 00:53:40
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text, SegmentedControl, Heatmap } from '@components'
import { SectionTitle as CompSectionTitle, IconReverse } from '@screens/_'
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

  const segmentedControlDS = ['全部']
  if (hasLogin && $.commentMeCount) {
    segmentedControlDS.push(`我 ${$.commentMeCount}`)
  }
  if (hasLogin && $.commentFriendsCount) {
    segmentedControlDS.push(`好友 ${$.commentFriendsCount}`)
  }

  let selectedIndex = 0
  if (segmentedControlDS.length > 1) {
    if (filterMe && segmentedControlDS.find(item => item.includes('我'))) {
      selectedIndex = 1
    } else if (filterFriends) {
      selectedIndex = segmentedControlDS.length - 1
    }
  }

  return (
    <CompSectionTitle
      style={styles.title}
      right={
        <>
          {segmentedControlDS.length > 1 && (
            <View>
              <SegmentedControl
                style={[
                  styles.segmentedControl,
                  {
                    width: segmentedControlDS.length * 56
                  }
                ]}
                size={11}
                values={segmentedControlDS}
                selectedIndex={selectedIndex}
                onValueChange={title => {
                  if (
                    (title.includes('我') && !filterMe) ||
                    (title === '全部' && filterMe)
                  ) {
                    $.toggleFilterMe()
                    return
                  }

                  if (
                    (title.includes('好友') && !filterFriends) ||
                    (title === '全部' && filterFriends)
                  ) {
                    $.toggleFilterFriends()
                  }
                }}
              />
              <Heatmap right={74} bottom={24} id='帖子.好友相关' />
              <Heatmap right={24} bottom={24} id='帖子.与我相关' />
            </View>
          )}
          <IconReverse
            style={styles.sort}
            color={reverse ? _.colorMain : _.colorIcon}
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
  },
  segmentedControl: {
    height: 22
  }
})
