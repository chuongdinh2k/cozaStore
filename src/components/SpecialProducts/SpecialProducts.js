import React from 'react'
import "./_SpecialProducts.scss"
import Spinner from '../Spinner';
import {useDispatch,useSelector} from 'react-redux';
import {getTopRatingProducts, showQickView, getQuickViewProduct} from '../../redux/actions';
import {topRatingProducts$} from '../../redux/selector'; 
import { Col, Row } from 'reactstrap'
function SpecialProducts() {
    React.useEffect(()=>{
        dispatch(getTopRatingProducts.getTopRatingProductsRequest());
    },[])
    const topRatingProducts = useSelector(topRatingProducts$);
    // const state = useSelector((state)=>state.product);
    // console.log(state);
    const dispatch = useDispatch();

    // button showQickView 
    const showQickViewClick=(id)=>{
        console.log(id);
        dispatch(getQuickViewProduct.getQuickViewProductRequest({
            "id":id
        }));
        dispatch(showQickView());
    }
    // render data 
    const result = !topRatingProducts? <Spinner/>:topRatingProducts.map(item=>
    <Col xs={12} sm={6} md={3} key={item._id}>
        <div className="item">
            <div className="image">
                <img src={item.image}
                    alt="Special Products 1"
                />
                <a onClick={()=>showQickViewClick(item._id)}></a>
            </div>
        </div>
    </Col>)
    return (
        <div className="SpecialProducts">
            <h3>SPECIAL PRODUCTS</h3>
            <Row>
                {result}               
            </Row>
        </div>
    )
}

export default SpecialProducts
