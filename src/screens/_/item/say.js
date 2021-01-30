/*
 * @Author: czy0729
 * @Date: 2020-11-11 11:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 23:05:25
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Flex, Text, RenderHtml } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'
import { EVENT } from '@constants'
import Avatar from '../base/avatar'
import Name from '../base/name'

function ItemSay(
  {
    event,
    index,
    position,
    avatar,
    showName,
    name,
    text,
    id,
    format,
    onLongPress
  },
  { navigation }
) {
  const styles = memoStyles()
  if (position === 'right') {
    return (
      <Flex key={index} style={showName ? _.mt.md : _.mt.sm} align='start'>
        <Flex.Item style={styles.contentRight}>
          <Flex direction='column' align='end'>
            {showName && (
              <Text style={_.mr.sm} size={11} type='title' bold>
                {name}
              </Text>
            )}
            <View style={[styles.text, styles.textActive, _.mt.xs]}>
              <RenderHtml
                baseFontStyle={styles.baseFontStyleRight}
                linkStyle={styles.linkStyleRight}
                html={format ? getBgmHtml(text) : text}
                onLinkPress={href => appNavigate(href, navigation, {}, event)}
              />
            </View>
          </Flex>
        </Flex.Item>
        <Flex style={styles.avatarWrapRight} justify='center'>
          <Avatar
            style={styles.avatar}
            navigation={navigation}
            src={avatar}
            size={34}
            userId={id}
            name={name}
            border={0}
            round
            event={event}
          />
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex key={index} style={showName ? _.mt.md : _.mt.sm} align='start'>
      <Flex style={styles.avatarWrapLeft} justify='center'>
        <Avatar
          style={styles.avatar}
          navigation={navigation}
          src={avatar}
          size={34}
          userId={id}
          name={name}
          round
          border={0}
          event={event}
          onLongPress={onLongPress}
        />
      </Flex>
      <Flex.Item style={styles.contentLeft}>
        <Flex direction='column' align='start'>
          {showName && (
            <Name
              style={_.ml.sm}
              userId={id}
              showFriend
              size={11}
              type='title'
              bold
            >
              {name}
            </Name>
          )}
          <View style={[styles.text, _.mt.xs]}>
            <RenderHtml
              baseFontStyle={styles.baseFontStyle}
              html={format ? getBgmHtml(text) : text}
              onLinkPress={href => appNavigate(href, navigation, {}, event)}
            />
          </View>
        </Flex>
      </Flex.Item>
    </Flex>
  )
}

ItemSay.defaultProps = {
  event: EVENT,
  position: 'left',
  format: true,
  onLongPress: Function.prototype
}

ItemSay.contextTypes = {
  navigation: PropTypes.object
}

export default observer(ItemSay)

const memoStyles = _.memoStyles(_ => ({
  avatarWrapLeft: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    bottom: 0,
    width: 40,
    height: 40,
    backgroundColor: _.colorBg,
    borderRadius: 20
  },
  avatarWrapRight: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    backgroundColor: _.colorBg,
    borderRadius: 20
  },
  contentLeft: {
    maxWidth: '88%',
    marginBottom: 24,
    marginLeft: 24
  },
  contentRight: {
    maxWidth: '88%',
    marginLeft: '12%',
    marginBottom: 24,
    marginRight: 24
  },
  text: {
    padding: 12,
    marginRight: 24,
    backgroundColor: _.colorPlain,
    borderRadius: 16
  },
  textActive: {
    marginRight: 0,
    marginLeft: 24,
    backgroundColor: _.colorPrimary,
    borderTopLeftRadius: 16
  },
  baseFontStyle: {
    fontSize: 14 + _.fontSizeAdjust,
    lineHeight: 22
  },
  baseFontStyleRight: {
    fontSize: 14 + _.fontSizeAdjust,
    lineHeight: 22,
    color: _.__colorPlain__
  },
  linkStyleRight: {
    color: _.__colorPlain__,
    textDecorationColor: _.__colorPlain__
  }
}))

function getBgmHtml(html = '') {
  let _html = html
  const matchs = _html.match(/\(bgm\d+\)/g) || []
  if (matchs.length) {
    matchs.forEach(item => {
      const index = parseInt(item.match(/\d+/g)[0])

      // 防止2连同一个bgm表情, 替换不了后面的
      _html = _html.replace(item, `<img smileid alt="(bgm~~~${index})" />`)
    })
  }

  return _html.replace(/~~~/g, '')
}
