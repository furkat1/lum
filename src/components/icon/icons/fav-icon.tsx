"use client";

export const FavIcon = ({ fill }: { fill: string }) => {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.0486 21.9039C12.7086 22.032 12.1486 22.032 11.8086 21.9039C8.90859 20.8472 2.42859 16.4388 2.42859 8.96685C2.42859 5.66854 4.91859 3 7.98859 3C9.80859 3 11.4186 3.93933 12.4286 5.39101C13.4386 3.93933 15.0586 3 16.8686 3C19.9386 3 22.4286 5.66854 22.4286 8.96685C22.4286 16.4388 15.9486 20.8472 13.0486 21.9039Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
