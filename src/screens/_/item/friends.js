/*
 * @Author: czy0729
 * @Date: 2019-07-24 13:59:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-07 14:11:16
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Progress } from '@ant-design/react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import Avatar from '../base/avatar'

const wrapWidth = _.window.contentWidth - 144

function ItemFriends({
  navigation,
  avatar,
  userId,
  userName,
  hobby,
  percent,
  recent,
  doing,
  collect,
  wish,
  dropped,
  event,
  onHold
}) {
  const styles = memoStyles()
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        const { id, data = {} } = event
        t(id, {
          to: 'Zone',
          userId,
          ...data
        })

        navigation.push('Zone', {
          userId,
          _name: userName,
          _image: avatar
        })
      }}
    >
      <Flex>
        <Avatar style={styles.image} size={40} name={userName} src={avatar} />
        <Flex.Item style={styles.item}>
          <Flex>
            <Flex.Item>
              <Text numberOfLines={1} bold>
                {userName}
              </Text>
            </Flex.Item>
            <Text style={_.ml.sm} size={12}>
              {recent}
            </Text>
          </Flex>
          <Text style={_.mt.xs} size={10} type='sub'>
            {!!doing && `${doing}在看`}
            {!!collect && `${doing ? ' / ' : ''}${collect}看过`}
            {!!wish && ` / ${wish}想看`}
            {!!onHold && ` / ${onHold}搁置`}
            {!!dropped && ` / ${dropped}抛弃`}
          </Text>
          <Progress
            style={styles.progress}
            barStyle={styles.bar}
            wrapWidth={wrapWidth}
            percent={percent}
          />
        </Flex.Item>
        <Text style={styles.hobby} size={12} type='sub'>
          {hobby || '-'} / {percent || '-'}%
        </Text>
      </Flex>
    </Touchable>
  )
}

ItemFriends.defaultProps = {
  event: EVENT
}

export default observer(ItemFriends)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingBottom: _.md,
    backgroundColor: _.colorPlain
  },
  image: {
    marginTop: _.xs,
    marginLeft: _.wind
  },
  item: {
    paddingTop: _.md,
    paddingRight: _.wind,
    paddingBottom: _.sm + 2,
    marginLeft: _.md
  },
  progress: {
    position: 'absolute',
    right: '24%',
    bottom: 0,
    left: 0,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  bar: {
    backgroundColor: 'transparent',
    borderBottomColor: _.colorPrimary,
    borderBottomWidth: 4,
    borderRadius: 4
  },
  hobby: {
    position: 'absolute',
    right: _.wind - _.sm,
    bottom: 0,
    paddingHorizontal: _.sm,
    marginBottom: -6,
    backgroundColor: _.colorPlain
  }
}))
