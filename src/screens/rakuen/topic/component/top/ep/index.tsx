/*
 * @Author: czy0729
 * @Date: 2021-10-05 15:14:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 10:15:36
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, subjectStore, useStore } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { InferArray } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Ep() {
  const { $, navigation } = useStore<Ctx>()
  if (!$.groupHref?.includes('/subject/')) return null

  const subjectId = Number($.groupHref.replace('/subject/', ''))
  const { eps } = subjectStore.subject(subjectId)
  if (!eps?.length) return null

  let _eps = []
  if (eps.length >= 1000) {
    _eps = [...eps, ...subjectStore.epV2(subjectId).list].filter(item => item.type === 0)
  } else {
    _eps = eps.filter(item => item.type === 0)
  }

  const index = _eps.findIndex(item => item.url?.includes($.topicId))
  if (index === -1) return null

  type Ep = InferArray<typeof eps>
  const styles = memoStyles()
  let prev: Ep
  let next: Ep
  if (index - 1 >= 0) prev = _eps[index - 1]
  if (index + 1 <= _eps.length - 1) next = _eps[index + 1]
  if (!(prev || next)) return null

  const onPress = (item: Ep) => {
    navigation.replace('Topic', {
      topicId: `ep/${item.url?.split('/ep/')[1]}`,
      _title: `${item.type === 1 ? 'sp' : 'ep'}${item.sort}.${cnjp(item.name_cn, item.name)}`
    })
  }

  return (
    <Flex style={styles.container}>
      <Flex.Item>
        {prev && (
          <Touchable style={styles.item} animate onPress={() => onPress(prev)}>
            <Flex>
              <Iconfont
                style={styles.left}
                name='md-navigate-before'
                size={18}
                color={_.colorDesc}
              />
              <Text size={16} bold>
                {prev.type === 1 ? 'sp' : 'ep'}
                {prev.sort}
              </Text>
            </Flex>
            <Text style={_.mt.xs} size={12} type='sub' numberOfLines={1}>
              {HTMLDecode(cnjp(prev.name_cn, prev.name))}
            </Text>
          </Touchable>
        )}
      </Flex.Item>
      <Flex.Item style={_.ml.md}>
        {next && (
          <Touchable style={styles.item} animate onPress={() => onPress(next)}>
            <Flex justify='end'>
              <Text size={16} bold align='right'>
                {next.type === 1 ? 'sp' : 'ep'}
                {next.sort}
              </Text>
              <Iconfont
                style={styles.right}
                name='md-navigate-next'
                size={18}
                color={_.colorDesc}
              />
            </Flex>
            <Text style={_.mt.xs} size={12} type='sub' align='right' numberOfLines={1}>
              {HTMLDecode(cnjp(next.name_cn, next.name))}
            </Text>
          </Touchable>
        )}
      </Flex.Item>
    </Flex>
  )
}

export default ob(Ep, COMPONENT)
