import Form from "next/form";
const SearchForm = () => {
    const query = 'test'
    return (
        <Form action='/' scroll={false}>
            <input name='query' type='text'
                defaultValue={query}
                placeholder='Search...' className='border-1 border-neutral-800 rounded-md p-2' />
            <button type='submit' className='bg-neutral-800 text-white rounded-md p-2'>Search</button>
        </Form>

    )
}