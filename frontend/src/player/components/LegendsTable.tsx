import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box } from '@chakra-ui/react';

import { LegendRanked } from '../types';
type Props = {
  legends: LegendRanked[];
};

const LegendsTable: React.FC<Props> = ({ legends }) => {
  return (
    <Box bg="white" border="0.5px solid #D3D3D3" borderRadius="xl" padding={1}>
      <TableContainer>
        <Table colorScheme="facebook" variant="simple">
          <Thead>
            <Tr>
              <Th>Legend</Th>
              <Th isNumeric>Ranked Games</Th>
              <Th>Tier</Th>
              <Th isNumeric>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {legends.map((legend) => {
              const { legend_name_key, games, rating, tier, legend_id } = legend;

              return (
                <Tr key={legend_id}>
                  <Td>{legend_name_key.toUpperCase()}</Td>
                  <Td isNumeric>{games}</Td>
                  <Td>{tier}</Td>
                  <Td isNumeric>{rating}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LegendsTable;
