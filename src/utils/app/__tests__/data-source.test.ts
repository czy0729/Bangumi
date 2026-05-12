/*
 * @Author: czy0729
 * @Date: 2026-05-12
 */
jest.mock('mobx', () => ({
  isObservableArray: () => false
}))

jest.mock('../../utils', () => ({
  getTimestamp: jest.fn(() => Date.now() / 1000)
}))

jest.mock('expo-asset', () => ({}))
jest.mock('expo-haptics', () => ({}))

jest.mock(
  '@constants',
  () => ({
    DEV: false,
    FROZEN_ARRAY: Object.freeze([]),
    FROZEN_OBJECT: Object.freeze({})
  }),
  { virtual: true }
)

jest.mock('@constants/cdn', () => ({
  CDN_OSS_MAGMA_MONO: (src: string) => src,
  CDN_OSS_MAGMA_POSTER: (src: string) => src,
  CDN_OSS_SUBJECT: (src: string) => src
}))

jest.mock('@constants/constants', () => ({
  HOST: 'https://bgm.tv',
  HOST_2: 'https://bangumi.tv',
  HOST_3: 'https://chii.in',
  HOST_BGM_STATIC: 'https://lain.bgm.tv',
  IMG_DEFAULT: 'https://lain.bgm.tv/img/default_cover.jpg',
  EVENT: { id: 'test', data: {} }
}))

jest.mock('@assets/json', () => ({
  getJSON: jest.fn(() => [])
}))

jest.mock('@assets/json/user.json', () => ({
  default: {}
}))

jest.mock('../../dev', () => ({
  logger: { warn: jest.fn(), error: jest.fn() }
}))

jest.mock('../../html', () => ({
  HTMLDecode: (s: string) => s,
  removeHTMLTag: (s: string) => s.replace(/<[^>]+>/g, '')
}))

jest.mock('../../protobuf', () => ({
  get: jest.fn(() => [])
}))

jest.mock('../utils', () => ({
  getSetting: jest.fn(() => ({ cnFirst: false })),
  getTimestamp: jest.fn(() => Date.now() / 1000)
}))

jest.mock('../ds', () => ({
  HOST_IMAGE: '//lain.bgm.tv',
  NO_IMGS: ['//lain.bgm.tv/pic/cover/c/', '/img/no_icon_subject.png'],
  TYPE_MAP: {
    看过: 'do',
    想看: 'wish',
    在看: 'doing',
    搁置: 'on_hold',
    抛弃: 'drop'
  },
  RATING_MAP: {
    1: '不忍直视',
    2: '很差',
    3: '差',
    4: '较差',
    5: '不过如此',
    6: '还行',
    7: '推荐',
    8: '力荐',
    9: '超神作',
    10: '超神作'
  },
  SITE_MAP: { p: 'bangumi', b: 'bilibili', q: 'qq', i: 'iqiyi' },
  BANGUMI_URL_TEMPLATES: {
    bilibili: (id: string) => `https://bilibili.com/bangumi/media/${id}`,
    qq: (id: string) => `https://v.qq.com/detail/${id}.html`
  },
  NSFW_KEYWORDS: ['乳', '淫'],
  X18_DS: ['nsfw', '18+'],
  FIND_SUBJECT_CN_CACHE_MAP: new Map(),
  FIND_SUBJECT_JP_CACHE_MAP: new Map(),
  NSFW_CACHE_MAP: new Map(),
  GET_AVATAR_CACHE_MAP: new Map()
}))

import {
  fixedBgmUrl,
  fixedRemoteImageUrl,
  freeze,
  getAction,
  getBangumiUrl,
  getCommentPlainText,
  getCookie,
  getCoverLarge,
  getCoverMedium,
  getCoverSmall,
  getRating,
  getType,
  getVisualLength,
  guessTotalCount,
  isArray,
  matchBgmLink,
  randomizeImgHost,
  sliceByVisualLength
} from '../data-source'

