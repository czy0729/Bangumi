/*
 * @Author: czy0729
 * @Date: 2019-03-31 11:21:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-05 20:52:54
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { WebBrowser } from 'expo'
import { Flex } from '@ant-design/react-native'
import { Image, Button, Loading } from '@components'
import { APP_ID, OAUTH_URL, OAUTH_REDIRECT_URL } from '@constants'
import { urlStringify } from '@utils'
import { userStore } from '@stores'
import _, { colorMain } from '@styles'

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    loading: false
  }

  onLogin = async () => {
    const data = await WebBrowser.openAuthSessionAsync(
      `${OAUTH_URL}?${urlStringify({
        response_type: 'code',
        client_id: APP_ID,
        redirect_uri: OAUTH_REDIRECT_URL
      })}`
    )
    if (data.type === 'success') {
      const code = data.url.replace(`${OAUTH_REDIRECT_URL}?code=`, '')
      if (code) {
        this.setState({
          loading: true
        })
        await userStore.fetchAccessToken(code)

        const { navigation } = this.props
        navigation.popToTop()
      }
    }
  }

  onTour = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  render() {
    const { loading } = this.state
    return (
      <View style={[_.container.column, styles.gray]}>
        <Image
          style={styles.gray}
          width={160}
          height={128}
          src={require('@assets/screens/login/login.png')}
        />
        {loading ? (
          <Flex style={[styles.loading, _.mt.md]} justify='center'>
            <Loading.Raw color={colorMain} />
          </Flex>
        ) : (
          <View style={[styles.bottomContainer, _.mt.md]}>
            <Button type='main' shadow onPress={this.onLogin}>
              登录
            </Button>
            <Button style={_.mt.md} type='plain' shadow onPress={this.onTour}>
              游客访问
            </Button>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    width: 200,
    height: 200
  },
  loading: {
    width: 200,
    height: 64
  },
  gray: {
    backgroundColor: 'rgb(251, 251, 251)'
  }
})
