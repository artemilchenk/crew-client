import { useNavigate, useParams } from "react-router-dom";
import styles from "./Post.module.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import { IoArrowRedoOutline } from "@react-icons/all-files/io5/IoArrowRedoOutline";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import axios, { AxiosError } from "axios";
import { useGetPost } from "../../hook/useGetPost";
import {useState } from "react";
import { createComment } from "../../api/comment/comment-api";
import { useGetComments } from "../../hook/useGetComments";
import { setRequestCreateDeleteComment } from "../../features/comment/commentSlice";
import { CommentComponent } from "../../components/Comment";
import {ServerURL} from "../../domen";


export const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const request = useAppSelector(state => state.comment.requestPostDelete);
  const navigate = useNavigate();
  const { loading, data, error } = useGetPost(id);
  const { loadingCom, dataCom, errorCom} = useGetComments(request ,id);
  const [comment, setComment] = useState("");

  async function createCommentHandler() {
    await createComment({ targetId: id, value: comment, target: "post", dispatch });
    setComment('')
    dispatch(setRequestCreateDeleteComment(new Date()))
  }

  async function onDeleteHandler() {

    try {

      if (localStorage.getItem("token")) {
        const tokenObj = JSON.parse(localStorage.getItem("token") || "");
        const token = tokenObj.token;

        const response = await axios.post(`${ServerURL.PRODUCTION}post/delete`, { id: data?.post._id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate(`/`);
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

    <div className={styles.post}>

      <div className={styles.post__info}>

        <div className={styles.post__item}>
          <div className={styles.post__marker}>
            Name:
          </div>
          <div className={styles.post__value}>
            {data?.post.name}
          </div>
        </div>

        <div className={styles.post__item}>
          <div className={styles.post__marker}>
            Job:
          </div>
          <div className={styles.post__value}>
            {data?.post.job}
          </div>
        </div>

        <div className={styles.post__item}>
          <div className={styles.post__marker}>
            About:
          </div>
          <div className={styles.post__value}>
            {data?.post.about}
          </div>
        </div>

        <div className={styles.post__sub}>
          <span className={styles.post__prefer}>Owner:</span>{data?.post.owner}
        </div>

        {user?.name === data?.post.owner ? <div onClick={onDeleteHandler} className={styles.post__deleteicon}>
          <AiOutlineDelete size={30} />
        </div> : null}
      </div>

      {user ? (
        <div className={styles.post__field}>
        <textarea onChange={(e) => setComment(e.target.value)} value={comment} className={styles.input}
                  placeholder={"leave comment here..."} name="comment" id="" cols={30} rows={2} />
          <IoArrowRedoOutline onClick={createCommentHandler} size={30} />
        </div>
      ) : null}



      <div className={styles.post__comments}>
        {dataCom?.comments.map((com, index)=>(
          <CommentComponent key={index} comment={com}/>
        ))}
      </div>

    </div>
  );
};