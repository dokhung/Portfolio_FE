import "../css/lognCss.css";
export const LoginTitle = () => {
    return (
        <div className={"flex-col justify-center p-4 w-96"}>
            <h1 className={"login-font font-bold text-2xl flex items-center justify-center"}>
                MyTodo
            </h1>
            <p className={"text-center text-xl font-bold"}>
                おかえりなさい
            </p>
        </div>
    )
}