describe('getVisualLength', () => {
  it('纯英文返回字符数 × 0.5', () => {
    expect(getVisualLength('abc')).toBe(1.5)
  })

  it('纯中文返回字符数 × 1', () => {
    expect(getVisualLength('你好')).toBe(2)
  })

  it('混合字符串', () => {
    expect(getVisualLength('abc你好')).toBe(3.5)
  })

  it('空字符串返回 0', () => {
    expect(getVisualLength('')).toBe(0)
  })

  // 已修复：控制字符不计宽度
  it('换行符不计宽度', () => {
    expect(getVisualLength('\n')).toBe(0)
  })

  it('tab 不计宽度', () => {
    expect(getVisualLength('\t')).toBe(0)
  })

  it('数字混合英文', () => {
    expect(getVisualLength('abc123')).toBe(3)
  })

  it('日文假名', () => {
    expect(getVisualLength('あいう')).toBe(3)
  })

  it('emoji', () => {
    expect(getVisualLength('😀')).toBe(1)
  })

  it('感叹号等半角符号', () => {
    expect(getVisualLength('!@#')).toBe(1.5)
  })
})

describe('sliceByVisualLength', () => {
  it('正常截断', () => {
    expect(sliceByVisualLength('abc你好', 3)).toBe('abc你')
  })

  it('完整保留', () => {
    expect(sliceByVisualLength('abc你好', 5)).toBe('abc你好')
  })

  it('精确匹配 maxLen', () => {
    expect(sliceByVisualLength('你好', 2)).toBe('你好')
  })

  it('只保留一个中文字符', () => {
    expect(sliceByVisualLength('你好', 1)).toBe('你')
  })

  it('空字符串', () => {
    expect(sliceByVisualLength('', 5)).toBe('')
  })

  it('maxLen=0 时返回省略号', () => {
    expect(sliceByVisualLength('abc', 0, '...')).toBe('...')
  })

  it('截断时追加省略号', () => {
    // 'a'(0.5)+'b'(0.5)+'c'(0.5)=1.5 <= 2, '你'(1.0)=2.5 > 2 break
    expect(sliceByVisualLength('abc你好', 2, '...')).toBe('abc...')
  })

  it('不截断时不追加省略号', () => {
    expect(sliceByVisualLength('abc', 5, '...')).toBe('abc')
  })

  it('全中文精确截断', () => {
    expect(sliceByVisualLength('你好世界', 3)).toBe('你好世')
  })
})

describe('fixedRemoteImageUrl', () => {
  it('补全 https 协议', () => {
    expect(fixedRemoteImageUrl('//lain.bgm.tv/test.jpg')).toBe('https://lain.bgm.tv/test.jpg')
  })

  it('http 升级为 https', () => {
    expect(fixedRemoteImageUrl('http://lain.bgm.tv/test.jpg')).toBe('https://lain.bgm.tv/test.jpg')
  })

  it('已是 https 不变', () => {
    expect(fixedRemoteImageUrl('https://lain.bgm.tv/test.jpg')).toBe('https://lain.bgm.tv/test.jpg')
  })

  // 已修复：regex 使用 [^/]+ 防止跨斜杠匹配
  it('Cloudflare mirage 前缀正确去除', () => {
    const input = '//lain.bgm.tv/cdn-cgi/mirage/xxx-xxx-1800/1280/pic/test.jpg'
    const result = fixedRemoteImageUrl(input)
    expect(result).not.toContain('cdn-cgi')
    expect(result).toBe('https://lain.bgm.tv/pic/test.jpg')
  })

  it('带 r/ 前缀时替换质量标记为 l', () => {
    const result = fixedRemoteImageUrl('//lain.bgm.tv/r/400/pic/cover/m/test.jpg')
    expect(result).toBe('https://lain.bgm.tv/r/400/pic/cover/l/test.jpg')
  })

  it('已是 l 质量不变', () => {
    const result = fixedRemoteImageUrl('//lain.bgm.tv/r/400/pic/cover/l/test.jpg')
    expect(result).toBe('https://lain.bgm.tv/r/400/pic/cover/l/test.jpg')
  })

  it('非字符串输入返回原值', () => {
    expect(fixedRemoteImageUrl(null)).toBe(null)
    expect(fixedRemoteImageUrl(123)).toBe(123)
    expect(fixedRemoteImageUrl(undefined)).toBe(undefined)
  })

  it('空字符串返回空字符串', () => {
    expect(fixedRemoteImageUrl('')).toBe('')
  })
})

