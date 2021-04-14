/*
 * @Author: czy0729
 * @Date: 2020-11-30 20:28:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:11:00
 */
import React from 'react'
import { Alert } from 'react-native'
import { Flex, Button } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function Btn(props, { $ }) {
  const styles = memoStyles()
  const ids = $.list.list.filter(item => !!item.icoId).map(item => item.icoId)
  if (!ids.length) {
    return null
  }

  return (
    <Flex style={styles.wrap} justify='center'>
      <Button
        style={styles.btn}
        type='bid'
        onPress={() => {
          Alert.alert(
            '小圣杯助手',
            `对列表中 ${ids.length} 个ICO角色进行注资各5000, 确定?`,
            [
              {
                text: '取消',
                style: 'cancel'
              },
              {
                text: '确定',
                onPress: () => $.batchICO(ids)
              }
            ]
          )
        }}
      >
        一键注资
      </Button>
    </Flex>
  )
}

export default obc(Btn)

const memoStyles = _.memoStyles(_ => ({
  wrap: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: 32,
    left: _.wind
  },
  btn: {
    width: 104,
    borderRadius: 48
  }
}))
