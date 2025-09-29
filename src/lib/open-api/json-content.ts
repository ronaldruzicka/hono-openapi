import type { ZodType } from "zod";

type Options<TSchema extends ZodType> = {
  description: string;
  isRequired?: boolean;
  schema: TSchema;
};

export const jsonContent = <TSchema extends ZodType>({
  description,
  schema,
  isRequired = true,
}: Options<TSchema>) => {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
    required: isRequired,
  };
};
