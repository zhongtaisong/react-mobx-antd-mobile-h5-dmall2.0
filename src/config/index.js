// 首页 - 数据
import indexState from '@pages/Index/state';
// 注册 - 数据
import registerState from '@pages/Register/state';
// 结算页 - mobx数据
import settlementPageState from '@pages/SettlementPage/state';
// tabBar - mobx数据
import footerCopyrightState from '@com/footerCopyright/state';
// url前缀
const PUBLIC_URL = 'http://192.168.2.105:8000/api/';
// const PUBLIC_URL = 'http://172.16.92.41:8000/api/';
// const PUBLIC_URL = 'http://192.168.3.9:8000/api/';
// 加密key
const PWD_KEY = 'fjreqjklnvmsn9u9084931jj雨色轻风意柔情怜花殇12612132212';
// 路由黑名单
const BLACK_LIST_PATH = [
    // 我的购物车
    '/views/products/cart', 
    // 我的订单
    '/views/products/order', 
    // 我的收藏
    '/views/products/collection',
    // 用户中心
    '/views/user',
    // 结算页
    '/views/products/cart/settlement',
    // 订单详情
    '/views/products/cart/orderDetails'
];
// 路由白名单
const WHITE_LIST_PATH = [
    // 首页
    '/views/home',
    // 杂货铺
    '/views/products',
    // 网站说明
    '/views/web',
    // 留言
    '/views/message',
    // 商品详情
    '/views/products/detail'
];

export {
    PUBLIC_URL, PWD_KEY, BLACK_LIST_PATH, WHITE_LIST_PATH, indexState, registerState, 
    settlementPageState, footerCopyrightState
};