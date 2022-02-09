import styled from "styled-components";

export const ImageUploadStyled = styled.div`

#profile {
  border-radius: 100%;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
  background: #f4f4f4;
  display: table;
  background-size: cover;
  background-position: center center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.35);
}

#profile.dashes {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 100%;
  width: 100%;
  height: 100%;
  border: 4px dashed rgb(204, 203, 203);
  opacity: 1;
}
#profile label {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 0 30px;
  color: grey;
  opacity: 1;
  cursor: pointer;
}
#profile .dragging {
  background-image: none !important;
}
#profile .draggin .dashes {
  animation-duration: 10s;
  animation-name: spin;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  opacity: 1 !important;
}

#profile .draggin .dashes label {
  opacity: 0.5 !important;
}

.hasImage {
  opacity: 0 !important;
  pointer-events: none;
  user-select: none;
}

`;
