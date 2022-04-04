/*
 * @Author: czy0729
 * @Date: 2020-07-21 13:45:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-26 15:45:20
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from './item'

function List(props, { $ }) {
  const styles = memoStyles()
  return (
    <View style={styles.container}>
      {$.yearsTimeline.map((item, index) => (
        <View key={item.title}>
          <View>
            <View style={styles.lineBottom} />
            <View style={styles.nodeYear} />
            <Flex>
              <Text size={18} lineHeight={48} type='title' bold>
                {item.title}年{' '}
              </Text>
              {index === 0 && (
                <Text style={_.ml.sm} size={12} bold>
                  加入Bangumi
                  <Text type='main' size={12} bold>
                    {' '}
                    {$.days}{' '}
                  </Text>
                  天
                </Text>
              )}
            </Flex>
            <Heatmap id='时间线.跳转' />
          </View>
          {item.data.map(item => (
            <View key={item.title}>
              <View>
                <View style={styles.line} />
                <View style={styles.nodeMonth} />
                <Text size={20} lineHeight={32} type='title' bold>
                  {parseInt(item.title.slice(5, 7))}月
                </Text>
                <Flex>
                  {!!item.actions['看过'] && (
                    <Text style={_.mr.sm} size={12} lineHeight={24} type='sub'>
                      看过{' '}
                      <Text size={12} lineHeight={24} type='main' bold>
                        {item.actions['看过']}{' '}
                      </Text>
                    </Text>
                  )}
                  {!!item.actions['在看'] && (
                    <Text style={_.mr.sm} size={12} lineHeight={24} type='sub'>
                      在看{' '}
                      <Text size={12} lineHeight={24} type='main' bold>
                        {item.actions['在看']}{' '}
                      </Text>
                    </Text>
                  )}
                  {!!item.actions['想看'] && (
                    <Text style={_.mr.sm} size={12} lineHeight={24} type='sub'>
                      想看{' '}
                      <Text size={12} lineHeight={24} type='main' bold>
                        {item.actions['想看']}{' '}
                      </Text>
                    </Text>
                  )}
                  {!!item.actions['搁置'] && (
                    <Text style={_.mr.sm} size={12} lineHeight={24} type='sub'>
                      搁置{' '}
                      <Text size={12} lineHeight={24} type='main' bold>
                        {item.actions['搁置']}{' '}
                      </Text>
                    </Text>
                  )}
                  {!!item.actions['抛弃'] && (
                    <Text style={_.mr.sm} size={12} lineHeight={24} type='sub'>
                      抛弃{' '}
                      <Text size={12} lineHeight={24} type='main' bold>
                        {item.actions['抛弃']}{' '}
                      </Text>
                    </Text>
                  )}
                </Flex>
              </View>
              <View>
                {item.data.map(item => {
                  const splits = item.title.split('-')
                  const label = `${splits[1]}月${splits[2]}日`
                  return (
                    <View key={item.title}>
                      <View>
                        <View style={styles.line} />
                        <Text lineHeight={28} bold>
                          {label}
                        </Text>
                      </View>
                      <View>
                        <View style={styles.line} />
                        {item.data.map(item => (
                          <Item
                            key={item.id}
                            subject={item.subject}
                            action={item.action}
                          />
                        ))}
                      </View>
                    </View>
                  )
                })}
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

export default obc(List)

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.r(32),
    marginHorizontal: _.windSm - _._wind
  },
  line: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 1,
    height: '100%',
    marginLeft: _.r(-12),
    backgroundColor: _.select(_.colorBorder, 'rgb(57, 57, 59)'),
    transform: [
      {
        translateX: _.r(-0.5)
      }
    ]
  },
  lineBottom: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: 0,
    width: 1,
    height: '100%',
    marginLeft: _.r(-12),
    backgroundColor: _.select(_.colorBorder, 'rgb(57, 57, 59)'),
    transform: [
      {
        translateX: _.r(-0.5)
      }
    ]
  },
  nodeYear: {
    position: 'absolute',
    zIndex: 2,
    top: '50%',
    left: 0,
    width: _.r(4),
    height: _.r(4),
    marginTop: _.r(-2),
    marginLeft: _.r(-12),
    backgroundColor: _.colorTitle,
    borderRadius: _.r(2),
    transform: [
      {
        translateX: _.r(-2)
      }
    ]
  },
  nodeMonth: {
    position: 'absolute',
    zIndex: 2,
    top: _.r(22),
    left: 0,
    width: _.r(8),
    height: _.r(8),
    marginTop: _.r(-4),
    marginLeft: _.r(-4),
    backgroundColor: _.colorPlain,
    borderWidth: 1,
    borderColor: _.select(_.colorBorder, 'rgb(57, 57, 59)'),
    borderRadius: _.r(4),
    transform: [
      {
        translateX: _.r(-12)
      }
    ]
  }
}))
