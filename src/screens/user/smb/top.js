/*
 * @Author: czy0729
 * @Date: 2022-04-01 03:05:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-07 02:59:25
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Iconfont, Text, Loading } from '@components'
import { Popover, Tag } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { ACTIONS_SORT, ACTIONS_SMB } from './store'

function Top(props, { $ }) {
  const smb = $.current?.smb
  if (!smb) return null

  const styles = memoStyles()
  const { tags, loading } = $.state
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
          onSelect={$.onSelectSMB}
        >
          <Iconfont name='md-more-vert' color={_.colorDesc} />
        </Popover>
      </Flex>
      <Flex style={styles.tags} wrap='wrap'>
        {$.ACTIONS_TAGS.map(
          item =>
            !!$.tagsCount[item] && (
              <Touchable
                key={item}
                style={styles.touch}
                onPress={() => $.onSelectTag(item.split(' ')?.[0])}
              >
                <Tag
                  style={styles.tag}
                  type={tags.includes(item) ? 'main' : 'title'}
                  value={`${item} ${$.tagsCount[item]}`}
                />
              </Touchable>
            )
        )}
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

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.xs,
    paddingHorizontal: _.wind,
    paddingBottom: _.sm
  },
  popover: {
    padding: _.sm,
    marginLeft: _.sm,
    borderRadius: 20,
    overflow: 'hidden'
  },
  more: {
    marginRight: -9
  },
  tags: {
    paddingBottom: _.md,
    paddingHorizontal: _.wind
  },
  touch: {
    marginRight: _.sm,
    marginBottom: _.sm,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  tag: {
    paddingRight: 4,
    paddingLeft: 4
  },
  loading: {
    marginLeft: -24,
    transform: [
      {
        scale: 0.8
      }
    ]
  }
}))
