/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-17 17:18:12
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { SectionTitle, Eps, IconReverse } from '@screens/_'
import { _ } from '@stores'
import BookEp from './book-ep'
import Disc from './disc'

function Ep({ style }, { $, navigation }) {
  // 书籍和游戏没有ep
  if ($.type === '游戏') {
    return null
  }

  if ($.type === '书籍') {
    return <BookEp style={style} />
  }

  if ($.type === '音乐') {
    return <Disc style={style} />
  }

  const { eps } = $.subjectEp
  const { epsReverse } = $.state
  const canPlay = $.onlinePlayActionSheetData.length >= 2
  return (
    <View style={[styles.container, style]}>
      <SectionTitle
        right={
          <IconReverse
            color={epsReverse ? _.colorMain : _.colorIcon}
            onPress={$.toggleReverseEps}
          />
        }
      >
        章节
        {$.showOnlinePlay && canPlay && (
          <Text size={12} type='sub' lineHeight={24}>
            {' '}
            (可播放)
          </Text>
        )}
      </SectionTitle>
      <Eps
        style={_.mt.md}
        marginRight={_.wind}
        advance
        pagination
        login={$.isLogin}
        subjectId={$.params.subjectId}
        eps={epsReverse ? eps.reverse() : eps}
        userProgress={$.userProgress}
        canPlay={$.showOnlinePlay && canPlay}
        onSelect={(value, item) => $.doEpsSelect(value, item, navigation)}
        onLongPress={item => $.doEpsLongPress(item)}
      />
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
    marginLeft: _.wind
  }
})
