export const LoginHeader = () => {
    return (
        <header className={"flex justify-between p-4"}>
            <div className={"p-4"}>
                <h1 className={"font-bold text-2xl"}>MyTodo</h1>
            </div>
            <div className={"flex gap-3"}>
                <button className={""}>Item</button>
                <button className={""}>Item2</button>
                <button className={""}>Item3</button>
            </div>
        </header>
    )
}