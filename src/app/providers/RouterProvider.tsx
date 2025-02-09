import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form1 from '../../../features/forms/form1/ui/PersonalForm';
import Form2 from '../../../features/forms/form2/ui/AddressForm';
import Form3 from '../../../features/forms/form3/ui/LoanForm';
import { FormDataProps } from '../../../shared/types';

const RouterProvider: React.FC<FormDataProps> = ({ data, setData }) => (
  <Router>
    <Routes>
      <Route path="/form1" element={<Form1 data={data} setData={setData} />} />
      <Route path="/form2" element={<Form2 data={data} setData={setData} />} />
      <Route path="/form3" element={<Form3 data={data} setData={setData} />} />
    </Routes>
  </Router>
);

export default RouterProvider;