/*
 * @Author: czy0729
 * @Date: 2019-06-08 22:14:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-16 17:46:41
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
    height: 120
  },
  label: {
    width: 40
  },
  input: {
    width: 120,
    height: 34
  },
  btn: {
    width: 80,
    height: 34
  },
  btnPlus: {
    width: 40,
    height: 34
  },
  total: {
    position: 'absolute',
    zIndex: 100,
    top: 8,
    right: 12
  }
})
