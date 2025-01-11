export const InitialValues = (formJson: any) => {
  const initialValues: { [key: string]: any } = {};
 
  for (const input of formJson) {
    initialValues[input.name] = input.value;

  }
  return initialValues
  
};
