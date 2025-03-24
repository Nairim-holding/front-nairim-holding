interface Form{
    onSubmit?: () => void;
    children: React.ReactNode;
}

export default function Form({ onSubmit, children }: Form){
    return(
        <form onSubmit={onSubmit} className="flex flex-col">
            {children}
        </form>
    )
}