describe('getCookie', () => {
  it('正常解析 cookie', () => {
    expect(getCookie('token=abc123; session=xyz', 'token')).toBe('abc123')
  })

  it('解析第二个 cookie', () => {
    expect(getCookie('token=abc123; session=xyz', 'session')).toBe('xyz')
  })

  it('解码 URL 编码值', () => {
    expect(getCookie('token=hello%20world', 'token')).toBe('hello world')
  })

  it('找不到时返回空字符串', () => {
    expect(getCookie('token=abc', 'missing')).toBe('')
  })

  it('空 cookies 字符串', () => {
    expect(getCookie('', 'token')).toBe('')
  })

  // 已修复：使用 indexOf 找到第一个 = 后截取完整值
  it('cookie 值含 = 时完整解析', () => {
    expect(getCookie('token=abc=def=ghi', 'token')).toBe('abc=def=ghi')
  })

  it('cookie 值含编码的 = 正常解析', () => {
    expect(getCookie('data=a%3Db', 'data')).toBe('a=b')
  })
})

describe('fixedBgmUrl', () => {
  it('补全协议头', () => {
    expect(fixedBgmUrl('/subject/12345')).toBe('https://bgm.tv/subject/12345')
  })

  it('http 替换为 https', () => {
    expect(fixedBgmUrl('http://bgm.tv/subject/123')).toBe('https://bgm.tv/subject/123')
  })

  it('替换 HOST_2 为 HOST', () => {
    expect(fixedBgmUrl('https://bangumi.tv/subject/123')).toBe('https://bgm.tv/subject/123')
  })

  it('替换 HOST_3 为 HOST', () => {
    expect(fixedBgmUrl('https://chii.in/subject/123')).toBe('https://bgm.tv/subject/123')
  })

  it('已是正确格式不变', () => {
    expect(fixedBgmUrl('https://bgm.tv/subject/123')).toBe('https://bgm.tv/subject/123')
  })

  it('空字符串', () => {
    expect(fixedBgmUrl('')).toBe('')
  })
})

describe('matchBgmLink', () => {
  it('用户目录', () => {
    const result = matchBgmLink('https://bgm.tv/user/sai/index')
    expect(result).toEqual({ route: 'Catalogs', params: { userId: 'sai' } })
  })

  it('用户日志', () => {
    const result = matchBgmLink('https://bgm.tv/user/sai/blog')
    expect(result).toEqual({ route: 'Blogs', params: { userId: 'sai' } })
  })

  it('用户收藏人物', () => {
    const result = matchBgmLink('https://bgm.tv/user/sai/mono')
    expect(result).toEqual({ route: 'Character', params: { userId: 'sai' } })
  })

  it('用户好友', () => {
    const result = matchBgmLink('https://bgm.tv/user/sai/friends')
    expect(result).toEqual({ route: 'Friends', params: { userId: 'sai' } })
  })

  it('条目', () => {
    const result = matchBgmLink('https://bgm.tv/subject/454684')
    expect(result).toEqual({ route: 'Subject', params: { subjectId: '454684' } })
  })

  it('超展开帖子', () => {
    const result = matchBgmLink('https://bgm.tv/rakuen/topic/group/350677')
    expect(result).toEqual({ route: 'Topic', params: { topicId: 'group/350677' } })
  })

  it('group/topic 帖子', () => {
    const result = matchBgmLink('https://bgm.tv/group/topic/350677')
    expect(result).toEqual({ route: 'Topic', params: { topicId: 'group/350677' } })
  })

  it('人物', () => {
    const result = matchBgmLink('https://bgm.tv/character/132476')
    expect(result).toEqual({ route: 'Mono', params: { monoId: 'character/132476' } })
  })

  it('person', () => {
    const result = matchBgmLink('https://bgm.tv/person/40794')
    expect(result).toEqual({ route: 'Mono', params: { monoId: 'person/40794' } })
  })

  it('搜索', () => {
    const result = matchBgmLink('https://bgm.tv/subject_search/keyword')
    expect(result).toEqual({
      route: 'Search',
      params: { value: 'keyword', cat: 'subject_all' }
    })
  })

  it('标签', () => {
    const result = matchBgmLink('https://bgm.tv/anime/tag/TV')
    expect(result).toEqual({
      route: 'Tag',
      params: { type: 'anime', tag: 'TV', airtime: undefined }
    })
  })

  it('目录', () => {
    const result = matchBgmLink('https://bgm.tv/index/35176')
    expect(result).toEqual({ route: 'CatalogDetail', params: { catalogId: '35176' } })
  })

  it('日志', () => {
    const result = matchBgmLink('https://bgm.tv/blog/295515')
    expect(result).toEqual({ route: 'Blog', params: { blogId: '295515' } })
  })

  it('个人中心', () => {
    const result = matchBgmLink('https://bgm.tv/user/sukaretto')
    expect(result).toEqual({ route: 'Zone', params: { userId: 'sukaretto' } })
  })

  it('App 内部协议', () => {
    const result = matchBgmLink('https://App/Subject/id:454684')
    expect(result).toEqual({
      route: 'Subject',
      params: { id: '454684' },
      app: true
    })
  })

  it('非 BGM 链接返回 false', () => {
    expect(matchBgmLink('https://example.com')).toBe(false)
  })

  it('空字符串', () => {
    expect(matchBgmLink('')).toBe(false)
  })

  // 已修复：subjectId 清理查询参数
  it('subjectId 清理查询参数', () => {
    const result = matchBgmLink('https://bgm.tv/subject/454684?cat=1')
    expect(result).toEqual({ route: 'Subject', params: { subjectId: '454684' } })
  })

  // 已修复：subjectId 清理尾部斜杠
  it('subjectId 清理尾部斜杠', () => {
    const result = matchBgmLink('https://bgm.tv/subject/454684/')
    expect(result).toEqual({ route: 'Subject', params: { subjectId: '454684' } })
  })

  it('subject/topic 帖子', () => {
    const result = matchBgmLink('https://bgm.tv/subject/topic/33680')
    expect(result).toEqual({ route: 'Topic', params: { topicId: 'subject/33680' } })
  })
})

