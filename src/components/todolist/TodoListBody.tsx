import {LoginBody} from "./login/component/LoginBody.tsx";
import loginBg from "../../assets/login_bg.png";
import {ThisText} from "./text/ThisText.tsx";
import {LoginHeader} from "./login/component/LoginHeader.tsx";
export const TodoListBody = () => {
  return (
      <div
          className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${loginBg})` }}>
          <LoginHeader/>
          <main className={"flex min-h-screen w-full flex-row items-center justify-center gap-60 bg-cover bg-center bg-no-repeat px-10"}>
              <ThisText />
              <LoginBody />
          </main>
      </div>
  )
}