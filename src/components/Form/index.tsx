interface Form{
    onSubmit?: () => void;
    children: React.ReactNode;
    className?: string;
    title?: string;
    svg?: any;
}

export default function Form({ onSubmit, children, className, title, svg }: Form){
    return(
        <div className="flex flex-col py-5"> 
            {title && <h1 className="flex items-center gap-2 mb-5 text-[#4236C5] text-[24px] font-poppins">{svg}<span>{title}</span></h1>}
            <form onSubmit={onSubmit} className={className ? className : 'flex flex-col'}>
                {children}
            </form>
        </div>
    )
}