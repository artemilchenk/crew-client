import { useAppDispatch, useAppSelector } from "../../store";
import styles from "./Comment.module.scss";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { setRequestCreateDeleteComment } from "../../features/comment/commentSlice";


export const CommentComponent = ({ comment }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);

  async function onDeleteHandler() {

    try {

      if (localStorage.getItem("token")) {
        const tokenObj = JSON.parse(localStorage.getItem("token") || "");
        const token = tokenObj.token;

        const response = await axios.post(`http://localhost:5001/comment/delete/${comment._id}`, { target: 'post', targetId: id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setRequestCreateDeleteComment(new Date()))
      }

    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          console.log(err.response.data.message);
        }
      }
    }

  }

  return (
    <div className={styles.comment}>
      <div className={styles.comment__text}>
        <div className={styles.comment__item}>{comment.owner}</div>
        <div className={styles.comment__item}>{comment.text}</div>
      </div>
      {user?.name === comment.owner ? <div className={styles.comment__deleteicon}>
        <AiOutlineDelete onClick={onDeleteHandler} size={20} />
      </div> : null}
    </div>
  );
};