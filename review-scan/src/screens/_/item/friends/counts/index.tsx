/*
 * @Author: czy0729
 * @Date: 2022-08-07 07:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 08:26:56
 */
import React from 'react'
import { Flex, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function Counts({ wish, collect, doing, onHold, dropped }) {
  return (
    <Flex style={styles.counts}>
      {!!wish && (
        <>
          <Iconfont style={_.mr.xs} name='md-favorite' size={12} color={_.colorSub} />
          <Text style={_.mr.sm} size={11} type='sub'>
            {wish}
          </Text>
        </>
      )}
      {!!doing && (
        <>
          <Iconfont style={_.mr.xs} name='md-visibility' size={14} color={_.colorSub} />
          <Text style={_.mr.sm} size={11} type='sub'>
            {doing}
          </Text>
        </>
      )}
      {!!collect && (
        <>
          <Iconfont style={_.mr.xs} name='md-check' size={14} color={_.colorSub} />
          <Text style={_.mr.sm} size={11} type='sub'>
            {collect}
          </Text>
        </>
      )}
      {!!onHold && (
        <>
          <Iconfont
            style={_.mr.xs}
            name='md-visibility-off'
            size={13}
            color={_.colorSub}
          />
          <Text style={_.mr.sm} size={11} type='sub'>
            {onHold}
          </Text>
        </>
      )}
      {!!dropped && (
        <>
          <Iconfont
            style={_.mr.xs}
            name='md-delete-outline'
            size={14}
            color={_.colorSub}
          />
          <Text size={11} type='sub'>
            {dropped}
          </Text>
        </>
      )}
    </Flex>
  )
}

export default ob(Counts)
