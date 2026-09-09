/*
 * @Author: czy0729
 * @Date: 2022-03-01 12:00:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:57:54
 */
import { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { ScrollView, Text, Touchable } from '@components'
import { ItemFriends, ItemSetting } from '@_'
import { usersStore } from '@stores'
import { info } from '@utils'
import { queue } from '@utils/fetch'
import { read } from '../../db'
import { sortByRecent } from './utils'
import { memoStyles } from './styles'

function UsersAdvance() {
  const [show, setShow] = useState(false)
  const [list, setList] = useState([])

  const handleSubmit = useCallback(async () => {
    setShow(true)

    const { content } = await read({
      path: 'advance.json'
    })
    const data = JSON.parse(content)
    const uids = Object.keys(data)
    setList(
      uids.sort((a, b) => sortByRecent(usersStore.users(a).recent, usersStore.users(b).recent))
    )

    await queue(uids.map(userId => () => usersStore.fetchUsers(userId)))
    info('update users done')

    setList(
      uids.sort((a, b) => sortByRecent(usersStore.users(a).recent, usersStore.users(b).recent))
    )
  }, [])

  const styles = memoStyles()

  return (
    <>
      <ItemSetting
        hd='Users Advance'
        ft={
          <Touchable onPress={handleSubmit}>
            <Text>查看</Text>
          </Touchable>
        }
        withoutFeedback
      />
      {show && (
        <ScrollView style={styles.scrollView}>
          {list.map(item => (
            <ItemFriends key={item} {...usersStore.users(item)} />
          ))}
        </ScrollView>
      )}
    </>
  )
}

export default observer(UsersAdvance)
