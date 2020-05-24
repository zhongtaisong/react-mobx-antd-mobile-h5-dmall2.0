import Home from '@pages/Home';
import Products from '@pages/Products';
import ProductsDetail from '@pages/ProductsDetail';
import MyShoppingCart from '@pages/MyShoppingCart';
import SettlementPage from '@pages/SettlementPage';
import OrderDetails from '@pages/OrderDetails';
import MyCollection from '@pages/MyCollection';
import MyEvaluation from '@pages/MyEvaluation';
import MyOrder from '@pages/MyOrder';
import UserCenter from '@pages/UserCenter';
import Message from '@pages/Message';
import My from '@pages/My';
import PersonalInformation from '@pages/UserCenter/components/PersonalInformation';
import LoginPassword from '@pages/UserCenter/components/LoginPassword';
import ReceivingAddress from '@pages/UserCenter/components/ReceivingAddress';

// auth 登录权限
// noDirectAccess 禁止直接访问
export default [
    { 
        path: '/views',
        redirect: '/views/home',
        title: '首页'
    },
    { 
        path: '/views/home',
        name: 'Home',
        component: Home,
        title: '首页'
    },
    { 
        path: '/views/products',
        name: 'Products',
        component: Products,
        title: '杂货铺'
    },
    { 
        path: '/views/message',
        name: 'Message',
        component: Message,
        title: '留言'
    },
    { 
        path: '/views/cart',
        name: 'MyShoppingCart',
        component: MyShoppingCart,
        title: '我的购物车',
        noDirectAccess: true
    },
    { 
        path: '/views/order',
        name: 'MyOrder',
        component: MyOrder,
        title: '我的订单',
        noDirectAccess: true
    },
    { 
        path: '/views/collection',
        name: 'MyCollection',
        component: MyCollection,
        title: '我的收藏',
        noDirectAccess: true
    },
    { 
        path: '/views/user',
        name: 'UserCenter',
        component: UserCenter,
        title: '用户中心',
        noDirectAccess: true
    },
    { 
        path: '/views/user/info',
        name: 'PersonalInformation',
        component: PersonalInformation,
        title: '用户中心-个人资料',
        // noDirectAccess: true
    },
    { 
        path: '/views/user/pwd',
        name: 'LoginPassword',
        component: LoginPassword,
        title: '用户中心-登录密码',
        // noDirectAccess: true
    },
    { 
        path: '/views/user/address',
        name: 'ReceivingAddress',
        component: ReceivingAddress,
        title: '用户中心-收货地址',
        // noDirectAccess: true
    },
    { 
        path: '/views/products/detail/:id',
        name: 'ProductsDetail',
        component: ProductsDetail,
        title: '商品详情'
    },
    { 
        path: '/views/products/cart/settlement',
        name: 'SettlementPage',
        component: SettlementPage,
        title: '结算页',
        noDirectAccess: true
    },
    { 
        path: '/views/products/cart/orderDetails',
        name: 'OrderDetails',
        component: OrderDetails,
        title: '订单详情',
        noDirectAccess: true
    },
    { 
        path: '/views/products/cart/evaluate',
        name: 'MyEvaluation',
        component: MyEvaluation,
        title: '我的评价',
        noDirectAccess: true
    },
    {
        path: '/views/my',
        name: 'My',
        component: My,
        title: '我的',
        noDirectAccess: true
    }
];