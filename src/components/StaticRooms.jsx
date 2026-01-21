import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const cardData = [
  { id: 1, title: "Presidential", desc: "The Presidential Room represents the pinnacle of luxury and sophistication.", price:"Price: 160$", rating:"Rating: ⭐⭐⭐⭐⭐ (4.9)", review:"Review: Absolutely outstanding! The best room I have ever stayed in.", img: "Presidential.jpg" },
  { id: 2, title: "Vip", desc: "The VIP Room is designed for guests who value comfort, privacy, and elegance.", price:"Price: 90$", rating:"Rating: ⭐⭐⭐⭐☆ (4.7)", review:"Review: Loved the privacy and comfort. Definitely worth booking again.", img: "Vip.jpg" },
  { id: 3, title: "Executive", desc: "The Executive Room is ideal for business travelers and professionals seeking comfort with functionality.", price:"Price: 65$", rating:"Rating: ⭐⭐⭐⭐☆ (4.5)", review:"Review: Very convenient for business travel. Quiet and comfortable.", img: "Executive.jpg" },
  { id: 4, title: "Double", desc: "The Double Room is a comfortable and practical choice for couples, friends, or small families.", price:"Price: 45$", rating:"Rating: ⭐⭐⭐⭐☆ (4.2)", review:"Review: Nice room and very comfortable bed. Great value for money.", img: "Double.jpg" },
];

function StaticRooms() {
  return (
    <div className='d-flex flex-wrap space-evenly'>
        <div className='px-30 py-16'>
      <Container>
        <div className='mb-12'>
            <p className='text-sm tracking-widest uppercase text-gray-500'>Rooms</p>
            <h2 className='text-4xl font-serif font-semibold text-gray-800'>Rooms & Details</h2>
        </div>
      <Row xs={1} md={2} className="g-4">
        {cardData.map((item) => (
          <Col key={item.id}>
            <Card>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.desc}</Card.Text>
                <Card.Text>{item.price}</Card.Text>
                <Card.Text>{item.rating}</Card.Text>
                <Card.Text>{item.review}</Card.Text>
                <Link to={'/rooms'}><button className='bg-lime-500 text-black font-bold py-2 px-7 !rounded-lg hover:bg-lime-600 transition'>Details</button></Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
        </div>    
    </div>
  )
}

export default StaticRooms
