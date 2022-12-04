import {
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { Employee } from "../../types";

type TableProps = {
  tableData: any[] ;
  tableStructure: TableStructureOption[];
  title?: string | React.ReactNode;
  action?: (x: any) => string;
  loading: boolean;
  error?: boolean;
  hasCheckBox?: boolean;
  onRenderCheckBox?: (row: Employee, id: number) => React.ReactElement;
  hideHeader?: boolean;
};

type TableStructureOption = {
  name: string | null;
  type: string;
  value: (row: any) => string | null | undefined;
  action?: (row: any) => void;
};

const BaseTable = ({
  tableData,
  tableStructure,
  action,
  title,
  loading,
  error,
  hasCheckBox,
  onRenderCheckBox,
  hideHeader,
}: TableProps) => {
  const dataTypes = (data: TableStructureOption, row: any) => {
    switch (data.type) {
      case "text":
        return <TableText>{data.value(row) ?? "N/A"}</TableText>;

      case "cta":
        return (
          <Text
            cursor={"pointer"}
            fontWeight="medium"
            color="orange.300"
            onClick={() => data.action && data.action(row)}
          >
            {data.value(row) ?? "N/A"}
          </Text>
        );

      default:
        return "N/A";
    }
  };

  const renderTableHeader = () => {
    if (hideHeader) return null
    return (
      <Thead>
        <Tr>
          {hasCheckBox && <Th key={'header_checkbox'}></Th>}
          {tableStructure.map((item, idx) => (
            <Th key={`header_${idx}`}>{item?.name ?? ""}</Th>
          ))}
        </Tr>
      </Thead>
    )
  };

  const renderLoadingTable = () => (
    <Tr>
      {hasCheckBox && <Th key={'header_checkbox'}></Th>}
      {tableStructure.map((_, _idx) => (
        <Td key={`loading_${_idx}`}>
          <Skeleton />
        </Td>
      ))}
    </Tr>
  );

  const renderTableData = () =>
    tableData.map((row, idx) => (
      <Tr key={`row_${idx}`}>
        {hasCheckBox && onRenderCheckBox && <Td>{onRenderCheckBox(row, idx)}</Td>}
        {tableStructure.map((data, idx) => (
          <Td key={`data_${idx}`}>{dataTypes(data, row)}</Td>
        ))}
      </Tr>
    ));

  return (
    <TableContainer>
      <Table variant="striped" colorScheme={"grey"}>
        {renderTableHeader()}
        <Tbody>
          {loading ? (
            renderLoadingTable()
          ) : !loading && tableData?.length ? (
            renderTableData()
          ) : (
            <Tr>
              <Td>No data</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BaseTable;

const TableText = ({children}: {children: React.ReactNode}) => 
<Text fontSize="14px" color="gey.350" >
    {children}
</Text>
