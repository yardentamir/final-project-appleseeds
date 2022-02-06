import styled from "styled-components";

export const SearchBarStyled = styled.div`
  width: 100%;
  margin: 38px auto;


 .search-box {
  position: relative;
  max-width: 900px;
  height: 60px;
  margin: 0 auto;
}

 .search-box .input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  border-radius: 3px;
  font-size: 18px;
  padding-right: 145px;
  border-radius: 50px;
}

 .search-box .search-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 100%;
  background: var(--color-p);
  z-index: 1;
  cursor: pointer;
  width: 125px;
  height: 45px;
  top: 8px;
  right: 5px;
  border-radius: 3px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  transition: all 0.3s ease-out;
}

.search-box .search-btn:hover {
  background: var(--color-dark);
}

 .search-box .search-btn.btn-common .fas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 20px;
}


`;