describe('getAction', () => {
  it('书籍返回读', () => {
    expect(getAction('书籍')).toBe('读')
  })

  it('游戏返回玩', () => {
    expect(getAction('游戏')).toBe('玩')
  })

  it('音乐返回听', () => {
    expect(getAction('音乐')).toBe('听')
  })

  it('默认返回看', () => {
    expect(getAction('动画')).toBe('看')
  })
})

describe('getType', () => {
  it('返回对应 type', () => {
    expect(getType('看过')).toBe('do')
    expect(getType('想看')).toBe('wish')
  })

  it('未知 label 返回默认值', () => {
    expect(getType('未知')).toBe('plain')
  })

  it('自定义默认值', () => {
    expect(getType('未知', 'custom')).toBe('custom')
  })
})

describe('getRating', () => {
  it('返回对应评分', () => {
    expect(getRating(9)).toBe('超神作')
    expect(getRating(7)).toBe('推荐')
    expect(getRating(5)).toBe('不过如此')
  })

  it('undefined 返回空字符串', () => {
    expect(getRating(undefined as any)).toBe('')
  })

  it('小数评分四舍五入', () => {
    expect(getRating(8.4)).toBe('力荐')
    expect(getRating(8.6)).toBe('超神作')
  })
})

describe('getBangumiUrl', () => {
  it('返回 bilibili 链接', () => {
    expect(getBangumiUrl({ site: 'bilibili', id: '12345' })).toBe(
      'https://bilibili.com/bangumi/media/12345'
    )
  })

  it('返回 qq 链接', () => {
    expect(getBangumiUrl({ site: 'qq', id: '12345' })).toBe('https://v.qq.com/detail/12345.html')
  })

  it('未知站点返回空', () => {
    expect(getBangumiUrl({ site: 'unknown', id: '123' })).toBe('')
  })

  it('有 url 时直接返回', () => {
    expect(getBangumiUrl({ site: 'bilibili', id: '1', url: 'https://custom.com' })).toBe(
      'https://custom.com'
    )
  })

  it('空 item', () => {
    expect(getBangumiUrl(null as any)).toBe('')
  })
})

describe('isArray', () => {
  it('普通数组返回 true', () => {
    expect(isArray([1, 2, 3])).toBe(true)
  })

  it('空数组返回 true', () => {
    expect(isArray([])).toBe(true)
  })

  it('对象返回 false', () => {
    expect(isArray({})).toBe(false)
  })

  it('null 返回 false', () => {
    expect(isArray(null)).toBe(false)
  })

  it('undefined 返回 false', () => {
    expect(isArray(undefined)).toBe(false)
  })

  it('字符串返回 false', () => {
    expect(isArray('abc')).toBe(false)
  })
})

