import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
// less样式
import './index.less';

// 单品推广
@observer
class Index extends React.Component {
    render() {
        const { productsList=[] } = this.props;
        return (
            <WingBlank>
                <Carousel
                    vertical
                    dots={ false }
                    dragging={ false }
                    swiping={ false }
                    autoplay
                    infinite
                    autoplayInterval={ 4000 }
                    className='dm_recommend'
                >
                    {
                        productsList.map( item => {
                            return (
                                <Link className="v-item ellipsis" key={ item.id } to={'/views/products/detail/' + item.id}>【广告】{ item.description }</Link>
                            );
                        } )
                    }
                </Carousel>
            </WingBlank>
        );
    }
}

export default Index;