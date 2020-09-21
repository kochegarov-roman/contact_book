import React from "react";


export const SearchBar = ({handlerSearch}) => {
    return(
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" type="button" id="button-addon1">Search:</button>
          </div>
          <input type="text" className="form-control"
                 placeholder="name, email, website, phone, country or company"
                 onChange={(e) => handlerSearch(e.target.value)}/>
        </div>
    )
};