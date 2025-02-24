/*
 * @Author: czy0729
 * @Date: 2022-10-17 11:43:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-23 14:54:21
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Form() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const {
    show,
    url,
    url2,
    authorization,
    usersPrefixed,
    infosPrefixed,
    distance,
    navigate,
    referer,
    event
  } = $.state
  return (
    <>
      {show && <View style={styles.mask} />}
      <View style={stl(styles.fixed, !show && styles.hide)}>
        <View style={styles.user}>
          <Input
            style={styles.input}
            defaultValue={url}
            placeholder='url'
            onChangeText={value => $.onChange('url', value)}
          />
          <Input
            style={[styles.input, _.mt.md]}
            defaultValue={url2}
            placeholder='url2'
            onChangeText={value => $.onChange('url2', value)}
          />
          <Input
            style={[styles.input, _.mt.md]}
            defaultValue={authorization}
            placeholder='authorization'
            multiline
            numberOfLines={2}
            onChangeText={value => $.onChange('authorization', value)}
          />
          <Flex style={_.mt.md}>
            <Flex.Item>
              <Input
                style={styles.input}
                defaultValue={usersPrefixed}
                placeholder='usersPrefixed'
                onChangeText={value => $.onChange('usersPrefixed', value)}
              />
            </Flex.Item>
            <Flex.Item style={_.ml.md}>
              <Input
                style={styles.input}
                defaultValue={infosPrefixed}
                placeholder='infosPrefixed'
                onChangeText={value => $.onChange('infosPrefixed', value)}
              />
            </Flex.Item>
            <Flex.Item style={_.ml.md}>
              <Input
                style={styles.input}
                defaultValue={distance}
                placeholder='distance'
                onChangeText={value => $.onChange('distance', value)}
              />
            </Flex.Item>
          </Flex>
          <Input
            style={[styles.input, _.mt.md]}
            defaultValue={navigate}
            placeholder='navigate'
            onChangeText={value => $.onChange('navigate', value)}
          />
          <Input
            style={[styles.input, _.mt.md]}
            defaultValue={referer}
            placeholder='referer'
            onChangeText={value => $.onChange('referer', value)}
          />
          <Input
            style={[styles.input, _.mt.md]}
            defaultValue={event}
            placeholder='event'
            onChangeText={value => $.onChange('event', value)}
          />
        </View>
      </View>
    </>
  )
}

export default ob(Form, COMPONENT)
