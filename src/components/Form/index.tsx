interface Form{
    onSubmit?: () => void;
    children: React.ReactNode;
    className?: string;
}

export default function Form({ onSubmit, children, className }: Form){
    return(
        <form onSubmit={onSubmit} className={className ? className : 'flex flex-col'}>
            {children}
        </form>
    )
}