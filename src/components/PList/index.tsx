import stylesApp from "../App/App.module.scss";
import { PostComponent } from "../Post";
import { useLocation, useSearchParams } from "react-router-dom";
import { Paginator } from "../Paginator";

export const PListComponent = ({data}) => {
  const [searchParams] = useSearchParams({});
  return <div className={stylesApp.main}>
    {data?.posts.length ? <>
      <Paginator count={data?.count} />
      {data?.posts.map(post => <PostComponent key={post._id} post={post} />)}
    </> : null}
  </div>;
};

