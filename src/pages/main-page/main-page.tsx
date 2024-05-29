import { useEffect } from "react";
import Button from "../../components/button/button";
import Header from "../../components/header/header";
import { useDispatch, useSelector } from "../../utils/types";
import "./main-page.css";
import { cn as bem } from "@bem-react/classname";
import { getUsersCatalog } from "../../services/actions/users-catalog";
import UserCard from "../../components/user-card/user-card";
import { useNavigate } from "react-router-dom";
import { logOutData } from "../../services/actions/user-data";

function MainPage() {
  const dispatch = useDispatch();

  const { authorized } = useSelector((store) => store.userData);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsersCatalog());
  }, [dispatch]);

  const usersData = useSelector((store) => store.usersCatalog.usersData);

  const cn = bem("MainPage");

  return (
    <>
      <Header
        start={<></>}
        main={
          <div className={cn("textContainer")}>
            <h1 className="H1">Наша команда</h1>
            <h2 className="H2">
              Это опытные специалисты, хорошо разбирающиеся во всех задачах,
              которые ложатся на их плечи, и умеющие находить выход из любых,
              даже самых сложных ситуаций.{" "}
            </h2>
          </div>
        }
        mainJustify="center"
        end={
          <Button
            text={authorized ? "Выход" : "Вход"}
            onClick={
              authorized
                ? () => {
                    dispatch(logOutData());
                  }
                : () => {
                    navigate("/registration");
                  }
            }
          />
        }
      />
      <div className={cn("cardContainer")}>
        {usersData !== null ? (
          usersData.map((element) => {
            return (
              <UserCard
                avatar={element.avatar}
                name={element.first_name + " " + element.last_name}
                id={element.id}
                onClick={() => {}}
                key={element.id}
              />
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}

export default MainPage;
