import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel} from 'react-bootstrap';

const HomeCarousel = () => {
    return (
        <div className='container mt-4' style={{width:"60%"}}>
            <Carousel variant='dark'>
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/backimg1.png"
                    alt="First slide"
                />
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/backimg3.png"
                    alt="Second slide"
                />
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/backimg2.png"
                    alt="Third slide"
                />
                </Carousel.Item>
            </Carousel>
        </div>
    )
};

export default HomeCarousel;
