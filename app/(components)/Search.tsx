import React from 'react';

type Props = {
    search: string;
    setSearch: Function;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    expanded: boolean;
}

const Search = ({ search, setSearch, setExpanded, expanded }: Props) => {
    return (
        <div className="max-w-[1150px] bg-[#1A1A1A] rounded-full overflow-hidden border-2 border-[#333333] p-1.5 px-5 pr-8 flex items-center py-3 mx-2">
            <div className="h-4 w-4 rounded-full border-2 flex-shrink-0 animate-pulse mr-2" />
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#1A1A1A] text-white border-none lg:w-full focus:ring-0 outline-none placeholder-[#FAFAFA] text-xs"
                placeholder="Search..."
            />
            <div className={`hidden md:inline-block ml-auto w-full text-end text-[#dad9d2] transition-all transition-500 cursor-pointer hover:text-white hover:font-bold `} onClick={() => setExpanded(prev => !prev)}> {expanded? 'Collapse':'Expand'} Results </div>


        </div>
    )
}

export default Search