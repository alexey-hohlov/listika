import * as yup from 'yup';

export const listSchema = yup.object({
  listTitle: yup.string().required().max(30),
});

export const userNameSchema = yup.object({
  userName: yup.string().required().max(30),
});

export const taskSchema = yup.object({
  taskTitle: yup.string().required().max(100),
});
