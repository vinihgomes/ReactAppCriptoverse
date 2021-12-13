import React , {useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetDetalhesCriptoQuery, useGetHistoricoCriptoQuery } from '../services/criptoAPI'

import LineChart from './LineChart'

const { Title, Text } = Typography;
const { Option } = Select;

const CriptoDetalhes = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data,isFetching} = useGetDetalhesCriptoQuery(coinId);
    const { data: coinHistory} = useGetHistoricoCriptoQuery({coinId, timePeriod});
    const detalhesCripto = data?.data?.coin;
    const time = ['7d', '24h', '30d',  '3m', '1y', '3y', '5y'];
    if(isFetching) return 'Loading...';

  const stats = [
    { title: 'Preço em USD', value: `$ ${detalhesCripto.price && millify(detalhesCripto.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: detalhesCripto.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${detalhesCripto.volume && millify(detalhesCripto.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${detalhesCripto.marketCap && millify(detalhesCripto.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'Recorde Histórico (Média Diária)', value: `$ ${millify(detalhesCripto.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Número de negociações', value: detalhesCripto.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Número de trocas', value: detalhesCripto.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Abastecimento aprovado', value: detalhesCripto.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Volume Total', value: `$ ${millify(detalhesCripto.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Valor Circulante', value: `$ ${millify(detalhesCripto.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ];
    return (
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title level={2} className='coin-name'>{detalhesCripto.name}({detalhesCripto.slug}) Preço</Title>
                <p>
                    Preço atual {detalhesCripto.name} em dólares americanos.
                    Visualizar estatísticas, Market Cap e Volumes.
                </p>
            </Col>
            <Select defaultValue="7d" className="select-timeperiod" placeholder="Selecione um período" onChange={(value) => setTimePeriod(value)}>
                {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select>
            <LineChart coinHistory={coinHistory} currentPrice={millify(detalhesCripto.price)} coinName={detalhesCripto.name}/>
            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-detailes-heading'>
                            {detalhesCripto.name} Valores Estatísticos
                        </Title>
                            <p> Uma visão geral mostrando os status do {detalhesCripto.name}</p>
                    </Col>
                    {stats.map(({ icon, title, value}) =>
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col> 
                    )}
                </Col>
                <Col className='other-stats-info'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-detailes-heading'>
                            {detalhesCripto.name} Outras Estatísticas
                        </Title>
                            <p> Uma visão geral mostrando os status de todas as criptomoedas</p>
                    </Col>
                    {genericStats.map(({ icon, title, value}) =>
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col> 
                    )}
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        O que é {detalhesCripto.name} (Inglês)
                        {HTMLReactParser(detalhesCripto.description)}
                    </Title>
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'> 
                        {detalhesCripto.name} Links
                    </Title>
                    {detalhesCripto.links.map((link) =>
                        <Row className='coin-link' key={link.name}>
                            <Title level={5} className='link-name'>
                                {link.type}
                            </Title>
                            <a href={link.url} target='_blank' rel='noreferrer'>
                                {link.name}
                            </a>
                        </Row>
                    )}
                </Col>
            </Col>
        </Col>
    )
}

export default CriptoDetalhes
