import { useEffect, useState } from "react";

const SIGNUP_LOCKED_UNTIL = "signup_locked_until";

export const useBlockUser = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    checkUserBlock();
  }, []);

  const blockUser = (timeInMinutes: number = 5) => {
    const blockUntil = Date.now() + timeInMinutes * 60 * 1000;
    setIsBlocked(true);
    setRemainingTime(timeInMinutes);

    sessionStorage.setItem(SIGNUP_LOCKED_UNTIL, blockUntil.toString());

    setTimeout(
      () => {
        setIsBlocked(false);
        setRemainingTime(0);
        sessionStorage.removeItem(SIGNUP_LOCKED_UNTIL);
      },
      timeInMinutes * 60 * 1000,
    );
  };

  const checkUserBlock = () => {
    const blockUntil = sessionStorage.getItem(SIGNUP_LOCKED_UNTIL);
    if (blockUntil && Number(blockUntil) > Date.now()) {
      setIsBlocked(true);
      setRemainingTime(Math.max(Number(blockUntil) - Date.now(), 0));
    } else {
      setIsBlocked(false);
      setRemainingTime(0);
      sessionStorage.removeItem(SIGNUP_LOCKED_UNTIL);
    }
  };

  return { isBlocked, remainingTime, blockUser };
};
