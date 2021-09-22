import styled from "@emotion/styled";

export const StopwatchContainer = styled.div`
  padding: 24px;
`;
export const WatchEl = styled.span`
  font-size: 24px;
  :not(:last-child) {
    margin-right: 5px;
  }
`;

export const Button = styled.button`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  :not(:last-child) {
    margin-right: 5px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;
