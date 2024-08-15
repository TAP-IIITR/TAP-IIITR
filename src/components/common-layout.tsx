interface CommonLayoutProps {
    title: string;
    children: React.ReactNode
}
const CommonLayout = ({ title, children }: CommonLayoutProps) => {
    return (
        <div className="flex flex-col md:w-[74rem] m-auto">
            <h1 className="text-primary font-bold text-2xl md:text-4xl text-center my-12">
                {title}
            </h1>

            {children}
        </div>
    )
}
export default CommonLayout