import { Columns } from '../../../../public/components/public/table/data'
import { DataListItem } from '../../data'
import { mockData } from '../../../../public/utils/util'

// 获取应用实例
const app = getApp<IAppOption>()

type InitData = {
  dataList: DataListItem[],
  tableColumns: Columns[],
  pageNum: number,// 分页
  pageSize: number, // 单页数量 
  pageCount: number,// 总页数
  getListLoading: boolean,
}

type InitProperty = {

}

type InitMethod = {
  options: any
  handleClickItem(e: GlobalData.WxAppletsEvent): void
  getList(): void,
  initComponent(): void
}



Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    tableColumns: [{
      title: "姓名",
      key: "name",
    }, {
      title: "年龄",
      key: "age",
    }, {
      title: "性别",
      key: "sex",
    }, {
      title: "额外属性1",
      key: "prototype1",
    }, {
      title: "额外属性2额外属性2额外属性2额外属性2",
      key: "prototype2",
    }, {
      title: "额外属性3额外属性3额外属性3额外属性3",
      key: "prototype3",
      width: "300rpx"
    }],// table 表头参数
    dataList: [],// 学校数组
    pageNum: 1,
    pageSize: 10,
    pageCount: 1,
    getListLoading: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    options: {},
    handleClickItem(e) {
      console.log(e)
      const { index, item } = e.detail.value
      wx.showToast({
        title: `点击第${index + 1}行`
      })
    },
    // 获取列表
    async getList() {
      try {
        const { pageNum, pageSize, pageCount, dataList, getListLoading } = this.data
        if (pageNum > pageCount) return
        if (getListLoading) return
        this.setData({
          getListLoading: true,
        })
        const res = await mockData<DataListItem>('list', {
          id: 1,
          name: '兼职人员',
          age: 10,
          sex: '男',
          prototype1: '属性一',
          prototype2: '属性二很长没有设置宽度',
          prototype3: '属性三很长设置了宽度',
        }, "name", pageNum, pageSize)
        this.setData({
          dataList: dataList.concat(res.data.list),
          pageCount: res.data.pageCount,
          getListLoading: false,
          pageNum: res.data.list.length > 0 ? pageNum + 1 : pageNum,
        })
      } catch (e) {
        this.setData({
          getListLoading: false,
        })
        console.log(e)
      }
    },
    initComponent() {
      this.getList()
    },
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    ready: function () { this.initComponent() },
    moved: function () { },
    detached: function () { },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },
})

export { }