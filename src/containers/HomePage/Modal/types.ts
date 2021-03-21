export type FormValues = {
  readonly telephone: string;
};

export enum FormInputs {
  Telephone = 'telephone',
}

export interface ModalProps {
  onCloseModal: any;
  submitPhone?: any;
}
