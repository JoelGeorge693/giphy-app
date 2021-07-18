import styled, { css } from 'styled-components';

export const RedditSearch = styled.section`
	&:hover {
		color:orangered;
		
		input[type="text"]{
			color:orangered;
			text-decoration: underline;
			text-decoration-style: dotted;
		}
  }
`;

export const RedditItem = styled.div`
{
  display: grid;
  background-color: #95dada;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
  max-height:100%;
  max-width:250px;
  overflow:auto;
}

 &:hover {
  transform: scale(1.05);
}

a{
  font-size:15px;
}

img{
  20px;
}
`;