import styled from "styled-components";

export const Flex = styled.div`
display:flex;
align-items:center;
flex-wrap: wrap;
justify-content: center;
gap: 15px;
`

export const FlexLeft = styled.div`
display:flex;
align-items:left;
flex-wrap: wrap;
justify-content: center;
gap: 15px;
overflow-y: scroll;
max-height: 650px;
::-webkit-scrollbar {
  display: none;
}
`

export const FlexNoWrap = styled.div`
display:flex;
align-items:center;
flex-wrap: wrap;
justify-content: center;
gap: 15px;
flex-wrap: nowrap;
`

export const FlexAround = styled.div`
display:flex;
flex-wrap: wrap;
justify-content: space-around;
gap: 15px;
flex-wrap: nowrap;
align-items: flex-end;

div {
  text-align: center;
}

&  * {
  margin-bottom: 2%;
}

 input[type="button"] {
color: black;
font-family: inherit;
}
`