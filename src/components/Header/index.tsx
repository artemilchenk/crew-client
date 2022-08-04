import styles from "./Header.module.scss";
import { setForm, setFormResponse } from "../../features/form/formSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect, useRef, useState } from "react";
import { setUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";


export interface RegisterDataTypes {
  name: string,
  email: string,
  password: number,
  profession: string,
  skills: string,
  details: string,
  extra_details: string,
}

export function isEmail(value: string | number | undefined, field: string | number | undefined): string | undefined {
  let error;
  if (!value) {
    error = `${field} is Required`;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value as string)) {
    error = "Invalid email address";
  }
  return error;
}

export function required(value: string | number | undefined, field: string | number | undefined): string | undefined {
  let error;

  if (!value) {
    error = `${field} is Required`;
  } else if (!String(value).trim()) {
    error = `${field} is Required`;
  }
  return error;
}

export const HeaderComponent = () => {
  const formResponse = useAppSelector(state => state.form.formResponse);
  const userState = useAppSelector(state => state.user.user);
  const navigate = useNavigate();
  const loginBut = useRef<HTMLHeadingElement>(null);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token')

  useEffect(() => {
    let logBut = loginBut?.current;
    if (logBut) {
      if (formResponse) {
        logBut.classList.add(styles.header__item_waiting);
      } else logBut.classList.remove(styles.header__item_waiting);

    }

  }, [formResponse]);

  return (
    <div className={styles.header}>
      <>
        <div onClick={() =>navigate(`profile/${userState?._id}`)} className={styles.header__item}>
          {userState ? userState.name : "Unknown"}
        </div>
        <div onClick={() =>navigate(`/`)} className={styles.header__item}>
          Home
        </div>
      </>

      <div className={styles.header__nav}>

        {!userState ? (
          <>
            <div onClick={() => {
              dispatch(setForm("REG"));
            }}
                 className={styles.header__item}>Sign up
            </div>
            <div ref={loginBut} onClick={() => {
              dispatch(setFormResponse(""));
              dispatch(setForm("LOG"));
              dispatch(setFormResponse(""));
            }}
                 className={styles.header__item}>Sign in
            </div>
          </>

        ) : (
          <>
            <div onClick={() => {
              dispatch(setForm("CTR"));
            }}
                 className={styles.header__item}>Create
            </div>

            <div onClick={() => {
              localStorage.removeItem("token");
              dispatch(setUser(null));
            }}
                 className={styles.header__item}>Log Out
            </div>
          </>
        )}
      </div>
    </div>
  );
};
