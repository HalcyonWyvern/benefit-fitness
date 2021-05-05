import React, {useState} from "react";

const Search = ({ onSearch, placeholder }) => {
    const [search, setSearch] = useState("");
    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (
        <input
            type="text"
            className="form-control"
            style={{ width: "240px", fontSize: "1.20rem" }}
            placeholder={placeholder}
            value={search}
            onChange={e => onInputChange(e.target.value)}
        />
    );
};

export default Search;