/*
 * @Author: czy0729
 * @Date: 2021-01-20 12:15:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 20:44:06
 */
import React from 'react'
import { Alert } from 'react-native'
import { Flex, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _, rakuenStore } from '@stores'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'

function IconExtra(
  { replySub, erase, userId, userName, message, showFixedTextare },
  { $ }
) {
  const data = []
  if (replySub) data.push('回复')
  if (erase) data.push('删除')
  data.push('屏蔽用户')
  return (
    <Popover
      data={data}
      onSelect={title => {
        if (title === '回复') {
          $.showFixedTextarea(userName, replySub, message)
          showFixedTextare()
          return
        }

        if (title === '删除') {
          setTimeout(() => {
            Alert.alert('警告', '确定删除回复?', [
              {
                text: '取消',
                style: 'cancel'
              },
              {
                text: '确定',
                onPress: () => $.doDeleteReply(erase)
              }
            ])
          }, 80)
          return
        }

        if (title === '屏蔽用户') {
          rakuenStore.addBlockUser(`${userName}@${userId}`)
          info(`已屏蔽 ${userName}`)
        }
      }}
    >
      <Flex style={styles.icon}>
        <Iconfont name='md-more-vert' size={16} />
      </Flex>
    </Popover>
  )
}

export default obc(IconExtra)

const styles = _.create({
  icon: {
    paddingVertical: 4,
    paddingLeft: 16,
    paddingRight: 6,
    marginTop: -2
  }
})
