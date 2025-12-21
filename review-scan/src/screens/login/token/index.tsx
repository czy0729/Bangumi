/*
 * @Author: czy0729
 * @Date: 2023-11-27 16:28:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 17:03:10
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import {
  Avatar,
  Component,
  Flex,
  Header,
  Iconfont,
  Input,
  Mesume,
  Page,
  Text,
  Touchable
} from '@components'
import { _, collectionStore, userStore } from '@stores'
import { getTimestamp, info, open } from '@utils'
import { fetchMeV0 } from '@utils/fetch.v0'
import { useMount } from '@utils/hooks'
import { styles } from './styles'

/** SPA 网页版更新授权 */
const LoginToken = () => {
  const [token, setToken] = useState('')

  const handleUpdate = useCallback(async () => {
    if (!token) {
      // 清除登录状态
      info('已清除鉴权信息')

      userStore.updateAccessToken({
        access_token: '',
        expires_in: 604800,
        token_type: 'Bearer',
        scope: null,
        user_id: 0,
        refresh_token: ''
      })
      return
    }

    // 记录之前的鉴权信息, 以用于更新失败后恢复
    const currentAccessToken = {
      ...userStore.accessToken
    }

    // 获取的鉴权
    const accessToken = {
      access_token: token,
      expires_in: 604800,
      token_type: 'Bearer',
      scope: null,
      user_id: 0,
      refresh_token: ''
    }
    userStore.updateAccessToken(accessToken)

    // 尝试请求登录用户信息
    const userInfo: any = await fetchMeV0()
    if (userInfo?.id && userInfo?.username) {
      info('更新成功')

      userStore.updateUserInfo({
        ...userInfo,
        _loaded: getTimestamp()
      })
      userStore.updateAccessToken({
        ...accessToken,
        user_id: userInfo.id
      })
      collectionStore.clearState('_collectionStatusLastFetchMS')
      return
    }

    info('更新失败，请确保用户令牌可用')

    userStore.updateAccessToken(currentAccessToken)
    setToken(currentAccessToken.access_token)
  }, [token])

  useMount(() => {
    setToken(userStore.accessToken.access_token)
  })

  return useObserver(() => {
    const { avatar, nickname, username } = userStore.userInfo
    return (
      <Component id='screen-login-token'>
        <Header
          title=' '
          domTitle='授权'
          headerRight={() => (
            <Touchable
              style={_.mr.sm}
              onPress={() => {
                open('https://bgm.tv/group/topic/370315')
              }}
            >
              <Text>如何获取</Text>
            </Touchable>
          )}
        />
        <Page>
          <Flex style={styles.container} direction='column' justify='center'>
            {avatar?.large && nickname ? (
              <>
                <Avatar src={avatar.large} size={96} round />
                <Text style={_.mt.sm} size={16} bold>
                  {nickname} @{username}
                </Text>
              </>
            ) : (
              <Mesume />
            )}
            <View style={styles.item}>
              <Input
                style={styles.input}
                placeholder='用户令牌，必填'
                value={token}
                onChangeText={setToken}
              />
            </View>
            <Touchable style={_.mt.md} onPress={handleUpdate}>
              <Flex>
                <Text type='sub' size={16} bold>
                  更新
                </Text>
                <Flex style={styles.arrow}>
                  <Iconfont name='md-arrow-forward' size={14} />
                </Flex>
              </Flex>
            </Touchable>
          </Flex>
        </Page>
      </Component>
    )
  })
}

export default LoginToken
