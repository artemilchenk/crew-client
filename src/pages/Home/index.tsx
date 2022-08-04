import { UListComponent } from "../../components/UList";
import { SearchComponent } from "../../components/Search";
import { PListComponent } from "../../components/PList";
import { useGetPosts } from "../../hook/useGetPosts";
import { useAppSelector } from "../../store";
import { useLocation } from "react-router-dom";

export const HomePage = () => {
  const location = useLocation();
  const requestPostDelete = useAppSelector(state => state.post.requestPostDelete);
  const { loading, data, error } = useGetPosts(requestPostDelete, location.search);
  return <>
    {/*------User-List------*/}
    <UListComponent />
    {/*------Search------*/}
    <SearchComponent data={data}/>
    {/*------Posts-List------*/}
    <PListComponent data={data} />
  </>
}




