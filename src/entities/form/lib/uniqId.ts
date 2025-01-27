import { v4 as uuidv4 } from 'uuid';

const uniqIds: string[] = [];

export const getLabelId = (num: number) => {
  if (uniqIds[num]) {
    return uniqIds[num];
  }
  uniqIds.push(uuidv4());
  return uniqIds[num];
};
