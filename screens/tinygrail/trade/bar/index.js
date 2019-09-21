/*
 * @Author: czy0729
 * @Date: 2019-09-21 00:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-21 00:15:00
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Flex } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorContainer, colorBorder } from '../../styles'
import { m15, h1, h4, h12, d1, w1, month1 } from '../store'
import BtnChange from './btn-change'

function Bar({ style }) {
  return (
    <Flex style={[styles.bar, style]} justify='around'>
      <BtnChange value={m15} text='15分钟' />
      <BtnChange value={h1} text='1小时' />
      <BtnChange value={h4} text='4小时' />
      <BtnChange value={h12} text='12小时' />
      <BtnChange value={d1} text='1日' />
      <BtnChange value={w1} text='1周' />
      <BtnChange value={month1} text='1月' />
    </Flex>
  )
}

export default observer(Bar)

const styles = StyleSheet.create({
  bar: {
    paddingVertical: _.sm,
    paddingLeft: 2,
    backgroundColor: colorContainer,
    borderBottomWidth: 1,
    borderBottomColor: colorBorder
  }
})
