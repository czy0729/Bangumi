/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-01 15:20:04
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, Eps, IconReverse } from '@screens/_'
import _ from '@styles'

const Ep = ({ style }, { $, navigation }) => {
  // 书籍和游戏没有ep
  if (['书籍', '游戏'].includes($.type)) {
    return null
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
        章节
      </SectionTitle>
      <Eps
        style={_.mt.md}
        advance
        pagination
        login={$.isLogin}
        subjectId={$.params.subjectId}
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
