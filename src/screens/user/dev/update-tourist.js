/*
 * @Author: czy0729
 * @Date: 2022-02-27 12:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-27 12:52:05
 */
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Input, Iconfont } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { getTimestamp } from '@utils'
import axios from '@utils/thirdParty/axios'
import { HOST } from '@constants'

async function getConfig() {
  const ua =
    'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36'
  const cookie = {}
  let formhash = ''
  let captcha = ''

  axios.defaults.withCredentials = false

  // get formhash
  const { data, headers } = await axios({
    method: 'get',
    url: `${HOST}/login`,
    headers: {
      'User-Agent': ua
    }
  })

  const setCookie = headers?.['set-cookie']?.[0]
  const setCookieKeys = [
    '__cfduid',
    'chii_sid',
    'chii_sec_id',
    'chii_cookietime',
    'chii_auth'
  ]
  setCookieKeys.forEach(item => {
    const reg = new RegExp(`${item}=(.+?);`)
    const match = setCookie.match(reg)
    if (match) cookie[item] = match[1]
  })

  const match = data.match(/<input type="hidden" name="formhash" value="(.+?)">/)
  if (match) formhash = match[1]

  // get captcha
  const cookieString = Object.keys(cookie)
    .map(item => `${item}=${cookie[item]}`)
    .join('; ')
  const { request } = await axios({
    method: 'get',
    url: `${HOST}/signup/captcha?${getTimestamp()}`,
    headers: {
      Cookie: cookieString,
      'User-Agent': ua
    },
    responseType: 'arraybuffer'
  })
  captcha = `data:image/gif;base64,${request._response}`

  return {
    ua,
    cookie: cookieString,
    formhash,
    captcha
  }
}

function UpdateTourist() {
  const [show, setShow] = useState(false)
  const [config, setConfig] = useState({})

  useEffect(() => {
    ;(async () => {
      if (!show) return
      setConfig(await getConfig())
    })()
  }, [show])

  console.log(config)
  return (
    <>
      <ItemSetting
        hd='Update Tourist'
        ft={
          <Touchable onPress={() => setShow(true)}>
            <Text>点击</Text>
          </Touchable>
        }
        withoutFeedback
      />
      {show && (
        <View style={styles.container}>
          <Flex>
            <Flex.Item>
              <Input />
            </Flex.Item>
            <Touchable style={_.ml.md}>
              <Iconfont name='md-check' />
            </Touchable>
          </Flex>
        </View>
      )}
    </>
  )
}

export default UpdateTourist

const styles = _.create({
  container: {
    paddingHorizontal: _.wind,
    marginBottom: _.md
  }
})
