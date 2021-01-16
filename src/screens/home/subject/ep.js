/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:06:03
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Flex, Input, Button, Heatmap } from '@components'
import { SectionTitle, Eps } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import BookEp from './book-ep'
import Disc from './disc'
import IconEpFilter from './icon/ep-filter'
import IconOnline from './icon/online'
import IconEp from './icon/ep'
import IconReverse from './icon/reverse'

const layoutWidth = parseInt(_.window.width - _.wind) - 1

function Ep({ style }, { $, navigation }) {
  // 游戏没有ep
  if ($.type === '游戏') return null
  if ($.type === '书籍') return <BookEp style={style} />
  if ($.type === '音乐') return <Disc style={style} />

  const { watchedEps } = $.state
  const { totalEps } = $.subjectFormHTML
  const canPlay = $.onlinePlayActionSheetData.length >= 2
  const showPlay = !$.isLimit && canPlay
  return (
    <View style={[styles.container, style]}>
      <SectionTitle
        right={
          <>
            <IconEpFilter />
            <IconOnline />
            <IconEp />
            <IconReverse />
          </>
        }
      >
        章节
      </SectionTitle>
      <View style={_.mt.md}>
        <Eps
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
        <Heatmap id='条目.章节按钮长按' />
        <Heatmap bottom={35} id='条目.章节菜单操作' />
      </View>
      <Flex style={_.mt.sm}>
        <Flex>
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
              onChangeText={text =>
                $.changeText('watchedEps', text.replace(/[^\d]+/, ''))
              }
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
            type='ghostPrimary'
            onPress={$.doUpdateSubjectEp}
          >
            更新
          </Button>
          <Heatmap id='条目.输入框更新章节' />
        </Flex>
      </Flex>
    </View>
  )
}

export default obc(Ep)

const styles = _.create({
  container: {
    minHeight: 146,
    marginLeft: _.wind,
    marginRight: _.wind - _._wind
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
  }
})
