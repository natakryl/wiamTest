export interface FormData {
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  workplace: string;
  address: string;
  loanAmount: number;
  loanTerm: number;
}

export interface FormDataProps {
  data: FormData;
  setData: (data: FormData) => void;
}