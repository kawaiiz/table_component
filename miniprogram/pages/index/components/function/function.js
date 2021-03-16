var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { mockData } from '../../../../public/utils/util';
const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {},
    data: {
        tableColumns: [{
                title: "绑定事件名",
                key: "key",
            }, {
                title: "介绍",
                key: "desc",
            }, {
                title: "类型",
                key: "type",
            }],
        dataList: [],
        getListLoading: false
    },
    methods: {
        options: {},
        getList() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    this.setData({
                        getListLoading: true
                    });
                    const res = yield mockData('data', [{
                            key: 'bindclicklistitem',
                            desc: '点击列表行事件',
                            type: 'Function(e);  e.detail.value = {index:number（当前行序号）,item: any（当前行的内容）}'
                        }, {
                            key: 'bindclickexpand',
                            desc: '点击展开内容事件',
                            type: 'Function(e); e.detail.value = {type:(这个按钮的含义字段，如‘close’),index:(当前的行),item:(当前行的数据)};(这是我这里定义的结构，具体可以自己定义在expand-component里)}'
                        }, {
                            key: 'bindclickaction',
                            desc: '点击抽象节点事件',
                            type: 'Function(e); e.detail.value = {type:(这个按钮的含义字段，如‘close’),index:(当前的行),item:(当前行的数据)};(这是我这里定义的结构，具体可以自己定义在action-td里)}'
                        }, {
                            key: 'bindcheckkey',
                            desc: '勾选事件,返回被勾选项的rowKey数组',
                            type: 'Function(e); e.detail.value = any[]//(数组内每一项是rowKey字段定义的数据的toString()结果)'
                        }, {
                            key: 'bindscrolltolower',
                            desc: '滚动触底',
                            type: 'Function() '
                        }, {
                            key: 'bindscrolltoupper',
                            desc: '滚动触顶',
                            type: 'Function() '
                        }]);
                    this.setData({
                        dataList: res.data,
                        getListLoading: false
                    });
                }
                catch (e) {
                    this.setData({
                        getListLoading: false
                    });
                    console.log(e);
                }
            });
        },
        initComponent() {
            this.getList();
        },
    },
    lifetimes: {
        attached: function () { },
        ready: function () { this.initComponent(); },
        moved: function () { },
        detached: function () { },
    },
    pageLifetimes: {
        show: function () { },
        hide: function () { },
        resize: function () { },
    },
});
