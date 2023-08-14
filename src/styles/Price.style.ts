import styled from "styled-components";


export const PriceTitle = styled.h3`
  padding: 10px;
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.accentColor2};
`;

export const PriceTableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const TableContainer = styled.div`
  width: 500px;
  margin-top: 20px;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: 15px;
  text-align: center;
  font-weight: 700;
  color: ${props => props.theme.accentColor};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableData = styled.td`
  border-top: 1px solid #868686;
  padding: 15px;
  text-align: center;
`;