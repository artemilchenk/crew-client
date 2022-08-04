import styles from "./UList.module.scss";
import { useAppSelector } from "../../store";
import { useGetUsers } from "../../hook/useGetUsers";
import { useNavigate } from "react-router-dom";

export const UListComponent = () => {
  const requestPostDelete = useAppSelector(state => state.user.requestPostDelete);
  const { loading, data, error } = useGetUsers(requestPostDelete);
  const navigation = useNavigate();

  if (data?.length) return <div className={styles.userList}>
    <div style={{ marginTop: "10px" }}>User List</div>
    <div className={styles.userList__list}>
      {data.length ? data.map(user => (
        <div onClick={() => {
          navigation(`profile/${user._id}`);
        }} className={styles.userList__item} key={user.name}>{user.name}</div>
      )) : null}
    </div>
  </div>;
  return null;
};



