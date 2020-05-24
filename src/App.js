import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from '@axios';
// 全局公共方法
import { ScrollToTop } from '@utils';
// 首页
import Index from '@pages/Index';
// 登录
import Login from '@pages/Login';
// 注册
import Register from '@pages/Register';

// App
@observer
class App extends React.Component {

    componentDidMount() {
        this.selectDicData();
    }

    // 查字典表
    selectDicData = async () => {
        const res = await new Promise((resolve, reject) => {
            axios.get('dic/selectDic', {
                params: {}
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
        
        try{
            if( res.data.code === 200 ){
                let { data } = res.data || {};
                if( data ){
                    data['GENDER'] = {
                        0: '男',
                        1: '女',
                        2: '保密'
                    };
                    sessionStorage.setItem('tableDic', JSON.stringify(data));
                    
                    let newData = data;
                    for(let k in newData){
                        let arr = [];
                        for(let [key, value] of Object.entries(newData[k])){
                            arr.push({
                                code: key,
                                name: value
                            });
                        }
                        newData[k] = arr;
                    }
                    sessionStorage.setItem('selectDic', JSON.stringify(newData));
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className='dm_App'>
                <Router>
                    <ScrollToTop>
                        <Switch>
                            <Redirect exact strict from='/' to='/views' />
                            <Route path='/views' component={ Index } />
                            <Route path='/login' component={ Login } />
                            <Route path='/register' component={ Register } />
                        </Switch>
                    </ScrollToTop>
                </Router>
            </div>
        );
    }
}

export default App;