import * as Yup from "yup";

export const Validation = (formJson: any) => {
  
  const requiredFields: { [key: string]: any } = {};

  for (const input of formJson) {
    
    if (!input.validation) continue;

    let schema = Yup.string();

    for (const rule of input.validation) {
      if (rule.type === "required") {
        schema = schema.required("Este campo es requerido");
      }

      if (rule.type === "minLength") {
        schema = schema.min(
          (rule as any).value || 2,
          `Mínimo de ${(rule as any).value || 2} caracteres`
        );
      }

      if (rule.type === "email") {
        schema = schema.email("Revise el formato del email");
      }
    }

    requiredFields[input.name] = schema;
  }
  return Yup.object({ ...requiredFields });
  
  
};
