export const startNotificationTimer = (setHasNotification) => {
    setTimeout(() => {
      setHasNotification(true);
    }, 6000); //  1 perc után
  };


  // nem tudom milyen időközönként kell küldeni :D, ezért minden év kezdetén küld
  export const checkNewYearNotification = (setNotifications) => {
    const now = new Date();
    const isFirstOfJanuary = now.getDate() === 1 && now.getMonth() === 0;
    
    if (isFirstOfJanuary) {
      setNotifications([' Ne felejtse el kitölteni az Ebösszeíró lapot!']);
    }
  };
  