/*
 * @Author: czy0729
 * @Date: 2019-06-08 22:14:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-09 02:34:38
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Input, Button } from '@components'
import { SectionTitle } from '@screens/_'
import { observer } from '@utils/decorators'
import _ from '@styles'

const BookEp = ({ style }, { $ }) => {
  const { chap, vol } = $.state
  const { book = {} } = $.subjectFormHTML
  const { status = { name: '未收藏' } } = $.collection
  return (
    <View style={[styles.container, _.container.wind, style]}>
      <SectionTitle>章节</SectionTitle>
      <Flex style={_.mt.md} align='start'>
        {status.name === '未收藏' ? (
          <Text type='sub'>收藏后开启管理进度</Text>
        ) : (
          <>
            <Flex.Item>
              <Flex>
                <Text style={styles.label} align='right'>
                  Chap.
                </Text>
                <View style={[styles.input, _.ml.sm]}>
                  <Input
                    keyboardType='numeric'
                    value={chap}
                    placeholder={book.chap || '0'}
                    onChangeText={text => {
                      const newText = text.replace(/[^\d]+/, '')
                      $.changeText('chap', newText)
                    }}
                  />
                </View>
                <Button
                  style={[styles.btnPlus, _.ml.sm]}
                  type='ghostPrimary'
                  onPress={() => $.doUpdateNext('chap')}
                >
                  +
                </Button>
              </Flex>
              <Flex style={_.mt.sm}>
                <Text style={styles.label} align='right'>
                  Vol.
                </Text>
                <View style={[styles.input, _.ml.sm]}>
                  <Input
                    keyboardType='numeric'
                    value={vol}
                    placeholder={book.vol || '0'}
                    onChangeText={text => {
                      const newText = text.replace(/[^\d]+/, '')
                      $.changeText('vol', newText)
                    }}
                  />
                </View>
                <Button
                  style={[styles.btnPlus, _.ml.sm]}
                  type='ghostPrimary'
                  onPress={() => $.doUpdateNext('vol')}
                >
                  +
                </Button>
              </Flex>
            </Flex.Item>
            <Button
              style={[styles.btn, _.ml.md]}
              type='ghostPrimary'
              onPress={$.doUpdateBookEp}
            >
              更新
            </Button>
          </>
        )}
      </Flex>
    </View>
  )
}

BookEp.contextTypes = {
  $: PropTypes.object
}

export default observer(BookEp)

const styles = StyleSheet.create({
  container: {
    height: 120
  },
  label: {
    width: 40
  },
  input: {
    width: 80
  },
  btn: {
    width: 80,
    height: 34
  },
  btnPlus: {
    width: 40,
    height: 34
  }
})
