import styled from "styled-components";

export const Container = styled.div`
width: 1500px;
max-width: 100%;
padding: 20px;
margin: 0 auto;
${({ div }) => div === "slanted-div" ? "height: 500px; display: flex; align-items: center; justify-content: center;" : ""}
`
