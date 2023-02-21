/*
 * @Author: czy0729
 * @Date: 2022-04-01 03:05:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-22 02:56:52
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Iconfont, Text, Loading } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { ACTIONS_SORT, ACTIONS_SMB } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Top(props, { $, navigation }: Ctx) {
  const smb = $.current?.smb
  if (!smb) return null

  const styles = memoStyles()
  const { tags, loading, more } = $.state
  const { name, ip, port, sharedFolder } = smb
  return (
    <>
      <Flex style={styles.container}>
        <Flex.Item>
          <Popover data={$.smbs.map(item => item.name)} onSelect={$.onSwitch}>
            <Flex>
              <Text size={18} bold>
                {name || ip}
              </Text>
              <Iconfont name='md-arrow-drop-down' color={_.colorDesc} />
            </Flex>
          </Popover>
          <Text size={12} type='sub' bold lineHeight={18} numberOfLines={2}>
            {ip}
            {!!port && `:${port}`}
            {!!sharedFolder && `/${sharedFolder}`}
          </Text>
        </Flex.Item>
        {!!$.list.length && (
          <Popover style={styles.popover} data={ACTIONS_SORT} onSelect={$.onSelectSort}>
            <Iconfont name='md-sort' color={_.colorDesc} />
          </Popover>
        )}
        <Popover
          style={[styles.popover, styles.more]}
          data={ACTIONS_SMB}
          onSelect={title => $.onSelectSMB(title, navigation)}
        >
          <Iconfont name='md-more-vert' color={_.colorDesc} />
        </Popover>
      </Flex>
      <Flex style={styles.tags} wrap='wrap'>
        {$.ACTIONS_TAGS.filter(item =>
          more ? true : $.tagsCount[item] >= 10 || tags.includes(item)
        ).map(item => {
          const isActive = tags.includes(item)
          return (
            !!$.tagsCount[item] && (
              <Touchable
                key={item}
                style={styles.touch}
                onPress={() => $.onSelectTag(item.split(' ')?.[0])}
              >
                <Text
                  style={styles.tag}
                  type={isActive ? 'main' : 'title'}
                  size={11}
                  bold
                >
                  {item}
                  <Text type={isActive ? 'main' : 'sub'} size={10} lineHeight={11} bold>
                    {' '}
                    {$.tagsCount[item]}
                  </Text>
                </Text>
              </Touchable>
            )
          )
        })}
        <Touchable style={styles.touch} onPress={$.onToggleTags}>
          <Text style={styles.tagMore} type='title' size={11} bold>
            {more ? '收起' : '展开'}
          </Text>
        </Touchable>
      </Flex>
      {!!loading && (
        <Flex style={_.mb.sm} justify='center'>
          <View style={styles.loading}>
            <Loading.Raw size='small' color={_.colorSub} />
          </View>
          <Text style={_.ml.sm} size={12} type='sub'>
            正在刷新条目数据 {loading}
          </Text>
        </Flex>
      )}
    </>
  )
}

export default obc(Top)
