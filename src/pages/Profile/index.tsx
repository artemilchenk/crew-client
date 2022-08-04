import { useParams } from "react-router-dom";
import { useGetProfile } from "../../hook/useGetProfile";
import styles from "./Profile.module.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import { useState } from "react";
import { PField } from "../../components/PField";
import { updateProfile } from "../../api/user/profile-api";

export const ProfilePage = () => {
  const params = useParams<{ id: string }>();
  const userState = useAppSelector(state => state.user.user);
  const request = useAppSelector(state => state.user.requestUpdate);
  const [editMode, setEditMode] = useState(false);
  const [profileFormData, setProfileFormData] = useState({});
  const dispatch = useAppDispatch()
  const { data, loading, error } = useGetProfile(params.id, request);

  async function submitHAndler (){
    await updateProfile({dispatch, id: params.id || '', body: profileFormData})
  }



  return (
    <div className={styles.profile}>

      <h3>{data?.profile.name}</h3>

      <PField name={"role"} profile={data} formData={profileFormData} setFormData={setProfileFormData}
              editMode={editMode} />
      <PField name={"email"} profile={data} formData={profileFormData} setFormData={setProfileFormData}
              editMode={editMode} />
      <PField name={"phone"} profile={data} formData={profileFormData} setFormData={setProfileFormData}
              editMode={editMode} />
      <PField name={"about"} profile={data} formData={profileFormData} setFormData={setProfileFormData}
              editMode={editMode} />
      <PField name={"facebook"} profile={data} formData={profileFormData} setFormData={setProfileFormData}
              editMode={editMode} />
      <PField name={"instagram"} profile={data} formData={profileFormData} setFormData={setProfileFormData}
              editMode={editMode} />
      <PField name={"location"} profile={data} formData={profileFormData} setFormData={setProfileFormData}
              editMode={editMode} />
      {userState?._id === params.id ? (!editMode ? <button onClick={() => setEditMode(true)}>Edit</button> :
        <button onClick={() =>{
          submitHAndler()
          setEditMode(false)}
        }>Save</button>) : null}
    </div>
  );
};