const authChecker = (checkType) => {
    const token = localStorage.getItem('token')
    if (checkType === 'authCheck') {
      if (!token) {
        return false;
      }
      return true;
    }
    return true;
  };
  
  export default authChecker;