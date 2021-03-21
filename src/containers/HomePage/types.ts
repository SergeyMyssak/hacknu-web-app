export type FormValues = {
  readonly category: string;
  readonly address: string;
  readonly info: string;
  readonly description: string;
  readonly need: string;
};

export enum FormInputs {
  Category = 'category',
  Address = 'address',
  Info = 'info',
  Description = 'description',
  Need = 'need',
}
