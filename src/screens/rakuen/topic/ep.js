/*
 * @Author: czy0729
 * @Date: 2021-10-05 15:14:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 14:17:19
 */
import React from 'react'
import { Flex, Touchable, Text, Iconfont } from '@components'
import { _, subjectStore } from '@stores'
import { obc } from '@utils/decorators'
import { cnjp } from '@utils/app'
import { HTMLDecode } from '@utils/html'

function Ep(props, { $, navigation }) {
  const styles = memoStyles()
  if (!$.groupHref.includes('/subject/')) return null

  const subjectId = Number($.groupHref.replace('/subject/', ''))
  const { eps } = subjectStore.subject(subjectId)
  if (!eps?.length) return null

  const _eps = eps.filter(item => item.type === 0)
  const index = _eps.findIndex(item => item.url.includes($.topicId))
  if (index === -1) return null

  let prev
  let next
  if (index - 1 >= 0) prev = _eps[index - 1]
  if (index + 1 <= _eps.length - 1) next = _eps[index + 1]
  if (!(prev || next)) return null

  const onPress = item => {
    navigation.replace('Topic', {
      topicId: `ep/${item.url.split('/ep/')[1]}`,
      _title: `${item.type === 1 ? 'sp' : 'ep'}${item.sort}.${cnjp(
        item.name_cn,
        item.name
      )}`
    })
  }
  return (
    <Flex style={[_.container.inner, _.mr.xs]}>
      <Flex.Item>
        {prev && (
          <Touchable style={styles.item} onPress={() => onPress(prev)}>
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
          <Touchable style={styles.item} onPress={() => onPress(next)}>
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

export default obc(Ep)

const memoStyles = _.memoStyles(() => ({
  item: {
    paddingTop: _.sm,
    paddingBottom: _.sm + 4,
    paddingHorizontal: _.md,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm
  },
  left: {
    marginTop: 2,
    marginLeft: -2
  },
  right: {
    marginTop: 2,
    marginRight: -2
  }
}))
