/*
 * @Author: czy0729
 * @Date: 2019-05-01 20:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-02 14:30:32
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import {
  HeaderPlaceholder,
  Flex,
  Image,
  Text,
  RenderHtml,
  Divider
} from '@components'
import { Avatar, SectionTitle, IconReverse } from '@screens/_'
import { simpleTime } from '@utils'
import { findBangumiCn, appNavigate } from '@utils/app'
import { HOST, IOS } from '@constants'
import _ from '@styles'

const Top = (props, { $, navigation }) => {
  const {
    title,
    groupThumb,
    group,
    groupHref,
    time,
    avatar,
    userName,
    userId,
    userSign,
    message
  } = $.topic
  const { _list = [], _reverse } = $.comments
  const { _title, _replies, _group, _time } = $.params

  // ep带上章节详情
  const html = $.isEp ? $.epFormHTML : message

  // 人物这里不显示详情, 所以要把小组的相关信息替换成人物信息, 跳转到人物页面查看
  let groupName = group || _group
  let groupPress = () =>
    appNavigate(groupHref, navigation, {
      _jp: group
    })
  if ($.isMono) {
    groupName = title || _title
    groupPress = () => appNavigate(`${HOST}/${$.monoId}`, navigation)
  }
  return (
    <>
      {!IOS && <HeaderPlaceholder />}
      <View style={_.container.inner}>
        <Text type='title' size={20} bold>
          {title || _title}
          {!!_replies && (
            <Text type='main' size={12}>
              {' '}
              {_replies}
            </Text>
          )}
        </Text>
        <Flex style={_.mt.sm}>
          {!!groupThumb && (
            <Image
              style={_.mr.sm}
              size={28}
              src={groupThumb}
              radius
              border={_.colorBorder}
              onPress={groupPress}
            />
          )}
          <Text>
            <Text size={13} underline numberOfLines={1} onPress={groupPress}>
              {findBangumiCn(groupName)}
            </Text>
            {!!time && (
              <>
                <Text style={_.ml.sm} type='sub' size={13}>
                  {' '}
                  /{' '}
                </Text>
                <Text type='sub' size={13}>
                  {simpleTime(time || _time)}
                </Text>
              </>
            )}
          </Text>
        </Flex>
        {!!avatar && (
          <Flex style={_.mt.md}>
            <Avatar
              navigation={navigation}
              size={40}
              src={avatar}
              userId={userId}
            />
            <Flex.Item style={_.ml.sm}>
              <Text numberOfLines={2}>
                {userName}
                <Text type='sub'> @{userId}</Text>
              </Text>
              {!!userSign && (
                <Text style={_.mt.xs} type='sub' size={12}>
                  {userSign}
                </Text>
              )}
            </Flex.Item>
          </Flex>
        )}
        <View style={styles.html}>
          {!!html && (
            <RenderHtml
              style={_.mt.lg}
              html={html}
              onLinkPress={href => appNavigate(href, navigation)}
            />
          )}
        </View>
      </View>
      <Divider />
      <SectionTitle
        style={[styles.title, _.mt.lg, _.mb.md]}
        right={
          <IconReverse
            style={styles.sort}
            color={_reverse ? _.colorMain : _.colorIcon}
            onPress={$.toggleReverseComments}
          />
        }
      >
        吐槽箱{' '}
        {_list.length != 0 && (
          <Text size={12} type='sub'>
            ({_list.length}
            {_list.length == 100 && '+'})
          </Text>
        )}
      </SectionTitle>
    </>
  )
}

Top.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Top)

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: _.wind
  },
  html: {
    minHeight: 240
  },
  sort: {
    marginRight: -_.sm
  }
})
