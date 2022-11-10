import Realm from 'realm';
import { FormSchema } from '../schemas/FormSchema';

export const getRealm = () => {
  return Realm.open({
    schema: [FormSchema],
  });
};
