/*
 * @Author: czy0729
 * @Date: 2026-05-13
 */
jest.mock('../../utils', () => ({
  pad: (n: string | number) => (+n < 10 ? `0${n}` : `${n}`)
}))

import {
  matchAvatar,
  matchBgmUrl,
  matchCover,
  matchStar,
  matchSubjectId,
  matchUserId,
  matchUserIdFromAvatar,
  matchYear,
  matchYearAndMonth
} from '../index'

describe('matchAvatar', () => {
  it('从 CSS background-image 提取头像 URL', () => {
    const str = "background-image:url('//lain.bgm.tv/pic/user/l/000/00/00/000000.jpg?r=0')"
    expect(matchAvatar(str)).toBe('//lain.bgm.tv/pic/user/l/000/00/00/000000.jpg?r=0')
  })

  it('无匹配时返回默认头像', () => {
    expect(matchAvatar('no match')).toBe('//lain.bgm.tv/pic/user/s/icon.jpg')
  })

  it('空字符串应返回默认头像而非空字符串', () => {
    expect(matchAvatar('')).toBe('//lain.bgm.tv/pic/user/s/icon.jpg')
  })

  it('无参数应返回默认头像而非空字符串', () => {
    expect(matchAvatar()).toBe('//lain.bgm.tv/pic/user/s/icon.jpg')
  })
})

describe('matchUserId', () => {
  it('从 /user/123 路径提取用户 Id', () => {
    expect(matchUserId('/user/123')).toBe('123')
  })

  it('从完整 URL 提取用户 Id', () => {
    expect(matchUserId('https://bgm.tv/user/456')).toBe('456')
  })

  it('空字符串返回空字符串', () => {
    expect(matchUserId('')).toBe('')
  })

  it('无斜杠路径返回整个字符串', () => {
    expect(matchUserId('123')).toBe('123')
  })
})

describe('matchSubjectId', () => {
  it('从 /subject/123 路径提取条目 Id', () => {
    expect(matchSubjectId('/subject/123')).toBe('123')
  })

  it('从完整 URL 提取条目 Id', () => {
    expect(matchSubjectId('https://bgm.tv/subject/456')).toBe('456')
  })

  it('空字符串返回空字符串', () => {
    expect(matchSubjectId('')).toBe('')
  })
})

describe('matchCover', () => {
  it('从 CSS background-image 提取封面 URL', () => {
    const str = "background-image:url('//lain.bgm.tv/pic/cover/m/4b/92/144482_nII3d.jpg')"
    expect(matchCover(str)).toBe('//lain.bgm.tv/pic/cover/m/4b/92/144482_nII3d.jpg')
  })

  it('无封面图返回空字符串', () => {
    expect(matchCover("background-image:url('/img/no_icon_subject.png')")).toBe('')
  })

  it('空字符串返回空字符串', () => {
    expect(matchCover('')).toBe('')
  })

  it('无参数返回空字符串', () => {
    expect(matchCover()).toBe('')
  })
})

describe('matchStar', () => {
  it('从 CSS class 提取评分', () => {
    expect(matchStar('starlight stars8')).toBe('8')
  })

  it('提取分数部分', () => {
    expect(matchStar('starlight stars10')).toBe('10')
  })

  it('空字符串返回空字符串', () => {
    expect(matchStar('')).toBe('')
  })
})

describe('matchBgmUrl', () => {
  it('匹配 bgm.tv URL', () => {
    const str = 'visit https://bgm.tv/subject/123 for more'
    expect(matchBgmUrl(str)).toBe('https://bgm.tv/subject/123')
  })

  it('匹配 bangumi.tv URL', () => {
    const str = 'visit https://bangumi.tv/subject/123 for more'
    expect(matchBgmUrl(str)).toBe('https://bangumi.tv/subject/123')
  })

  it('匹配 chii.in URL', () => {
    const str = 'visit https://chii.in/subject/123 for more'
    expect(matchBgmUrl(str)).toBe('https://chii.in/subject/123')
  })

  it('无匹配返回空字符串', () => {
    expect(matchBgmUrl('no url here')).toBe('')
  })

  it('returnAll=true 返回所有匹配', () => {
    const str = 'https://bgm.tv/subject/1 and https://bgm.tv/subject/2'
    const result = matchBgmUrl(str, true)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)
  })

  it('returnAll=false 默认只返回第一个', () => {
    const str = 'https://bgm.tv/subject/1 and https://bgm.tv/subject/2'
    expect(matchBgmUrl(str)).toBe('https://bgm.tv/subject/1')
  })

  it('空字符串返回空字符串', () => {
    expect(matchBgmUrl('')).toBe('')
  })
})

describe('matchUserIdFromAvatar', () => {
  it('从头像 URL 提取用户 Id', () => {
    expect(matchUserIdFromAvatar('//lain.bgm.tv/pic/user/l/000/00/00/123456.jpg')).toBe('123456')
  })

  it('无数字 Id 返回 0', () => {
    expect(matchUserIdFromAvatar('no-number.jpg')).toBe(0)
  })

  it('空字符串应返回 0 而非空字符串', () => {
    expect(matchUserIdFromAvatar('')).toBe(0)
  })
})

describe('matchYear', () => {
  it('从 "2024年" 提取年份', () => {
    expect(matchYear('2024年')).toBe('2024')
  })

  it('从 "2024-" 提取年份', () => {
    expect(matchYear('2024-01')).toBe('2024')
  })

  it('无年份返回空字符串', () => {
    expect(matchYear('no year')).toBe('')
  })

  it('空字符串返回空字符串', () => {
    expect(matchYear('')).toBe('')
  })
})

describe('matchYearAndMonth', () => {
  it('从 "2024年1月" 提取年月', () => {
    expect(matchYearAndMonth('2024年1月')).toBe('2024-01')
  })

  it('从 "2024-01" 提取年月', () => {
    expect(matchYearAndMonth('2024-01')).toBe('2024-01')
  })

  it('从 "2024年12月" 提取年月', () => {
    expect(matchYearAndMonth('2024年12月')).toBe('2024-12')
  })

  it('只有年份返回年份', () => {
    expect(matchYearAndMonth('2024年')).toBe('2024')
  })

  it('无匹配返回空字符串', () => {
    expect(matchYearAndMonth('no date')).toBe('')
  })

  it('空字符串返回空字符串', () => {
    expect(matchYearAndMonth('')).toBe('')
  })
})
