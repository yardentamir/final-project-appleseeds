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
overflow-y: scroll; height:700px;
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
align-items:center;
flex-wrap: wrap;
justify-content: space-around;
gap: 15px;
flex-wrap: nowrap;

div {
  text-align: center;
}

&  * {
  margin-bottom: 8%;
}

 input[type="button"] {
color: black;
font-family: inherit;
}
`