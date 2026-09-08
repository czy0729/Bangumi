/*
 * @Author: czy0729
 * @Date: 2019-09-21 00:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 04:09:14
 */
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { d1, h1, h12, h4, m15, month1, w1 } from '../store'
import BtnChange from './btn-change'
import { memoStyles } from './styles'

function Bar() {
  const styles = memoStyles()

  return (
    <Flex style={styles.bar} justify='around'>
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
