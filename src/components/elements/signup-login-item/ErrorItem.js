import React from 'react';
import { isEmpty } from 'lodash';

function errors(list, key) {
  const keyInvalid = 'email or password';
  if (list[key]) {
    return list[key];
  }
  if (list[keyInvalid]) {
    return list[keyInvalid];
  }
  return [];
}

export default ({ listError, errorKey }) => {
  return (
    <ul className="error-messages">
      {errors(listError, errorKey) &&
        !isEmpty(errors(listError, errorKey)) &&
        errors(listError, errorKey).map(item => {
          if (item === 'can\'t be blank') {
            return <li key={`${errorKey}_error`}>{`${errorKey} ${item}`}</li>;
          }
          return <li key={`${errorKey}_error`}>{`${errorKey} ${item}`}</li>;
        })}
    </ul>
  );
};
