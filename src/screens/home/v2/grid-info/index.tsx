/*
 * @Author: czy0729
 * @Date: 2019-10-19 21:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-20 12:17:01
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EpStatus, Subject, SubjectId } from '@types'
import { Ctx } from '../types'
import Cover from './cover'
import Onair from './onair'
import Title from './title'
import Count from './count'
import ToolBar from './tool-bar'
import Eps from './eps'
import { memoStyles } from './styles'

class GridInfo extends React.Component<{
  subjectId?: SubjectId
  subject?: Subject
  epStatus?: EpStatus
}> {
  static defaultProps = {
    subjectId: 0,
    subject: {},
    epStatus: ''
  }

  onPress = () => {
    const { navigation }: Ctx = this.context
    const { subjectId, subject } = this.props
    t('首页.跳转', {
      to: 'Subject',
      from: 'grid',
      subjectId
    })

    navigation.push('Subject', {
      subjectId,
      _jp: subject.name,
      _cn: subject.name_cn || subject.name,
      _image: subject?.images?.medium || ''
    })
  }

  render() {
    global.rerender('Home.GridInfo')

    const { $ } = this.context
    const { subjectId, subject, epStatus } = this.props
    const isTop = $.state.top.indexOf(subjectId) !== -1
    return (
      <Flex style={this.styles.item} align='start'>
        <View>
          <Cover subjectId={subjectId} subject={subject} onPress={this.onPress} />
          <Onair subjectId={subjectId} />
        </View>
        <Flex.Item style={this.styles.info}>
          <Title subjectId={subjectId} subject={subject} />
          <Flex style={_.device(undefined, _.mt.sm)}>
            <Flex.Item>
              <Count subjectId={subjectId} subject={subject} epStatus={epStatus} />
            </Flex.Item>
            <ToolBar subjectId={subjectId} subject={subject} />
          </Flex>
          <Eps subjectId={subjectId} />
        </Flex.Item>
        {isTop && <View style={this.styles.dot} />}
      </Flex>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(GridInfo)
