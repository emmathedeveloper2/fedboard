import useClipboardStore from '../stores/ClipboardStore';

const SearchBar = () => {

  const searchText = useClipboardStore(store => store.searchText)

  const setSearchText = useClipboardStore(store => store.setSearchText)

  return (
    <input
    value={searchText}
    onInput={e => setSearchText(e.currentTarget.value)}
    className='w-full border-2 border-black rounded-md p-2 outline-none'
    placeholder='Search'/>
  );
};

export default SearchBar;
