import React, {useEffect, useState} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCriptosQuery } from '../services/criptoAPI'

const Criptomoedas = ({simplified}) => {
    const count = simplified ? 10 : 100;
    const { data: criptoslist, isFetching } = useGetCriptosQuery(count);
    const [criptos, setCriptos] = useState([]);
    const [termoBusca, setTermoBusca] = useState('');

    useEffect(() => {
        const filteredData = criptoslist?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(termoBusca.toLowerCase()));
        setCriptos(filteredData);
    }, [criptoslist, termoBusca])

    if(isFetching) return 'Loading...';
    return (
        <>
            {!simplified &&(
            <div className='search-crypto'>
                <Input placeholder='Buscar Criptomoeda' onChange={(e)=> setTermoBusca(e.target.value)} />
            </div>
            )}
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {criptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                        <Link to={`/CriptoDetalhes/${currency.id}`}>
                            <Card 
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img className='crypto-image' src={currency.iconUrl} />}
                            hoverable
                            >
                                <p>Preço: US${(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Variação diária: {millify(currency.change)}%</p>

                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Criptomoedas
