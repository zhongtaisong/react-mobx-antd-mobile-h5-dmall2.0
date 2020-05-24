export const tabInfo = [
    { 
        key: 'home', 
        title: '首页', 
        icon: require('@img/tab_icon/home.png'),
        selectedIcon: require('@img/tab_icon/home_active.png'),
        path: '/views/home'
    },
    { 
        key: 'products', 
        title: '杂货铺', 
        icon: require('@img/tab_icon/products.png'),
        selectedIcon: require('@img/tab_icon/products_active.png'),
        path: '/views/products'
    },
    { 
        key: 'cart', 
        title: '购物车', 
        icon: require('@img/tab_icon/cart.png'),
        selectedIcon: require('@img/tab_icon/cart_active.png'),
        path: '/views/cart',
        isBadge: true
    },
    { 
        key: 'my', 
        title: '我的', 
        icon: require('@img/tab_icon/my.png'),
        selectedIcon: require('@img/tab_icon/my_active.png'),
        path: '/views/my'
    }
];