export type Replace<TypeToBeChecked, NewValueToUse extends Partial<TypeToBeChecked>> = Omit<
  TypeToBeChecked,
  keyof NewValueToUse
> &
  NewValueToUse;

export const satisfies =
  <T>() =>
  <U extends T>(u: U) =>
    u;
