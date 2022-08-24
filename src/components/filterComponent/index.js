import React from "react";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <div className={`input-group`} style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
      <input
        id="search"
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={onFilter}
        className="form-control"
        style={{maxWidth: '200px', borderRadius: '0.375rem', padding: '0.375rem 0.75rem'}}
      />
    </div>
  </>
);

export default FilterComponent;
