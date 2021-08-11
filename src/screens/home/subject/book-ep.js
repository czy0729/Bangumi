/*
 * @Author: czy0729
 * @Date: 2019-06-08 22:14:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-12 00:40:21
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Input, Button, Heatmap } from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import IconSearch from './icon/search'
import IconManga from './icon/manga'
import IconWenku from './icon/wenku'
import IconHD from './icon/hd'

function BookEp({ style }, { $ }) {
  rerender('Subject.BookEp')

  const { chap, vol } = $.state
  const { book = {} } = $.subjectFormHTML
  const {
    status = {
      name: '未收藏'
    }
  } = $.collection
  return (
    <View style={[styles.container, _.container.wind, style]}>
      <SectionTitle
        right={
          <>
            <IconSearch />
            <IconManga />
            <IconWenku />
            <IconHD />
          </>
        }
      >
        章节
      </SectionTitle>
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
                    style={styles.inputRaw}
                    keyboardType='numeric'
                    value={chap}
                    placeholder={book.chap || '0'}
                    clearButtonMode='never'
                    returnKeyType='done'
                    returnKeyLabel='更新'
                    onChangeText={text => {
                      const newText = text.replace(/[^\d]+/, '')
                      $.changeText('chap', newText)
                    }}
                    onSubmitEditing={$.doUpdateBookEp}
                  />
                  {!!book.totalChap && (
                    <Text style={styles.total} type='sub'>
                      / {book.totalChap}
                    </Text>
                  )}
                </View>
                <Button
                  style={[styles.btnPlus, _.ml.sm]}
                  styleText={styles.btnText}
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
                    style={styles.inputRaw}
                    keyboardType='numeric'
                    value={vol}
                    placeholder={book.vol || '0'}
                    clearButtonMode='never'
                    returnKeyType='done'
                    returnKeyLabel='更新'
                    onChangeText={text => {
                      const newText = text.replace(/[^\d]+/, '')
                      $.changeText('vol', newText)
                    }}
                    onSubmitEditing={$.doUpdateBookEp}
                  />
                  {!!book.totalVol && (
                    <Text style={styles.total} type='sub'>
                      / {book.totalVol}
                    </Text>
                  )}
                </View>
                <Button
                  style={[styles.btnPlus, _.ml.sm]}
                  styleText={styles.btnText}
                  type='ghostPrimary'
                  onPress={() => $.doUpdateNext('vol')}
                >
                  +
                </Button>
                <Heatmap id='条目.更新书籍下一个章节' />
              </Flex>
            </Flex.Item>
            <View style={_.ml.md}>
              <Button
                style={styles.btn}
                type='ghostPrimary'
                onPress={$.doUpdateBookEp}
              >
                更新
              </Button>
              <Heatmap id='条目.更新书籍章节' />
            </View>
          </>
        )}
      </Flex>
    </View>
  )
}

export default obc(BookEp)

const styles = _.create({
  container: {
    height: 120 * _.ratio
  },
  label: {
    width: 48 * _.ratio
  },
  input: {
    width: 120 * _.ratio,
    height: _.device(34, 48)
  },
  inputRaw: {
    height: 28 * _.ratio,
    paddingVertical: 0,
    paddingHorizontal: _.device(_.xs, _.sm),
    color: _.colorSub,
    fontWeight: 'bold',
    ..._.device(_.fontSize11, _.fontSize15)
  },
  total: {
    position: 'absolute',
    zIndex: 100,
    top: _.device(8, 10),
    right: 12 * _.ratio
  },
  btn: {
    width: 56 * _.ratio,
    height: _.device(34, 48)
  },
  btnPlus: {
    width: 40 * _.ratio,
    height: _.device(34, 48)
  },
  btnText: {
    ..._.device(_.fontSize11, _.fontSize18)
  }
})
