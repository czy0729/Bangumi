/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 14:36:01
 */
import React from 'react'
import { Touchable, Iconfont, Flex } from '@components'
import { _ } from '@stores'
import ob from '../ob'

function IconBack({ style, navigation, color }) {
  return (
    <Touchable style={[styles.touch, style]} onPress={navigation.goBack}>
      <Flex style={styles.container} justify='center'>
        <Iconfont name='md-arrow-back' color={color} />
      </Flex>
    </Touchable>
  )
}

export default ob(IconBack, {
  color: _.colorPlain
})

const styles = _.create({
  touch: {
    marginLeft: _.ios(0, _.xs),
    borderRadius: 20,
    overflow: 'hidden'
  },
  container: {
    width: 40,
    height: 40
  }
})
