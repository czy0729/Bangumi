/*
 * @Author: czy0729
 * @Date: 2022-02-27 16:26:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 02:43:08
 */
import React from 'react'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import { _, systemStore, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { getHashSubjectOTA, getHashAvatarOTA, getXsbRelationOTA } from '@constants'
import hashSubject from '@assets/json/hash/subject.min.json'
import hashAvatar from '@assets/json/hash/avatar.min.json'
import Block from './block'

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
