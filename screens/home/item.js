/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-29 03:56:42
 */
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Progress } from '@ant-design/react-native'
import { BlurView, Image, Text, Icon, Activity } from '@components'
import { Eps } from '@screens/_'
import { pad } from '@utils'
import _, { colorMain, colorSub } from '@styles'

class Item extends React.Component {
  static defaultProps = {
    subjectId: 0,
    subject: {},
    epStatus: ''
  }

  contextTypes = {
    $: PropTypes.object
  }

  renderBtnNextEp() {
    const { $ } = this.context
    const { subjectId } = this.props
    const { sort } = $.nextWatchEp(subjectId)
    if (!sort) {
      return null
    }

    const { doing } = $.$item(subjectId)
    return (
      <TouchableOpacity onPress={() => $.doWatchedNextEp(subjectId)}>
        <Flex style={styles.button} justify='center'>
          <Icon
            style={styles.icon}
            name='ios-checkbox'
            size={20}
            color={colorSub}
          />
          <View style={[styles.placeholder, _.ml.xs]}>
            {doing ? (
              <Activity style={styles.activity} size='xs' />
            ) : (
              <Text type='sub' size={11}>
                EP.{pad(sort)}
              </Text>
            )}
          </View>
        </Flex>
      </TouchableOpacity>
    )
  }

  render() {
    const { $ } = this.context
    const { subjectId, subject, epStatus } = this.props
    const { expand } = $.$item(subjectId)
    const eps = $.eps(subjectId)
    const userProgress = $.userProgress(subjectId)
    const isToday = $.isToday(subjectId)
    const percent = $.percent(subjectId, subject)
    return (
      <View style={_.shadow.item}>
        <BlurView
          style={[_.radius.xs, _.shadow.item, _.mb.md]}
          theme='xlight'
          src={subject.images.medium}
        >
          <Flex style={_.container.inner} align='start'>
            <TouchableOpacity>
              <Image size={72} src={subject.images.medium} radius />
            </TouchableOpacity>
            <Flex.Item style={_.ml.md}>
              <Flex align='start'>
                <Flex.Item>
                  <Text size={15}>{subject.name_cn || subject.name}</Text>
                  <Text style={_.mt.xs} type='sub' size={11}>
                    {subject.collection.doing} 人在看
                  </Text>
                </Flex.Item>
                {isToday && (
                  <Text type='success' size={12}>
                    放送中
                  </Text>
                )}
              </Flex>
              {expand && (
                <Eps
                  style={_.mt.md}
                  subjectId={subjectId}
                  eps={eps}
                  userProgress={userProgress}
                  onSelect={$.doEpsSelect}
                />
              )}
              <Flex style={_.mt.md}>
                <Flex.Item>
                  {!expand && (
                    <Flex align='baseline'>
                      <Text type='primary' size={20} lineHeight={1}>
                        {epStatus}
                      </Text>
                      <Text
                        style={_.ml.xs}
                        type='desc'
                        size={11}
                        lineHeight={1}
                      >
                        / {subject.eps_count || '-'}
                      </Text>
                    </Flex>
                  )}
                </Flex.Item>
                <Flex>
                  <TouchableOpacity
                    onPress={() => $.itemToggleExpand(subjectId)}
                  >
                    <View style={styles.button}>
                      <Icon
                        name={expand ? 'ios-square' : 'ios-square-outline'}
                        size={20}
                        color={expand ? colorMain : colorSub}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => $.showManageModal(subjectId)}
                  >
                    <View style={styles.button}>
                      <Icon name='ios-star' size={20} color={colorSub} />
                    </View>
                  </TouchableOpacity>
                  {this.renderBtnNextEp()}
                </Flex>
              </Flex>
            </Flex.Item>
          </Flex>
          <Progress
            percent={percent}
            style={styles.progress}
            barStyle={styles.bar}
          />
        </BlurView>
      </View>
    )
  }
}

export default observer(Item)

const styles = StyleSheet.create({
  button: {
    paddingLeft: 20
  },
  placeholder: {
    minWidth: 32
  },
  icon: {
    marginBottom: -1
  },
  progress: {
    backgroundColor: 'transparent'
  },
  bar: {
    borderBottomWidth: 2
  }
})
