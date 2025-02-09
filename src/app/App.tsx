import { useState } from 'react';
import RouterProvider from '../app/providers/RouterProvider';
import { FormData } from '../../shared/types';

const App: React.FC = () => {
  const [data, setData] = useState<FormData>({
    phone: '',
    firstName: '',
    lastName: '',
    gender: '',
    workplace: '',
    address: '',
    loanAmount: 200,
    loanTerm: 10
  });
  return <RouterProvider data={data} setData={setData} />;
};

export default App;
