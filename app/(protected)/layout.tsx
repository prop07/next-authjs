const layout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div>protected</div>
            {children}
        </div>
    );
};

export default layout;
