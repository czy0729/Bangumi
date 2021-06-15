/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-15 14:40:09
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Flex, Input, Button, Heatmap } from '@components'
import { SectionTitle, Eps, Popover, IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import BookEp from './book-ep'
import Disc from './disc'
import IconEpFilter from './icon/ep-filter'
import IconOnline from './icon/online'
import IconEp from './icon/ep'
import IconReverse from './icon/reverse'

const layoutWidth = parseInt(_.window.width - _.wind) - 1
const weekDayDS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const weekDayMap = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六'
}
const hourDS = [
  '20',
  '21',
  '22',
  '23',
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19'
]
const minuteDS = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55'
]

function Ep({ style }, { $, navigation }) {
  // 游戏没有ep
  if ($.type === '游戏') return null
  if ($.type === '书籍') return <BookEp style={style} />
  if ($.type === '音乐') return <Disc style={style} />

  const styles = memoStyles()
  const { watchedEps } = $.state
  const { totalEps } = $.subjectFormHTML
  const canPlay = $.onlinePlayActionSheetData.length >= 2
  const showPlay = !$.isLimit && canPlay

  const { timeJP, weekDayJP, timeCN, weekDayCN } = $.onAir
  const weekDay = weekDayCN || weekDayJP
  const time = timeCN || timeJP
  const h = typeof time === 'string' ? time.slice(0, 2) : '00'
  const m = typeof time === 'string' ? time.slice(2, 4) : '00'
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
      <Flex style={styles.tool}>
        <Flex.Item>
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
                <Text style={styles.total} type='sub' size={11} bold>
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
        </Flex.Item>
        {weekDay !== undefined && weekDay !== '' && (
          <Flex>
            <Popover
              data={weekDayDS}
              onSelect={title => {
                const map = {}
                Object.keys(weekDayMap).forEach(
                  item => (map[weekDayMap[item]] = item)
                )
                $.onSelectOnAir('weekDayCN', Number(map[title] || 0))
              }}
            >
              <Flex style={styles.btnOnAir} justify='center'>
                <Text size={11} bold type='sub'>
                  {weekDayMap[weekDay] || '周日'}
                </Text>
              </Flex>
            </Popover>
            <Popover
              data={hourDS}
              onSelect={title => $.onSelectOnAir('timeCN', `${title}${m}`)}
            >
              <Flex style={styles.btnOnAir} justify='center'>
                <Text size={11} bold type='sub'>
                  {h}
                </Text>
              </Flex>
            </Popover>
            <Popover
              data={minuteDS}
              onSelect={title => $.onSelectOnAir('timeCN', `${h}${title}`)}
            >
              <Flex style={styles.btnOnAir} justify='center'>
                <Text size={11} bold type='sub'>
                  {m}
                </Text>
              </Flex>
            </Popover>
            {!!$.onAirUser._loaded && (
              <View style={styles.btnReset}>
                <IconTouchable
                  style={_.mr._xs}
                  name='md-refresh'
                  size={20}
                  onPress={$.resetOnAirUser}
                />
              </View>
            )}
          </Flex>
        )}
        <Heatmap id='条目.输入框更新章节' />
      </Flex>
    </View>
  )
}

export default obc(Ep)

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 146,
    marginLeft: _.wind,
    marginRight: _.wind - _._wind
  },
  tool: {
    marginTop: _.sm,
    paddingRight: _._wind
  },
  input: {
    width: 68,
    height: 28
  },
  inputRaw: {
    height: 28,
    paddingVertical: 0,
    color: _.colorSub,
    fontWeight: 'bold',
    ..._.fontSize11
  },
  total: {
    position: 'absolute',
    zIndex: 100,
    top: 7,
    right: 10
  },
  btn: {
    width: 44,
    height: 28,
    marginLeft: 8,
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel2),
    overflow: 'hidden'
  },
  btnText: {
    fontWeight: 'bold',
    ..._.fontSize11
  },
  btnOnAir: {
    width: 44,
    height: 28,
    marginLeft: 8,
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel2),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel2),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderRadius: _.radiusXs,
    overflow: IOS ? undefined : 'hidden'
  },
  btnReset: {
    height: 28,
    marginTop: -8
  }
}))
