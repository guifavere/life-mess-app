import { z } from 'zod';

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (true) {
    case issue.code === z.ZodIssueCode.invalid_type && issue.received === z.ZodParsedType.undefined:
      return { message: 'obrigatório' };
    case issue.code === z.ZodIssueCode.invalid_string && issue.validation === 'email':
      return { message: 'email inválido' };
    case issue.code === z.ZodIssueCode.too_small && issue.type === 'string':
      return { message: `deve conter ${issue.exact ? "exatamente" : issue.inclusive ? `pelo menos` : `mais de`} ${issue.minimum} caractere(s)` };
    default:
      return { message: ctx.defaultError };
  }
};
