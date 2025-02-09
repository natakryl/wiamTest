import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FormDataProps } from '../../../../shared/types';
import { useState } from 'react';
import InputMask from 'react-input-mask'; 

const Form1: React.FC<FormDataProps> = ({ data, setData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value;
    if (e.target.name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setData({ ...data, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.phone) newErrors.phone = 'Введите номер телефона';
    if (!data.firstName) newErrors.firstName = 'Введите имя';
    if (!data.lastName) newErrors.lastName = 'Введите фамилию';
    if (!data.gender) newErrors.gender = 'Выберите пол';
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      navigate('/form2');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Container>
      <Form.Group>
        <Form.Label>Телефон</Form.Label>
        <InputMask
          mask="0999 999 999" 
          value={data.phone}
          onChange={handleChange}
          name="phone"
          placeholder="0XXX XXX XXX"
          maskChar=" "
        >
          {(inputProps: any) => <Form.Control {...inputProps} type="tel" required />}
        </InputMask>
        {errors.phone && <div className="text-danger">{errors.phone}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Имя</Form.Label>
        <Form.Control type="text" name="firstName" value={data.firstName} onChange={handleChange} />
        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Фамилия</Form.Label>
        <Form.Control type="text" name="lastName" value={data.lastName} onChange={handleChange} />
        {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Пол</Form.Label>
        <Form.Select name="gender" value={data.gender} onChange={handleChange}>
          <option value="">Выберите...</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </Form.Select>
        {errors.gender && <div className="text-danger">{errors.gender}</div>}
      </Form.Group>
      <Button onClick={handleNext}>Далее</Button>
    </Container>
  );
};

export default Form1;
