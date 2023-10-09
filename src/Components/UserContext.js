import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    const savedUserId = Cookies.get('userId');
    return savedUserId || null;
  });

  const [UserType, setUserType] = useState(() => {
    const savedUserType = Cookies.get('UserType');
    return savedUserType || null;
  });

  const setUser = (id, type) => {
    console.log(`Setting UserType to: ${type}`);
    setUserId(id);
    setUserType(type);
    Cookies.set('userId', id, { expires: 7 });
    Cookies.set('UserType', type, { expires: 7 });
    console.log(`Set UserType to: ${type}`);
  };

  return (
    <UserContext.Provider value={{ userId, UserType, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };