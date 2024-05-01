import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./modal.module.css";
import { useAppSelector } from "../../../hooks/reduxHooks";

const Modal = ({ children }: { children: React.ReactNode }) => {
  return <div className={classes.modal}>{children}</div>;
};

const Overlay = ({ onClose }: { onClose: () => void }) => {
  return <div className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const { createPostLoading } = useAppSelector((state) => state.post);
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Modal>{children}</Modal>,
        //@ts-expect-error below line might throw an error
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <Overlay onClose={createPostLoading ? () => {} : onClose} />,
        //@ts-expect-error below line might throw an error
        document.getElementById("backdrop")
      )}
    </Fragment>
  );
};

export default ModalOverlay;
