import { Container, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FormDataProps } from '../../../../shared/types';
import { useState } from 'react';

const Form3: React.FC<FormDataProps> = ({ data, setData }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  
  const handleSubmit = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: `${data.firstName} ${data.lastName}` })
      });
      if (response.ok) {
        setShowModal(true);
      }
    } catch (error) {
      console.error('Ошибка отправки заявки', error);
    }
  };

  return (
    <Container>
      <Form.Group>
        <Form.Label>Сумма займа: {data.loanAmount}$</Form.Label>
        <Form.Range min={200} max={1000} step={100} name="loanAmount" value={data.loanAmount} onChange={(e) => setData({ ...data, loanAmount: Number(e.target.value) })} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Срок займа: {data.loanTerm} дней</Form.Label>
        <Form.Range min={10} max={30} step={1} name="loanTerm" value={data.loanTerm} onChange={(e) => setData({ ...data, loanTerm: Number(e.target.value) })} />
      </Form.Group>
      <Button onClick={() => navigate('/form2')}>Назад</Button>
      <Button onClick={handleSubmit}>Подать заявку</Button>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Поздравляем!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Поздравляем, {data.lastName} {data.firstName}. Вам одобрена {data.loanAmount}$ на {data.loanTerm} дней.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Form3;