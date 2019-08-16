/*
 * @Author: czy0729
 * @Date: 2019-08-08 11:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-15 17:55:22
 */

/**
 * 匹配头像地址
 * background-image:url('//lain.bgm.tv/pic/user/m/000/47/44/474489.jpg?r=1563699148')
 * @test https://jsperf.com/czy0729-001
 * @param {*} str
 */
export function matchAvatar(str = '') {
  const index = str.indexOf('?')
  return str.substring(22, index === -1 ? str.length - 2 : index)
}

/**
 * 匹配用户Id
 * /user/123
 * @test https://jsperf.com/czy0729-002
 * @param {*} str
 */
export function matchUserId(str = '') {
  return str.substring(str.lastIndexOf('/') + 1)
}

/**
 * 匹配条目Id
 * /subject/123
 * @test https://jsperf.com/czy0729-003
 * @param {*} str
 */
export function matchSubjectId(str = '') {
  return str.substring(str.lastIndexOf('/') + 1)
}

/**
 * 匹配图片
 * background-image:url('//lain.bgm.tv/pic/cover/m/4b/92/144482_nII3d.jpg')
 * @test https://jsperf.com/czy0729-004
 * @param {*} str
 */
export function matchCover(str = '') {
  if (str === 'background-image:url(\'/img/no_icon_subject.png\')') {
    return ''
  }
  return str.substring(22, str.length - 2)
}
