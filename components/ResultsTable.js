import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import averageCriticalAssessmentScore from 'lib/averageCriticalAssessmentScore'
import { formatDistance } from 'date-fns'

export default function ResultsTable({ images, getOwnerRating, viewImage }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Upload Date</TableCell>
            <TableCell># Ratings</TableCell>
            <TableCell>Avg. Rating</TableCell>
            <TableCell>Owner Rating</TableCell>
            <TableCell># Ratings made on others</TableCell>
            <TableCell>Avg. Critical Assessment Score</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {images.map((image, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {image.username}
              </TableCell>
              <TableCell component="th" scope="row">
                <a
                  onClick={() => viewImage({ image })}
                  style={{
                    color: `rgb(50, 140, 205)`,
                    fontWeight: `bold`,
                    cursor: 'pointer',
                  }}
                >
                  View Image
                </a>
              </TableCell>
              <TableCell component="th" scope="row">
                {image.uploadDate
                  ? formatDistance(new Date(), new Date(+image.uploadDate))
                  : ``}
              </TableCell>
              <TableCell component="th" scope="row">
                {image.raters.length}
              </TableCell>
              <TableCell component="th" scope="row">
                {image.averageRating}
              </TableCell>
              <TableCell component="th" scope="row">
                {getOwnerRating(image)}
              </TableCell>
              <TableCell component="th" scope="row">
                {image.imagesToRate.filter((x) => x.rating).length}
              </TableCell>
              <TableCell component="th" scope="row">
                {averageCriticalAssessmentScore(image) || 0}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
