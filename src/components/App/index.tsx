import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import { HeaderComponent } from "../Header";
import { Wrapper, Form } from "./App.styled";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import { getUser } from "../../api/user/user-api";
import { HomePage } from "../../pages/Home";
import { ProfilePage } from "../../pages/Profile";
import stylesForm from "../Form/Form.module.scss";
import { FormikRegister } from "../Form/FormikRegister";
import { FormikLogin } from "../Form/FormikLogin";
import { FormikCreate } from "../Form/FormikCreate";
import { PostPage } from "../../pages/Post";

export const App = () => {
  const dispatch = useAppDispatch();
  const isForm = useAppSelector(state => state.form.isForm);

  useEffect(() => {
    getUser({ dispatch });
  }, []);

  return (
    <Wrapper>
      <BrowserRouter>
        {/*------Header------*/}
        <HeaderComponent />

        {/*------Forms------*/}
        {isForm ? (
          <Form className={stylesForm.form}>
            <FormikRegister />
            <FormikLogin />
            <FormikCreate />
          </Form>
        ) : null}

        <Routes>
          <Route path="/profile/:id" element={<ProfilePage/>}/>
          <Route path="/post/:id" element={<PostPage/>}/>
          <Route index element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
};
