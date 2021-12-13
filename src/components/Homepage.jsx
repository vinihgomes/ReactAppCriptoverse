import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCriptosQuery } from '../services/criptoAPI';
import {Criptomoedas, Noticias} from '../components';


const { Title } = Typography;

const Homepage = () => {
    const { data, isFetching } = useGetCriptosQuery(10);
    const globalStats = data?.data?.stats;  

    if(isFetching) return 'Loading...';
    console.log(globalStats) 
  {/*}  if (isFetching) return <Loader />*/}
        return (
        <>
            <Title level={2} className='heading'>
                Status Globais - Criptomoedas
            </Title>
            <Row gutter={[32, 32]}>
            <Col span={12}>
                    <Statistic title="Total de Criptomoedas" value={globalStats.total   } />
                </Col>  
                <Col span={12}>
                    <Statistic title="Operações Totais" value={globalStats.totalExchanges}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Total de Market Cap" value={millify(globalStats.totalMarketCap)}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Volume total em 24h" value={millify(globalStats.total24hVolume)}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Mercados Totais" value={millify(globalStats.totalMarkets)}/>
                </Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Criptomoedas no Mundo</Title>
                <Title level={3} className="show-more"><Link to="/criptomoedas">Mais detalhes</Link></Title>
             </div>
             <Criptomoedas simplified/>
             <div>
             <Title level={2} className="home-title">Últimas notícias Cripto</Title>
                <Title level={3} className="show-more"><Link to="/noticias">Mais detalhes</Link></Title>
             </div>
             <Noticias simplified/>
        </>
    )
}

export default Homepage
