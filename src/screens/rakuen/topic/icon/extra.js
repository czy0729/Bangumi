/*
 * @Author: czy0729
 * @Date: 2021-01-20 12:15:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 15:38:56
 */
import React from 'react'
import { Alert } from 'react-native'
import { Flex, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconExtra(
  { replySub, erase, userName, message, showFixedTextare },
  { $ }
) {
  const data = []
  if (replySub) data.push('回复')
  if (erase) data.push('删除')
  if (!data.length) {
    return null
  }

  return (
    <Popover
      data={data}
      onSelect={title => {
        if (title === '回复') {
          $.showFixedTextarea(userName, replySub, message)
          showFixedTextare()
        } else if (title === '删除') {
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
        }
      }}
    >
      <Flex style={styles.icon}>
        <Iconfont name='extra' color={_.colorSub} size={14} />
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
