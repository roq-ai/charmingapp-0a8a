import * as yup from 'yup';

export const cakeDesignValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  business_id: yup.string().nullable(),
});
