import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FormDataProps } from '../../../../shared/types';
import { useState, useEffect } from 'react';

const Form2: React.FC<FormDataProps> = ({ data, setData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!categories.length) {
      fetch('https://dummyjson.com/products/categories')
        .then((res) => res.json())
        .then((data) => setCategories(data.map((item: { name: string }) => item.name)))
        .catch((err) => console.error('Ошибка загрузки категорий:', err));
    }
  }, [categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.workplace) newErrors.workplace = 'Выберите место работы';
    if (!data.address) newErrors.address = 'Введите адрес';
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      navigate('/form3');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Container>
      <Form.Group>
        <Form.Label>Место работы</Form.Label>
        <Form.Select name="workplace" value={data.workplace} onChange={handleChange}>
          <option value="">Выберите...</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </Form.Select>
        {errors.workplace && <div className="text-danger">{errors.workplace}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Адрес проживания</Form.Label>
        <Form.Control type="text" name="address" value={data.address} onChange={handleChange} />
        {errors.address && <div className="text-danger">{errors.address}</div>}
      </Form.Group>
      <Button onClick={() => navigate('/form1')}>Назад</Button>
      <Button onClick={handleNext}>Далее</Button>
    </Container>
  );
};

export default Form2;