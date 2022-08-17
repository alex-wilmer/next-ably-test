import Link from 'next/link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box } from '@mui/material'
import { sortBy } from 'lodash'
import format from 'date-fns/format'

export default function GalleriesTable({ galleries }) {
  return (
    <TableContainer data-cy="galleries-table" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Color</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell># Images</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortBy(galleries, 'name').map((gallery, i) => (
            <Link href={`/gallery/${gallery._id}`} key={gallery._id}>
              <TableRow
                key={gallery._id}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  },
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ color: gallery.color }}>⬤</Box>
                </TableCell>
                <TableCell component="th" scope="row">
                  {gallery.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {format(+gallery.createdDate, 'MMMM do yyyy, h:mm a')}
                </TableCell>
                <TableCell component="th" scope="row">
                  {format(+gallery.submitDeadline, 'MMMM do yyyy, h:mm a')}
                </TableCell>
                <TableCell component="th" scope="row">
                  {gallery.images.length}
                </TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
