import React from "react";

interface Props {
  onPrevClick: () => void;
  onNextClick: () => void;
  isStart: boolean;
  reachedToEnd: boolean;
}

const NextAndPrevButton = ({
  onPrevClick,
  onNextClick,
  isStart,
  reachedToEnd,
}: Props) => {
  return (
    <div className="flex justify-end items-center space-x-3 mt-5">
      {!isStart && <Button title="Prev" onClick={onPrevClick} />}
      {!reachedToEnd && <Button title="Next" onClick={onNextClick} />}
    </div>
  );
};

export default NextAndPrevButton;

export const Button = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      className="text-primary dark:text-white hover:underline"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
