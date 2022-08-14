import { sortBy } from 'lodash'
import format from 'date-fns/format'
import averageCriticalAssessmentScore from 'lib/averageCriticalAssessmentScore'

function getOwnerRating(image) {
  let owner = image.raters.filter(
    (x) => x.username === localStorage.username
  )[0]

  if (owner) {
    return `${owner.rating} (${owner.rating / owner.multiplier} * ${
      owner.multiplier
    })`
  }
}

const headers = [
  'User',
  'Image',
  'Upload Date',
  '# Ratings',
  'Avg. Rating',
  'Owner Rating',
  'Owner Feedback',
  '# Ratings made on others',
  'Avg. Critical Assessment Score',
].join(',')

export function downloadCSV(csv, filename = 'test.csv') {
  let csv_file, download_link
  csv_file = new Blob([csv], { type: 'text/csv' })
  download_link = document.createElement('a')
  download_link.download = filename
  download_link.href = window.URL.createObjectURL(csv_file)
  download_link.style.display = 'none'
  document.body.appendChild(download_link)
  download_link.click()
}

export function generateCSV(images, filename) {
  const output = [[headers]]
  sortBy(images, 'username').forEach((image) => {
    const row = [
      image.username,
      image.link,
      format(+image.uploadDate, 'MMMM do yyyy h:mm a'),
      image.raters.length,
      image.averageRating.toFixed(1),
      getOwnerRating(image),
      image.feedback,
      image.imagesToRate.filter((x) => x.rating).length,
      averageCriticalAssessmentScore(image).toFixed(1),
    ]

    output.push(row.join(','))
  })

  downloadCSV(output.join('\n'), filename)
}
