/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-23 19:48:20
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { SectionTitle, Eps, IconReverse } from '@screens/_'
import _ from '@styles'
import BookEp from './book-ep'
import Disc from './disc'

const Ep = ({ style }, { $, navigation }) => {
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
  return (
    <View style={[_.container.wind, styles.container, style]}>
      <SectionTitle
        right={
          <IconReverse
            color={epsReverse ? _.colorMain : _.colorIcon}
            onPress={$.toggleReverseEps}
          />
        }
      >
        章节{' '}
        <Text size={12} type='sub' lineHeight={24}>
          (可播放)
        </Text>
      </SectionTitle>
      <Eps
        style={_.mt.md}
        advance
        pagination
        login={$.isLogin}
        subjectId={$.params.subjectId}
        ningMoeId={$.ningMoeDetail.id}
        eps={epsReverse ? eps.reverse() : eps}
        userProgress={$.userProgress}
        onSelect={(value, item) => $.doEpsSelect(value, item, navigation)}
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
    minHeight: 146
  }
})
