import React, { useState, useCallback } from 'react';

export const UserLoginContext = React.createContext({
  userId: null,
  setUserId: (id) => {}
});

export default props => {
  const [userLoginId, setUserLoginId] = useState(null);

  const dispatch = useCallback(userId => {
        setUserLoginId(userId);
    },[]);
    
  return (
    <UserLoginContext.Provider
      value={{ userId: userLoginId, setUserId: dispatch }}
    >
      {props.children}
    </UserLoginContext.Provider>
  );
};
