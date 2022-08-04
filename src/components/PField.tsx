import styles from "../pages/Profile/Profile.module.scss";
import { useEffect, useState } from "react";

export const PField = ({ name, profile, setFormData, editMode, formData }) => {
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (profile?.name && !touched) {
      if (!touched) setTouched(true);
    }
  }, [profile]);

  return (
    <div className={styles.profile__item}>
      <div>{name}:</div>
      {editMode ?
        <input className={styles.input} onChange={(e) => {
          if (!touched) setTouched(true);
          setFormData({ ...formData, [e.target.name]: e.target.value });
        }}
               value={!touched ? (!formData[name] ? profile?.profile[name] : formData[name]) : formData[name]}
               name={name} type="text" /> :
        <div>{profile?.profile[name] || "..."}</div>}
    </div>
  );
};