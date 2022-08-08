// import averageCriticalAssessmentScore from '../utils/averageCriticalAssessmentScore'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

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

        <tbody>
          {images.map((image, i) => (
            <tr key={i}>
              <td>{image.username}</td>
              <td>
                <a
                  onClick={() => viewImage({ image })}
                  style={{
                    color: `rgb(50, 140, 205)`,
                    fontWeight: `bold`,
                  }}
                >
                  View Image
                </a>
              </td>
              <td>
                {/* {image.uploadDate ? moment(image.uploadDate).fromNow() : ``} */}
              </td>
              <td>{image.raters.length}</td>
              <td>{image.averageRating}</td>
              <td>{getOwnerRating(image)}</td>
              <td>{image.imagesToRate.filter((x) => x.rating).length}</td>
              {/* <td>{averageCriticalAssessmentScore(image) || 0}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}
