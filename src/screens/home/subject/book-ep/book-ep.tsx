/*
 * @Author: czy0729
 * @Date: 2022-07-09 16:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:07:38
 */
import React from 'react'
import { View } from 'react-native'
import Progress from '@ant-design/react-native/lib/progress'
import { Flex, Text, Input, Button, Heatmap } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import IconSearch from '../icon/search'
import IconManga from '../icon/manga'
import IconWenku from '../icon/wenku'
import IconHD from '../icon/hd'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({
    styles,
    chap,
    vol,
    book,
    comicLength,
    status,
    onChangeText,
    doUpdateBookEp,
    doUpdateNext
  }) => {
    global.rerender('Subject.BookEp.Main')

    let textVol = book.totalVol
    if (textVol === '??' && comicLength) textVol = `?${comicLength}`
    return (
      <View style={styles.container}>
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
            <Text type='sub'>收藏后开启管理</Text>
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
                      placeholder={String(book.chap) || '0'}
                      clearButtonMode='never'
                      returnKeyType='done'
                      returnKeyLabel='更新'
                      onChangeText={text => {
                        const newText = text.replace(/[^\d]+/, '')
                        onChangeText('chap', newText)
                      }}
                      onSubmitEditing={doUpdateBookEp}
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
                    onPress={() => doUpdateNext('chap')}
                  >
                    +
                  </Button>
                </Flex>
                {!!book.totalChap && (
                  <Flex style={styles.progressWrap}>
                    <Progress
                      style={styles.progress}
                      barStyle={styles.bar}
                      percent={(parseInt(chap) / parseInt(book.totalChap)) * 100}
                    />
                  </Flex>
                )}
                <Flex style={_.mt.sm}>
                  <Text style={styles.label} align='right'>
                    Vol.
                  </Text>
                  <View style={[styles.input, _.ml.sm]}>
                    <Input
                      style={styles.inputRaw}
                      keyboardType='numeric'
                      value={vol}
                      placeholder={String(book.vol) || '0'}
                      clearButtonMode='never'
                      returnKeyType='done'
                      returnKeyLabel='更新'
                      onChangeText={text => {
                        const newText = text.replace(/[^\d]+/, '')
                        onChangeText('vol', newText)
                      }}
                      onSubmitEditing={doUpdateBookEp}
                    />
                    {!!textVol && (
                      <Text style={styles.total} type='sub'>
                        / {textVol}
                      </Text>
                    )}
                  </View>
                  <Button
                    style={[styles.btnPlus, _.ml.sm]}
                    styleText={styles.btnText}
                    type='ghostPrimary'
                    onPress={() => doUpdateNext('vol')}
                  >
                    +
                  </Button>
                  <Heatmap id='条目.更新书籍下一个章节' />
                </Flex>
                {!!book.totalVol && (
                  <Flex style={styles.progressWrap}>
                    <Progress
                      style={styles.progress}
                      barStyle={styles.bar}
                      percent={(parseInt(vol) / parseInt(book.totalVol)) * 100}
                    />
                  </Flex>
                )}
              </Flex.Item>
              <View style={_.ml.md}>
                <Button style={styles.btn} type='ghostPrimary' onPress={doUpdateBookEp}>
                  更新
                </Button>
                <Heatmap id='条目.更新书籍章节' />
              </View>
            </>
          )}
        </Flex>
      </View>
    )
  },
  DEFAULT_PROPS
)
