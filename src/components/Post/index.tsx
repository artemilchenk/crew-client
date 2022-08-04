import styles from "./Post.module.scss";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { useAppDispatch, useAppSelector } from "../../store";
import axios, { AxiosError } from "axios";
import { setRequestCreateDeletePost } from "../../features/post/postSlice";
import { useNavigate } from "react-router-dom";


export const PostComponent = ({ post }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const navigate = useNavigate();

  async function onDeleteHandler() {

    try {

      if (localStorage.getItem("token")) {
        const tokenObj = JSON.parse(localStorage.getItem("token") || "");
        const token = tokenObj.token;

        const response = await axios.post(`${process.env.REACT_APP_API}post/delete`, { id: post._id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setRequestCreateDeletePost(new Date()));
      }

    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          console.log(err.response.data.message);
        }
      }
    }
  }

  return <div onClick={(e) => {
    navigate(`post/${post._id}`);
  }} className={styles.post}>
    <div className={styles.post__sub}>
      <span className={styles.post__prefer}>Owner</span> {post.owner}
    </div>
    <div className={styles.post__main}>
      <div className={styles.post__primary}>{post.name}</div>
      <div className={styles.post__secondary}>{post.job}</div>

      {user?.name === post.owner ? <div onClick={async (e) => {
        e.stopPropagation();
        await onDeleteHandler();
      }
      } className={styles.post__delete}>
        <AiOutlineDelete size={20} />
      </div> : null}
    </div>
  </div>;
};