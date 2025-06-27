export async function generateStaticParams() {
    return [{ name: 'old' }, { name: 'new' }];
}

export default async function TypePage({ params }: { params: Promise<{ name: string }> }) {
    const resolvedParams = await params;
    const name = resolvedParams.name;

    return <div className="text-xl text-center mt-10">Type {name} shit</div>;
}