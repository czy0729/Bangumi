/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 22:51:05
 */
import React from 'react'
import {
  Loading,
  ListView,
  Flex,
  Touchable,
  Text,
  Iconfont,
  Heatmap
} from '@components'
import { SectionHeader, ItemBangumiList } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { t } from '@utils/fetch'
import { H_BG } from './store'

const event = {
  id: '空间.跳转'
}

export default
@obc
class List extends React.Component {
  renderSectionHeader = ({ section: { title, count } }) => {
    const { $ } = this.context
    const { expand } = $.state
    return (
      <Touchable
        style={this.styles.section}
        onPress={() => $.toggleSection(title)}
      >
        <SectionHeader
          style={this.styles.sectionHeader}
          type='title'
          size={15}
          right={
            <Iconfont
              name={expand[title] ? 'down' : 'up'}
              color={_.colorIcon}
              size={16}
            />
          }
        >
          {title}{' '}
          <Text type='sub' size={12} bold lineHeight={15}>
            {count}{' '}
          </Text>
        </SectionHeader>
        {title === '在看' && <Heatmap id='空间.展开分组' />}
      </Touchable>
    )
  }

  ListFooterComponent = ($, navigation) => (
    <Touchable
      style={[_.mt.md, _.mb.md]}
      onPress={() => {
        t('空间.跳转', {
          to: 'User'
        })

        $.toUser(navigation)
      }}
    >
      <Text align='center'>查看TA的所有收藏</Text>
      <Heatmap
        id='空间.跳转'
        data={{
          to: 'User',
          alias: '所有收藏'
        }}
      />
    </Touchable>
  )

  render() {
    const { $, navigation } = this.context
    if (!$.userCollections._loaded) {
      return <Loading />
    }

    const { expand } = $.state
    const sections = []
    $.userCollections.list.forEach(item => {
      sections.push({
        title: item.status,
        count: item.count,
        data: [
          {
            list: item.list
          }
        ]
      })
    })
    return (
      <ListView
        contentContainerStyle={this.styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        sections={sections}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={({ item, section: { title } }) => {
          if (!expand[title]) {
            return null
          }

          return (
            <Flex wrap='wrap' align='start'>
              {item.list
                .filter((item, index) => index < 15)
                .map(item => (
                  <ItemBangumiList
                    key={item.id}
                    navigation={navigation}
                    subjectId={item.id}
                    images={item.images}
                    name={item.name_cn || item.name}
                    event={event}
                  />
                ))}
              {title.includes('在看') && (
                <Heatmap
                  id='空间.跳转'
                  data={{
                    to: 'Subject',
                    alias: '条目'
                  }}
                />
              )}
            </Flex>
          )
        }}
        animated
        showFooter={false}
        ListFooterComponent={() => this.ListFooterComponent($, navigation)}
        {...this.props}
      />
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  contentContainerStyle: {
    paddingHorizontal: _.wind - _._wind,
    minHeight: _.window.height + H_BG - _.tabBarHeight
  },
  sectionHeader: {
    paddingHorizontal: _._wind,
    backgroundColor: _.colorPlain
  },
  section: {
    backgroundColor: _.colorBg
  }
}))
