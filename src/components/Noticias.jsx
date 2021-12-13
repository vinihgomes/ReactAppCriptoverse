import React, {useState} from 'react';
import { Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';

import { useGetCriptosQuery } from '../services/criptoAPI';
import { useGetCriptoNoticiasQuery } from '../services/criptoNoticiasAPI';
{/*import Loader from './Loader';*/}

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg' 

const { Text, Title } = Typography;
const { Option } = Select;

const Noticias = ({ simplified }) => {
    const [categoriaNoticia, setCategoriaNoticia] = useState('Criptomoeda');
    const { data } = useGetCriptosQuery(100);
    const {data: criptoNoticias } = useGetCriptoNoticiasQuery({ categoriaNoticia, count: simplified ? 6 : 12 });

    if(!criptoNoticias?.value) return 'Loading...';
    
    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select showSearch className='select-news' placeholder='Selecione uma criptomoeda' optionFilterProp='children' onChange={(value) => setCategoriaNoticia(value)} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        <Option value='Criptomoeda'>Criptomoedas</Option>
                        {data?.data?.coins.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
                    </Select>
                </Col>
            )}
            {criptoNoticias.value.map((news, i) => ( 
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.name}</Title>
                                <img style={{maxWidth: '100px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt=''/>
                            </div>
                            <p>{news.description > 100 ? `${news.description.substring(0, 100)} ...`: news.description}</p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src= {news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default Noticias
