/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-18 03:26:26
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text, Iconfont, Flex, Input, Button } from '@components'
import {
  SectionTitle,
  Eps,
  IconReverse,
  Popover,
  IconTouchable
} from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import BookEp from './book-ep'
import Disc from './disc'

const layoutWidth = parseInt(_.window.width - _.wind) - 1

function Ep({ style }, { $, navigation }) {
  // 游戏没有ep
  if ($.type === '游戏') {
    return null
  }

  if ($.type === '书籍') {
    return <BookEp style={style} />
  }

  if ($.type === '音乐') {
    return <Disc style={style} />
  }

  const { epsReverse, watchedEps, filterEps } = $.state
  const { totalEps } = $.subjectFormHTML
  const canPlay = $.onlinePlayActionSheetData.length >= 2
  const showPlay = !$.isLimit && canPlay
  const showFilter = $.eps.length > 160 // 32 * 5 = 160
  return (
    <View style={[styles.container, style]}>
      <SectionTitle
        right={
          <>
            {showFilter && (
              <Popover
                style={{
                  marginRight: 4
                }}
                data={$.filterEpsData}
                onSelect={$.updateFilterEps}
              >
                <Iconfont
                  style={styles.icon}
                  name='filter'
                  color={filterEps ? _.colorMain : _.colorIcon}
                  size={16}
                />
              </Popover>
            )}
            {!$.isLimit && (
              <Popover data={$.onlineOrigins} onSelect={$.onlinePlaySelected}>
                <Iconfont style={styles.icon} name='xin-fan' size={16} />
              </Popover>
            )}
            <IconTouchable
              name='list'
              size={17}
              onPress={() => {
                t('条目.跳转', {
                  to: 'Episodes',
                  from: '章节',
                  subjectId: $.subjectId
                })

                navigation.push('Episodes', {
                  subjectId: $.subjectId,
                  name: $.cn || $.jp
                })
              }}
            />
            <IconReverse
              style={_.mr.sm}
              color={epsReverse ? _.colorMain : _.colorIcon}
              onPress={$.toggleReverseEps}
            />
          </>
        }
      >
        章节
      </SectionTitle>
      <Eps
        style={_.mt.md}
        layoutWidth={layoutWidth}
        marginRight={_._wind}
        advance
        pagination
        login={$.isLogin}
        subjectId={$.params.subjectId}
        eps={$.toEps}
        userProgress={$.userProgress}
        canPlay={showPlay}
        onSelect={(value, item) => $.doEpsSelect(value, item, navigation)}
        onLongPress={item => $.doEpsLongPress(item)}
      />
      <Flex style={_.mt.sm}>
        <View style={styles.input}>
          <Input
            style={styles.inputRaw}
            pointerEvents='box-none'
            keyboardType='numeric'
            value={watchedEps}
            placeholder={watchedEps || '0'}
            clearButtonMode='never'
            returnKeyType='done'
            returnKeyLabel='更新'
            onChangeText={text => {
              const newText = text.replace(/[^\d]+/, '')
              $.changeText('watchedEps', newText)
            }}
            onSubmitEditing={$.doUpdateSubjectEp}
          />
          {!!totalEps && (
            <Text style={styles.total} type='sub' size={12}>
              / {totalEps}
            </Text>
          )}
        </View>
        <Button
          style={styles.btn}
          styleText={styles.btnText}
          type='ghostPrimary'
          onPress={$.doUpdateSubjectEp}
        >
          更新
        </Button>
      </Flex>
    </View>
  )
}

Ep.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Ep)

const styles = StyleSheet.create({
  container: {
    minHeight: 146,
    marginLeft: _.wind,
    marginRight: _.wind - _._wind
  },
  icon: {
    paddingHorizontal: _.sm
  },
  input: {
    width: 80,
    height: 28
  },
  inputRaw: {
    height: 28,
    paddingVertical: 0,
    ..._.fontSize(12)
  },
  total: {
    position: 'absolute',
    zIndex: 100,
    top: 6,
    right: 10
  },
  btn: {
    width: 64,
    height: 28,
    marginLeft: 12
  },
  btnText: {
    ..._.fontSize(12)
  }
})
