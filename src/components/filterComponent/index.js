import React from "react";
import styled from "styled-components";

const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.small ? 5 : undefined
}))`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
`;

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
