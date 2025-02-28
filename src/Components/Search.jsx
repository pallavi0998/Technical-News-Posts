import { useGlobleContext } from "./Context";

const Search = () => {
    const { query, searchPost } = useGlobleContext();

    return (
        <>
            <h1>Technical News Post</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <input type="text" placeholder="Search Here" value={query} onChange={(e) => searchPost(e.target.value)} />
                </div>
            </form>
        </>
    )
}

export default Search;