/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:42:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-10 13:56:44
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { date } from '@utils'
import { appNavigate } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { EVENT } from '@constants'
import Avatar from '../base/avatar'

const d = new Date()
const y = String(d.getFullYear()).slice(2, 4)

function ItemArticle({
  navigation,
  style,
  index,
  avatar,
  title,
  summary,
  nickname,
  timestamp,
  replies,
  url,
  event
}) {
  const styles = memoStyles()
  const isFirst = index === 0
  let time = date('y-m-d', timestamp)
  if (time.indexOf(`${y}-`) !== -1) {
    time = time.replace(`${y}-`, '')
  }
  return (
    <Touchable
      style={style}
      onPress={() => appNavigate(url, navigation, {}, event)}
    >
      <Flex align='start'>
        <Avatar style={styles.image} name={nickname} src={avatar} />
        <Flex.Item style={[styles.item, !isFirst && styles.border, _.ml.sm]}>
          <Text size={16}>{HTMLDecode(title)}</Text>
          <Flex style={_.mt.xs}>
            <Text size={13}>{HTMLDecode(nickname)}</Text>
            <Text type='sub' style={_.ml.xs} size={13}>
              / {time} / {replies} 回复
            </Text>
          </Flex>
          {!!summary && (
            <Text style={_.mt.sm} size={15} lineHeight={20} numberOfLines={4}>
              {HTMLDecode(summary.replace(/\r\n\r\n/g, '\r\n'))}
            </Text>
          )}
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

ItemArticle.defaultProps = {
  event: EVENT
}

export default observer(ItemArticle)

const memoStyles = _.memoStyles(_ => ({
  image: {
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
