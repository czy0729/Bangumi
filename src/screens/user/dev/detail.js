/*
 * @Author: czy0729
 * @Date: 2022-02-27 16:26:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-01 12:22:53
 */
import React, { useState } from 'react'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import { Touchable, Flex, Text } from '@components'
import { _, systemStore, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { getHashSubjectOTA, getHashAvatarOTA, getXsbRelationOTA } from '@constants/cdn'
import hashSubject from '@constants/json/hash/subject.min.json'
import hashAvatar from '@constants/json/hash/avatar.min.json'

function Detail() {
  return useObserver(() => {
    return (
      <>
        {/* <Block>
          {[
            'ios-star',
            'ios-star-outline',
            'ios-star-half',
            'ios-moon',
            'ios-sunny',
            'md-videogame-asset',
            'md-link'
          ].map(item => (
            <Iconfont key={item} name={item} />
          ))}
        </Block> */}
        <Block
          value={JSON.stringify({
            tourist: 1,
            accessToken: userStore.accessToken,
            userCookie: userStore.userCookie
          })}
        />
        <Block
          title='OTA'
          value={[
            {
              hashSubject: Object.keys(hashSubject).length,
              hashSubjectOTA: Object.keys(getHashSubjectOTA()).length,
              hashAvatar: Object.keys(hashAvatar).length,
              hashAvatarOTA: Object.keys(getHashAvatarOTA()).length,
              xsbRelationOTA: Object.keys(getXsbRelationOTA().data).length
            }
          ]}
        />
        <Block title='CDN' value={[systemStore.state.ota]} />
        <Block title='Window' value={[_.window]} />
        <Block
          title='Login'
          value={[
            {
              accessToken: userStore.accessToken
            },
            {
              userCookie: userStore.userCookie
            },
            {
              setCookie: userStore.setCookie
            }
          ]}
        />
        <Block title='Platform' value={[Platform]} />
        <Block title='Constants' value={[Constants]} />
      </>
    )
  })
}

export default Detail

function Block({ title, value = [], children }) {
  const [open, setOpen] = useState(false)
  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Flex style={[styles.code, _.mt.md]}>
        <Flex.Item>
          <Text size={12} lineHeight={16} selectable>
            {!!title && (
              <Text size={12} lineHeight={16} type='sub'>
                {title}
              </Text>
            )}
            {open && (
              <>
                {typeof value === 'string'
                  ? value
                  : value.map(item => `\n${JSON.stringify(item, null, 2)}`)}
                {children}
              </>
            )}
          </Text>
        </Flex.Item>
        {!open && (
          <Touchable onPress={() => setOpen(true)}>
            <Text>open</Text>
          </Touchable>
        )}
      </Flex>
    )
  })
}

const memoStyles = _.memoStyles(() => ({
  code: {
    paddingVertical: _.space,
    paddingHorizontal: _.md,
    marginHorizontal: _.wind,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
