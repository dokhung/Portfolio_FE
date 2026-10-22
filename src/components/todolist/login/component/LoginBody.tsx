import { LoginTitle } from "./LoginTitle.tsx"
import {LoginForm} from "./LoginForm.tsx";
import {RegisterButton} from "./RegiterButton.tsx";

export const LoginBody = () => {
    return (
        <section className={"bg-white shadow-2xl rounded-xl p-8"}>
            <LoginTitle />
            <LoginForm />
            <div className={"flex justify-between gap-2 mt-4"}>
                <div>
                    <input type={"checkbox"}/>
                    <span className={"ml-2"}>
                        Remember me
                    </span>
                </div>
                <div className={"text-blue-500 font-bold"}>
                    <button>
                        Forgot password?
                    </button>
                </div>
            </div>
            <div className={"flex items-center gap-3 my-5"}>
                <div className={"flex-1 border-t border-gray-300"}/>
                <span className={""}>or</span>
                <div className={"flex-1 border-t border-gray-300"}/>
            </div>
            <RegisterButton />
        </section>
    )
}