import React, { useState, useEffect } from "react";
import Auth from "../components/Auth";
import Main from "./Main";
import { authAction } from "../store/slices/Auth";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateOrAny) => state.auth);

  useEffect(() => {
    dispatch(authAction.getToken());
    return () => {
      // cleanup;
    };
  }, [dispatch]);

  return <div>{auth.token ? <Main /> : <Auth />}</div>;
};

Home.propTypes = {};

export default Home;
