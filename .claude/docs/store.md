# MobX Store 规范

## Store 继承链

```
State → Computed → Fetch → Action
```

- **State**（extends `@utils/store`）— observable state、init()、save()、readStorage()
- **Computed**（extends State）— @computed 派生数据
- **Fetch**（extends Computed）— API 请求 → setState() + save()
- **Action**（extends Fetch）— 业务逻辑

## Store 文件拆分

每个 store 目录包含：`index.ts`、`state.ts`、`computed.ts`、`fetch.ts`、`action.ts`、`common.ts`（解析器）、`init.ts`（初始状态）、`types.ts`

## 大文件二次拆分（链式中间类）

单文件超过 400 行红线时，按领域切成子目录中的中间类文件，继承链接力，对外导出不变：

```
store/
├── computed.ts          # 聚合入口: export default class Computed extends Derived {}
├── computed/
│   ├── base.ts          # extends State
│   ├── meta.ts          # extends Base
│   └── ...
├── fetch.ts             # 核心请求, extends fetch/extend
└── fetch/
    ├── oss.ts           # extends Computed
    └── ...
```

规则：
- 中间类文件只做「方法搬家」，函数体逐字不变；被调用者所在类必须位于调用者祖先方向（链序 = 依赖序）
- 每个新文件自带裁剪后的 import 子集，基类导入指向上一环（`import Oss from './oss'`）
- 纯函数工具拆为目录 + `index.ts` 再导出（如 `store/utils/`），消费方 `from './utils'` 零改动

已应用：`home/subject/store`（computed/ fetch/ action/ utils/ 四组）

## 18 个 Domain Store

| Store | 职责 |
|-------|------|
| `calendarStore` | 放送日历 |
| `collectionStore` | 用户收藏 |
| `discoveryStore` | 发现/搜索 |
| `monoStore` | 人物/制作人员 |
| `otaStore` | OTA 数据 |
| `rakuenStore` | 超展开（论坛） |
| `searchStore` | 搜索 |
| `smbStore` | SMB 网络文件 |
| `subjectStore` | 条目（动画/书籍/游戏） |
| `systemStore` | 系统设置 |
| `tagStore` | 标签 |
| `themeStore`（别名 `_`）| 主题/样式 |
| `timelineStore` | 时间线 |
| `tinygrailStore` | 小圣杯（股票游戏） |
| `uiStore` | UI 状态 |
| `userStore` | 用户认证 |
| `usersStore` | 其他用户信息 |

全局初始化：`src/stores/global.ts` → `GlobalStores.init()`
