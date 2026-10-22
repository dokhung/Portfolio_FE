export const LoginForm = () => {
    return(
        <form className={"flex flex-col gap-2"}>
            <div className={"flex flex-col gap-2"}>
                <label className={"font-bold"}>
                    NickName
                </label>
                <input type="text" placeholder="Enter your nickname" className={"border border-gray-300 rounded-md p-2 bg-blue-50"} />
            </div>
            <div className={"flex flex-col gap-2"}>
                <label className={"font-bold"}>
                    Password
                </label>
                <input type="password" placeholder="Enter your password" className={"border border-gray-300 rounded-md p-2 bg-blue-50"} />
            </div>
            <div>
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"}>
                    Login
                </button>
            </div>
        </form>
    )
}