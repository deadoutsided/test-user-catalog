import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/button";
import Header from "../../components/header/header";
import PersonalCard from "../../components/personal-card/personal-card";
import { useDispatch, useSelector } from "../../utils/types";
import About from "../../components/about/about";
import { useEffect } from "react";
import { getUsersCatalog } from "../../services/actions/users-catalog";

function BioPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUsersCatalog())
  }, [dispatch]);
  const userData = useSelector((store) =>
    store.usersCatalog.usersData !== null
      ? store.usersCatalog.usersData[Number(id)]
      : undefined
  );

  return (
    <>
      <Header
        start={<Button text={"Назад"} onClick={() => {navigate('/')}} />}
        main={
          <PersonalCard
            name={`${userData?.first_name} ${userData?.last_name}`}
            avatar={userData?.avatar}
          />
        }
        mainJustify="start"
        end={<Button text={"Выйти"} onClick={() => {}} />}
      ></Header>
      <About email={ userData?.email}/>
    </>
  );
}

export default BioPage;
