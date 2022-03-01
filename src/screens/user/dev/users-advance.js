/*
 * @Author: czy0729
 * @Date: 2022-03-01 12:00:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-01 13:37:55
 */
import React, { useState, useCallback } from 'react'
import { ScrollView, Text, Touchable } from '@components'
import { ItemSetting, ItemFriends } from '@_'
import { _, usersStore } from '@stores'
import { getTimestamp, asc, desc } from '@utils'
import { useObserver } from '@utils/hooks'
import { queue } from '@utils/fetch'
import { info } from '@utils/ui'
import { read } from './db'

function UsersAdvance(props, { navigation }) {
  const [show, setShow] = useState(false)
  const [list, setList] = useState([])

  const onSubmit = useCallback(async () => {
    setShow(true)

    const { content } = await read({
      path: 'advance.json'
    })
    const data = JSON.parse(content)
    const uids = Object.keys(data)
    setList(
      uids.sort((a, b) =>
        sortByRecent(usersStore.users(a).recent, usersStore.users(b).recent)
      )
    )

    await queue(
      uids.map(
        userId => () =>
          usersStore.fetchUsers({
            userId
          })
      )
    )
    info('update users done')

    setList(
      uids.sort((a, b) =>
        sortByRecent(usersStore.users(a).recent, usersStore.users(b).recent)
      )
    )
  }, [])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <ItemSetting
          hd='Users Advance'
          ft={
            <Touchable onPress={onSubmit}>
              <Text>查看</Text>
            </Touchable>
          }
          withoutFeedback
        />
        {show && (
          <ScrollView style={styles.scrollView}>
            {list.map(item => (
              <ItemFriends
                key={item}
                navigation={navigation}
                {...usersStore.users(item)}
              />
            ))}
          </ScrollView>
        )}
      </>
    )
  })
}

export default UsersAdvance

const memoStyles = _.memoStyles(() => ({
  scrollView: {
    height: 342,
    marginTop: _.sm,
    marginHorizontal: _.wind,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))

function sortByRecent(recentA, recentB) {
  if (recentA.includes('-') && recentB.includes('-'))
    return desc(getTimestamp(recentA), getTimestamp(recentB))

  if (recentA.includes('-') && !recentB.includes('-')) return 1
  if (!recentA.includes('-') && recentB.includes('-')) return -1

  return asc(getRecentTimestamp(recentA), getRecentTimestamp(recentB))
}

function getRecentTimestamp(recent) {
  try {
    let timestamp = 0
    const d = recent.match(/\d+d/g)
    if (d) {
      timestamp += parseInt(d[0]) * 24 * 60 * 60
    }

    const h = recent.match(/\d+h/g)
    if (h) {
      timestamp += parseInt(h[0]) * 60 * 60
    }

    const m = recent.match(/\d+m/g)
    if (m) {
      timestamp += parseInt(m[0]) * 60
    }

    const s = recent.match(/\d+s/g)
    if (s) {
      timestamp += parseInt(s[0])
    }

    return timestamp
  } catch (error) {
    return getTimestamp()
  }
}
