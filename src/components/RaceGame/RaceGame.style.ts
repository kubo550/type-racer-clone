import styled from "styled-components";

export const Input = styled.input`
  margin: 25px 0;
  width: 100%;
  font-size: 1.06rem;
  padding: 5px 6px;
`;

export const Road = styled.div`
  width: 100%;
  padding: 1px;
  background: white;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 70px;
    background-color: #d83532;
    height: 100%;
    top: 0;
    right: 0;
  }
`;
