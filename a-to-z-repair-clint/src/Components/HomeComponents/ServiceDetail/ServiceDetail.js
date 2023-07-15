import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from "framer-motion";
import React, { useContext } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import Bounce from 'react-reveal/Rotate';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './ServiceDetail.css';

const ServiceDetail = ({ menuData }) => {

    const { setSelectedService } = useContext(UserContext);

  return (
    <>
      <section className="main-card--cointainer servicess">
        {menuData.map((service) => {
          const { _id, name, category, image, description, price } = service;

          return (
            <Col  className="mt-5 ">
                <motion.div  drag dragConstraints={{left:0, top:0, right:0, bottom:0}} dragElastic={0.5}>
                    <Card className="border-0 p-3 container card-container ">
                        <Bounce top cascade>
                            <p>Type: {category}</p>
                            <img className='img-fluid' src={image} alt={name} />
                            <Card.Body>
                                <Card.Title as="h5" className="text-info">{name}</Card.Title>
                                <Card.Text as='p' className="text-muted">{description}</Card.Text>
                            </Card.Body>  
                            <Card.Footer className='d-flex justify-content-between align-items-center border-0'>
                                <h5>৳ {price}</h5>
                                <Button  variant='info'  as={Link} to="/tech" onClick={() => setSelectedService(service)} className="main-button"><FontAwesomeIcon icon={faShoppingCart}  />  Book</Button>            
                            </Card.Footer>
                        </Bounce>
                    </Card>
                </motion.div>
            </Col>
          );
        })}
      </section>
    </>
  );
};

export default ServiceDetail;
