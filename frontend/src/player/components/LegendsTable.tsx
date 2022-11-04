import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Image } from '@chakra-ui/react';

import { LegendRanked } from '../types';
import 'animate.css';

import getTierColor from '@/helpers/';

type Props = {
  legends: LegendRanked[];
};

const LegendsTable: React.FC<Props> = ({ legends }) => {
  const sortedLegends = legends.sort((a, b) => b.peak_rating - a.peak_rating);

  return (
    <Box bg="white" border="0.5px solid #D3D3D3" borderRadius="xl" mt={10} padding={1}>
      <TableContainer>
        <Table colorScheme="facebook" size="lg" variant="simple">
          <Thead>
            <Tr>
              <Th>Legend</Th>
              <Th>Name</Th>
              <Th>Tier</Th>
              <Th isNumeric>Ranked Games</Th>
              <Th isNumeric>Rating</Th>
              <Th isNumeric>Peak Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedLegends.map((legend) => {
              const { peak_rating, legend_name_key, games, rating, tier, legend_id } = legend;
              const legendImageUrl = `./legends/${legend_name_key}.png`;

              return (
                <Tr key={legend_id}>
                  <Td>
                    <Image
                      bg="brown"
                      border="2px"
                      borderColor="gold"
                      height="100px"
                      src={legendImageUrl}
                    />
                  </Td>
                  <Td>{legend_name_key.toUpperCase()}</Td>
                  <Td color={getTierColor(tier)} fontWeight={'bold'}>
                    {tier}
                  </Td>
                  <Td isNumeric>{games}</Td>
                  <Td isNumeric>{rating}</Td>
                  <Td isNumeric>{peak_rating}</Td>
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
