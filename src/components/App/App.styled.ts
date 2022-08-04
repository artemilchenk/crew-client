import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: start;
  justify-content: start;
  color: antiquewhite;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white1};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
  Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 120px;
  margin: 0;
`

export const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`


