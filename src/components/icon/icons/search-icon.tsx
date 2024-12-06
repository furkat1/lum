"use client";

export const SearchIcon = ({ fill }: { fill: string }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11.5" cy="11.5" r="9.5" stroke={fill} strokeWidth="1.5" />
      <line
        x1="18.8341"
        y1="18.5889"
        x2="23"
        y2="22.7548"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
