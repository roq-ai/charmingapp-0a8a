import * as yup from 'yup';

export const customizedCakeValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable(),
  cake_design_id: yup.string().nullable(),
});