describe('freeze', () => {
  it('空数组返回冻结空数组', () => {
    const result = freeze([])
    expect(result).toEqual([])
    expect(result).toHaveLength(0)
  })

  it('非空数组返回原值', () => {
    const arr = [1, 2, 3]
    expect(freeze(arr)).toBe(arr)
  })

  it('空对象返回冻结空对象', () => {
    const result = freeze({})
    expect(result).toEqual({})
  })

  it('非空对象返回原值', () => {
    const obj = { a: 1 }
    expect(freeze(obj)).toBe(obj)
  })

  it('支持函数参数', () => {
    const result = freeze(() => [])
    expect(result).toEqual([])
  })

  it('非空函数返回函数执行结果', () => {
    const arr = [1, 2]
    expect(freeze(() => arr)).toBe(arr)
  })
})

describe('getCommentPlainText', () => {
  it('去除引用块', () => {
    const result = getCommentPlainText('<div class="quote">引用内容</div>实际内容')
    expect(result).toBe('实际内容')
  })

  it('br 转换为换行', () => {
    expect(getCommentPlainText('第一行<br>第二行')).toBe('第一行\n第二行')
  })

  it('去除 HTML 标签', () => {
    expect(getCommentPlainText('<p>hello</p>')).toBe('hello')
  })

  it('bgm 表情提取', () => {
    const result = getCommentPlainText('<img src="test" alt="(bgm123)">一些文字')
    expect(result).toContain('(bgm123)')
  })
})

describe('getCoverMedium', () => {
  it('替换为 /c/ 路径', () => {
    const result = getCoverMedium('https://lain.bgm.tv/pic/cover/g/test.jpg')
    expect(result).toContain('/c/')
  })

  it('用户图替换为 /m/ 路径', () => {
    const result = getCoverMedium('https://lain.bgm.tv/pic/user/g/test.jpg')
    expect(result).toContain('/m/')
  })

  it('非 bgm 图片返回原值', () => {
    expect(getCoverMedium('https://example.com/test.jpg')).toBe('https://example.com/test.jpg')
  })

  it('角色图片返回原值', () => {
    expect(getCoverMedium('https://lain.bgm.tv/pic/crt/g/test.jpg')).toBe(
      'https://lain.bgm.tv/pic/crt/g/test.jpg'
    )
  })
})

describe('getCoverSmall', () => {
  it('替换为 /s/ 路径', () => {
    const result = getCoverSmall('https://lain.bgm.tv/pic/cover/c/test.jpg')
    expect(result).toContain('/s/')
  })

  it('非 bgm 图片返回原值', () => {
    expect(getCoverSmall('https://example.com/test.jpg')).toBe('https://example.com/test.jpg')
  })
})

describe('getCoverLarge', () => {
  it('替换为 /l/ 路径', () => {
    const result = getCoverLarge('https://lain.bgm.tv/pic/cover/c/test.jpg')
    expect(result).toContain('/l/')
  })

  it('size=200 时替换 r/400 为 r/200', () => {
    // 只有当输入已包含 /r/400/ 时才会替换
    const result = getCoverLarge('https://lain.bgm.tv/r/400/pic/cover/c/test.jpg', 200)
    expect(result).toContain('/r/200/')
  })
})

describe('randomizeImgHost', () => {
  it('替换 img 主机号', () => {
    const result = randomizeImgHost('https://img3.doubanio.com/test.jpg')
    expect(result).toMatch(/img[129]\.doubanio\.com/)
  })

  it('非字符串返回原值', () => {
    expect(randomizeImgHost(null as any)).toBe(null)
  })

  it('不带 img 的 URL 返回原值', () => {
    expect(randomizeImgHost('https://example.com/test.jpg')).toBe('https://example.com/test.jpg')
  })
})

describe('guessTotalCount', () => {
  it('正常分页信息', () => {
    const list = {
      _loaded: true,
      list: [1, 2, 3],
      pagination: { page: 1, pageTotal: 10 }
    }
    expect(guessTotalCount(list)).toBe(100)
  })

  it('单页', () => {
    const list = {
      _loaded: true,
      list: [1, 2, 3],
      pagination: { page: 1, pageTotal: 1 }
    }
    expect(guessTotalCount(list)).toBe(3)
  })

  it('无 _loaded 返回 0', () => {
    expect(guessTotalCount({ list: [], pagination: { page: 1, pageTotal: 10 } })).toBe(0)
  })

  it('空列表返回 0', () => {
    expect(
      guessTotalCount({ _loaded: true, list: [], pagination: { page: 1, pageTotal: 10 } })
    ).toBe(0)
  })
})
