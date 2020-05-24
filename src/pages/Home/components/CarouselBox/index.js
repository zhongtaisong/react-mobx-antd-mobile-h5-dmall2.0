import React from 'react';
import { Carousel } from 'antd-mobile';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
// url前缀
import { PUBLIC_URL } from '@config';
// less样式
import './index.less';

// 走马灯区域 + 首页推荐
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgHeight: 176
        };
    }

    render() {
        const { carouselList=[] } = this.props;
        const { imgHeight } = this.state;
        return (
            <div className='dm_CarouselBox'>
                <Carousel 
                    autoplay
                    infinite
                    dotStyle={{ background: '#D6D6D6' }}
                    dotActiveStyle={{ background: '#1890ff' }}
                >
                    {
                        carouselList.map( item => {
                            return (
                                <Link key={ item.id } 
                                    to={'/views/products/detail/' + item.id}
                                    style={{ display: 'inline-block', width: '100%', height: imgHeight }}
                                >
                                    <img src={ `${ PUBLIC_URL }${ item.bannerPic }` } alt='' title={ item.description } 
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </Link>
                            );
                        } )
                    }
                </Carousel>
            </div>
        );
    }
}

export default Index;